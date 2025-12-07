import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../Components/AdminLogin';
import AdminHeader from '../Components/AdminHeader';
import EditPackageModal from '../Components/EditPackageModal';
import { adminApi } from '../services/adminApiService';
import { ADMIN_CONFIG } from '../config/adminConfig';
import { buildApiUrl } from '../config';

const tripThemes = ['Adventure', 'Honeymoon', 'Family', 'Beach', 'Pilgrimage', 'Weekend'];
const hotelCategories = ['2-star', '3-star', '4-star', '5-star'];
const mealPlans = ['Breakfast Only', 'MAP', 'AP', 'CP'];
const transportModes = ['Car', 'Bus', 'Train', 'Flight'];
const inclusionsList = ['Hotel Stay', 'Meals', 'Sightseeing', 'Guide'];
const exclusionsList = ['Flights', 'Personal Expenses', 'Tips', 'Insurance'];
const discountsList = ['Early Bird', 'Group Discount', 'Student Discount', 'Senior Citizen', 'Family Package', 'Weekend Special'];

function AdminLanding() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, isInitialized, adminToken } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  
  // Form state for Add New Package
  const initialForm = {
    title: '',
    description: '',
    days: '',
    nights: '',
    budget: '',
    city: '',
    state: '',
    date: '',
    citiesCovered: [],
    itinerary: [{ day: 1, title: '', desc: '' }],
    hotels: '',
    hotelCategory: '',
    mealPlan: '',
    transport: [],
    pickup: '',
    drop: '',
    inclusions: [],
    exclusions: [],
    cover: null,
    gallery: [],
    pdf: null,
    // New fields
    curatedJourneyType: '',
    trending: false,
    deals: false,
    hiddenGem: false,
    weekend: false,
    startDate: '',
    endDate: '',
    maxGroupSize: '',
    discounts: [],
    bookingDeadline: '',
    // Theme and TripType fields
    theme: 'adventure',
    tripType: 'Adventure',
  };
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [trips, setTrips] = useState([]);
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Interested Users state
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [isLoadingInterestedUsers, setIsLoadingInterestedUsers] = useState(false);
  const [selectedTripForUsers, setSelectedTripForUsers] = useState('');
  
  // Statistics state
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    totalBookings: 0,
    bookedUsers: 0,
    interestedUsers: 0,
    totalTrips: 0,
    recentSignups: 0,
    recentBookings: 0
  });
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  
  // Statistics detail modal state
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);
  const [selectedStatType, setSelectedStatType] = useState('');
  const [selectedStatTitle, setSelectedStatTitle] = useState('');
  const [isLoadingStatisticsData, setIsLoadingStatisticsData] = useState(false);

  // Handle login close
  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  // Show login modal only if not logged in and context is initialized
  useEffect(() => {
    if (isInitialized && !isAdminLoggedIn) {
      setShowLoginModal(true);
    } else if (isAdminLoggedIn) {
      setShowLoginModal(false);
    }
  }, [isAdminLoggedIn, isInitialized]);

  // Fetch trips and statistics when admin is logged in
  useEffect(() => {
    if (isAdminLoggedIn && adminToken) {
      fetchAllTrips();
      fetchStatistics();
    }
  }, [isAdminLoggedIn, adminToken]);

  // Helper for multi-select
  const toggleMulti = (field, value) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }));
  };

  // Helper for itinerary
  const addItineraryDay = () => {
    setForm(f => ({ ...f, itinerary: [...f.itinerary, { day: f.itinerary.length + 1, title: '', desc: '' }] }));
  };
  const updateItinerary = (idx, key, value) => {
    setForm(f => ({
      ...f,
      itinerary: f.itinerary.map((d, i) => i === idx ? { ...d, [key]: value } : d),
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    if (!form.title || !form.description || !form.city || !form.state || !form.budget) {
      alert('Please fill in all required fields: Title, Description, City, State, and Budget');
      return false;
    }
    // Date validation only if not a weekend trip
    if (!form.weekend && !form.date) {
      alert('Please select a date or choose Weekend option');
      return false;
    }
    if (form.itinerary.length === 0 || form.itinerary.some(item => !item.title)) {
      alert('Please add at least one itinerary day with title');
      return false;
    }
    // Validate gallery images - at least 3 required
    if (!form.gallery || form.gallery.length < 3 || form.gallery.filter(img => img).length < 3) {
      alert('Please upload at least 3 gallery images');
      return false;
    }
    // Validate start and end dates if provided and not weekend
    if (!form.weekend && form.startDate && form.endDate) {
      const startDate = new Date(form.startDate);
      const endDate = new Date(form.endDate);
      if (startDate >= endDate) {
        alert('End date must be after start date');
        return false;
      }
    }
    return true;
  };

  // API function to add trip details
  const addTripDetails = async (formData) => {
    if (!adminToken) {
      alert('Please login as admin first');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Debug: Log form data before processing
      console.log('Form data before processing:', formData);
      console.log('Description from form:', formData.description);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('destination', formData.destination);
      formDataToSend.append('description', formData.description);
      
      // Debug: Log description being sent
      console.log('Description being sent to backend:', formData.description);
      formDataToSend.append('duration', formData.duration);
      
      // Handle dates
      if (!form.weekend) {
        // Regular trips - use provided dates
        if (formData.startDate) formDataToSend.append('startDate', formData.startDate);
        if (formData.endDate) formDataToSend.append('endDate', formData.endDate);
        if (formData.availableDates && formData.availableDates.length > 0) {
          formDataToSend.append('availableDates', JSON.stringify(formData.availableDates));
        }
        if (formData.bookingDeadline) formDataToSend.append('bookingDeadline', formData.bookingDeadline);
      } else {
        // For weekend trips, send placeholder dates (backend requires them)
        // Use current date as placeholder - backend should handle weekend flag
        const today = new Date().toISOString().split('T')[0];
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + (parseInt(form.days) || 2));
        const placeholderEndDate = endDate.toISOString().split('T')[0];
        
        formDataToSend.append('startDate', today);
        formDataToSend.append('endDate', placeholderEndDate);
        formDataToSend.append('weekend', 'true');
        // For weekend trips, don't send availableDates or bookingDeadline
      }
      
      formDataToSend.append('price', formData.price);
      formDataToSend.append('tripType', formData.tripType);
      formDataToSend.append('itinerary', JSON.stringify(formData.itinerary || []));
      
      // Optional fields - only add if provided
      if (formData.departureLocation) formDataToSend.append('departureLocation', formData.departureLocation);
      if (formData.inclusions && Object.keys(formData.inclusions).length > 0) {
        formDataToSend.append('inclusions', JSON.stringify(formData.inclusions));
      }
      if (formData.travelMode) formDataToSend.append('travelMode', formData.travelMode);
      
      formDataToSend.append('theme', formData.theme || 'adventure');
      formDataToSend.append('maxGroupSize', formData.maxGroupSize || 20);
      formDataToSend.append('minimumAge', formData.minimumAge || 18);
      formDataToSend.append('languageSupport', JSON.stringify(formData.languageSupport || ['English']));
      
      if (formData.discounts && formData.discounts.length > 0) {
        formDataToSend.append('discounts', JSON.stringify(formData.discounts));
      }
      if (formData.cancellationPolicy) {
        formDataToSend.append('cancellationPolicy', formData.cancellationPolicy);
      }
      
      // Add new fields
      if (formData.curatedJourneyType) {
        formDataToSend.append('curatedJourneyType', formData.curatedJourneyType);
      }
      
      // Add cover image file if exists
      if (form.cover) {
        formDataToSend.append('coverImage', form.cover);
      }
      
      // Add gallery images if they exist
      if (form.gallery && form.gallery.length > 0) {
        console.log('Gallery images to upload:', form.gallery);
        form.gallery.forEach((image, index) => {
          if (image) {
            console.log(`Adding gallery image ${index + 1}:`, image.name);
            formDataToSend.append(`gallery`, image);
          }
        });
      } else {
        console.log('No gallery images found');
      }

      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        if (key === 'description') {
          console.log('Description in FormData:', value);
        }
        console.log(key, value);
      }

      // Post main trip details
      const response = await fetch(buildApiUrl('/api/admin/trip/add-tripDetails'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          // Don't set Content-Type header - let browser set it for FormData
        },
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
        const tripId = result.data?._id || result.data?.id;
        
        // Post to trending/deals/hidden-gems endpoints if selected
        const additionalPosts = [];
        
        if (form.trending && tripId) {
          additionalPosts.push(
            fetch(buildApiUrl('/api/trendingTripsRoutes/post-trending'), {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tripId })
            })
          );
        }
        
        if (form.deals && tripId) {
          additionalPosts.push(
            fetch(buildApiUrl('/api/trendingTripsRoutes/post-deals'), {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tripId })
            })
          );
        }
        
        if (form.hiddenGem && tripId) {
          additionalPosts.push(
            fetch(buildApiUrl('/api/trendingTripsRoutes/post-hidden-gems'), {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tripId })
            })
          );
        }
        
        // Wait for all additional posts to complete
        if (additionalPosts.length > 0) {
          await Promise.all(additionalPosts);
        }
        
        setSuccessMessage('Trip created successfully! Redirecting to packages...');
        // Refresh trips list to show the new trip
        fetchAllTrips();
        setTimeout(() => {
          setForm(initialForm);
          setStep(0);
          setSuccessMessage('');
          // Switch to packages tab to see the new package
          setActiveTab('packages');
        }, 2000);
      } else {
        console.error('API Error Response:', result);
        alert(`Error: ${result.message || 'Failed to create trip'}`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // API function to fetch all trips
  const fetchAllTrips = async () => {
    if (!adminToken) {
      console.log('No admin token available');
      return;
    }

    setIsLoadingTrips(true);
    try {
      const response = await fetch(buildApiUrl('/api/trips/getAllTrips'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Trips fetched successfully:', result.data);
        setTrips(result.data || []);
      } else {
        console.error('Failed to fetch trips:', result.message);
        setTrips([]);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]);
    } finally {
      setIsLoadingTrips(false);
    }
  };

  // API function to fetch trip details by ID
  const fetchTripDetails = async (tripId) => {
    if (!adminToken || !tripId) {
      console.log('No admin token or trip ID available');
      return null;
    }

    try {
      const response = await fetch(buildApiUrl(`/api/trips/get-trip-details/${tripId}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Trip details fetched successfully:', result.data);
        return result.data;
      } else {
        console.error('Failed to fetch trip details:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching trip details:', error);
      return null;
    }
  };

  // API function to fetch statistics
  const fetchStatistics = async () => {
    if (!adminToken) {
      console.log('No admin token available for fetching statistics');
      return;
    }

    setIsLoadingStatistics(true);
    try {
      const response = await fetch(buildApiUrl('/api/admin/statistics'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Statistics fetched successfully:', result.data);
        setStatistics(result.data || {});
      } else {
        console.error('Failed to fetch statistics:', result.message);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setIsLoadingStatistics(false);
    }
  };

  // API function to fetch detailed statistics data
  const fetchStatisticsData = async (type, title) => {
    if (!adminToken) {
      console.log('No admin token available for fetching statistics data');
      return;
    }

    setIsLoadingStatisticsData(true);
    setSelectedStatType(type);
    setSelectedStatTitle(title);
    setShowStatisticsModal(true);

    try {
      const response = await fetch(buildApiUrl(`/api/admin/statistics/${type}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Statistics data fetched successfully:', result.data);
        setStatisticsData(result.data || []);
      } else {
        console.error('Failed to fetch statistics data:', result.message);
        setStatisticsData([]);
      }
    } catch (error) {
      console.error('Error fetching statistics data:', error);
      setStatisticsData([]);
    } finally {
      setIsLoadingStatisticsData(false);
    }
  };

  // API function to fetch interested users for a specific trip
  const fetchInterestedUsers = async (tripId) => {
    if (!adminToken || !tripId) {
      console.log('No admin token or trip ID available for fetching interested users');
      return;
    }

    setIsLoadingInterestedUsers(true);
    try {
      console.log('Fetching interested users for trip ID:', tripId);
      
      const response = await fetch(buildApiUrl(`/api/user/trip/get-interested-users/${tripId}`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Interested users API response:', result);
      
      if (result.success) {
        console.log('Interested users fetched successfully:', result.data);
        setInterestedUsers(result.data || []);
      } else {
        console.error('Failed to fetch interested users:', result.message);
        setInterestedUsers([]);
      }
    } catch (error) {
      console.error('Error fetching interested users:', error);
      setInterestedUsers([]);
    } finally {
      setIsLoadingInterestedUsers(false);
    }
  };

  // Close package modal
  const closePackageModal = () => {
    setSelectedPackage(null);
    setForm(initialForm);
  };

  // Handle package selection
  const handlePackageSelect = async (trip) => {
    // Show loading state
    setSelectedPackage({ ...trip, isLoading: true });
    
    // Fetch detailed trip information
    const detailedTrip = await fetchTripDetails(trip._id);
    
    if (detailedTrip) {
      setSelectedPackage(detailedTrip);
      // Convert detailed trip data to form format for editing
      setForm({
        title: detailedTrip.title || '',
        days: detailedTrip.duration ? detailedTrip.duration.split(' ')[0] : '',
        nights: detailedTrip.duration ? detailedTrip.duration.split(' ')[3] : '',
        budget: detailedTrip.price ? detailedTrip.price.toString() : '',
        themes: detailedTrip.tripType ? [detailedTrip.tripType] : [],
        city: detailedTrip.destination ? detailedTrip.destination.split(',')[0]?.trim() : '',
        state: detailedTrip.destination ? detailedTrip.destination.split(',')[1]?.trim() : '',
        date: detailedTrip.startDate ? detailedTrip.startDate.split('T')[0] : '',
        citiesCovered: detailedTrip.destination ? [detailedTrip.destination] : [],
        itinerary: detailedTrip.itinerary ? detailedTrip.itinerary.map(item => {
          const activities = item.activities || '';
          const parts = activities.split(' - ');
          return {
            day: item.day,
            title: parts[0] || activities,
            desc: parts.slice(1).join(' - ') || ''
          };
        }) : [{ day: 1, title: '', desc: '' }],
        hotels: '',
        hotelCategory: '',
        mealPlan: '',
        transport: detailedTrip.travelMode ? [detailedTrip.travelMode] : [],
        pickup: detailedTrip.departureLocation || '',
        drop: detailedTrip.departureLocation || '',
        inclusions: detailedTrip.inclusions?.included || [],
        exclusions: detailedTrip.inclusions?.notIncluded || [],
        cover: null,
        gallery: detailedTrip.gallery || [],
        pdf: null,
      });
    } else {
      // Fallback to basic trip data if API fails
      setSelectedPackage(trip);
      setForm({
        title: trip.title || '',
        days: trip.duration ? trip.duration.split(' ')[0] : '',
        nights: trip.duration ? trip.duration.split(' ')[3] : '',
        budget: trip.price ? trip.price.toString() : '',
        themes: trip.tripType ? [trip.tripType] : [],
        city: trip.destination ? trip.destination.split(',')[0]?.trim() : '',
        state: trip.destination ? trip.destination.split(',')[1]?.trim() : '',
        date: trip.startDate ? trip.startDate.split('T')[0] : '',
        citiesCovered: trip.destination ? [trip.destination] : [],
        itinerary: trip.itinerary ? trip.itinerary.map(item => {
          const activities = item.activities || '';
          const parts = activities.split(' - ');
          return {
            day: item.day,
            title: parts[0] || activities,
            desc: parts.slice(1).join(' - ') || ''
          };
        }) : [{ day: 1, title: '', desc: '' }],
        hotels: '',
        hotelCategory: '',
        mealPlan: '',
        transport: trip.travelMode ? [trip.travelMode] : [],
        pickup: trip.departureLocation || '',
        drop: trip.departureLocation || '',
        inclusions: trip.inclusions?.included || [],
        exclusions: trip.inclusions?.notIncluded || [],
        cover: null,
        gallery: trip.gallery || [],
        pdf: null,
      });
    }
  };

  // Handle package update
  const handleUpdatePackage = () => {
    console.log('Edit button clicked for package:', selectedPackage);
    console.log('Package ID being passed:', selectedPackage._id);
    setEditingPackage(selectedPackage);
    setShowEditModal(true);
  };

  // Handle successful package update
  const handlePackageUpdate = (updatedPackage) => {
    // Update the trips list with the updated package
    setTrips(prevTrips => 
      prevTrips.map(trip => 
        trip._id === updatedPackage._id ? { ...trip, ...updatedPackage } : trip
      )
    );
    
    // Update the selected package if it's the same one
    if (selectedPackage && selectedPackage._id === updatedPackage._id) {
      setSelectedPackage(updatedPackage);
    }
    
    // Close the edit modal
    setShowEditModal(false);
    setEditingPackage(null);
  };

  // Handle package delete
  const handleDeletePackage = async () => {
    if (window.confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
      try {
        setDeleteLoading(true);
        console.log('Deleting package:', selectedPackage._id);
        
        // Call the delete API
        const response = await adminApi.deleteTripDetails(selectedPackage._id);
        
        console.log('Delete API response:', response);
        
        if (response.success || response.status === 200) {
          alert('Package deleted successfully!');
          closePackageModal();
          // Refresh trips list after deletion
          fetchAllTrips();
        } else {
          alert('Failed to delete package. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('Error deleting package: ' + (error.message || 'Unknown error'));
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  // Step content for Add New Package
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Tour Package Title</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Manali Adventure" />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Package Description *</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base resize-vertical min-h-[100px]" 
                value={form.description} 
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} 
                placeholder="Describe your tour package, highlights, and what makes it special..."
                rows={4}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Duration (Days)</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" value={form.days} onChange={e => setForm(f => ({ ...f, days: e.target.value }))} placeholder="5" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Nights</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" value={form.nights} onChange={e => setForm(f => ({ ...f, nights: e.target.value }))} placeholder="4" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Budget (per person)</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="12000" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Theme</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" 
                  value={form.theme} 
                  onChange={e => setForm(f => ({ ...f, theme: e.target.value }))} 
                  placeholder="e.g. adventure" 
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Trip Type</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" 
                  value={form.tripType} 
                  onChange={e => setForm(f => ({ ...f, tripType: e.target.value }))} 
                  placeholder="e.g. Adventure" 
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Location / City</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Manali" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">State / Country</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} placeholder="e.g. Himachal Pradesh" />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
                <input 
                  type="checkbox" 
                  checked={form.weekend} 
                  onChange={e => setForm(f => ({ ...f, weekend: e.target.checked, date: '', startDate: '', endDate: '', bookingDeadline: '' }))} 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>Weekend Trip (Available every weekend)</span>
              </label>
              {form.weekend && (
                <p className="text-sm text-gray-500 mt-1 ml-6">Date fields will be hidden for weekend trips</p>
              )}
            </div>
            {!form.weekend && (
              <>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Date Availability</label>
                  <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                  </div>
                  <div className="flex-1">
                    <label className="block font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Max Group Size</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.maxGroupSize} onChange={e => setForm(f => ({ ...f, maxGroupSize: e.target.value }))} placeholder="20" />
              </div>
              {!form.weekend && (
                <div className="flex-1">
                  <label className="block font-medium text-gray-700 mb-1">Booking Deadline</label>
                  <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.bookingDeadline} onChange={e => setForm(f => ({ ...f, bookingDeadline: e.target.value }))} />
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Type of Curated Journey</label>
              <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.curatedJourneyType} onChange={e => setForm(f => ({ ...f, curatedJourneyType: e.target.value }))}>
                <option value="">Select Journey Type</option>
                <option value="luxury">Biker</option>
                <option value="budget">fourbyfour</option>
                <option value="premium">Road trip</option>
                <option value="adventure">Adventure</option>
                
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Trending</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.trending} onChange={e => setForm(f => ({ ...f, trending: e.target.value === 'true' }))}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Hidden Gem</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.hiddenGem} onChange={e => setForm(f => ({ ...f, hiddenGem: e.target.value === 'true' }))}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Deals</label>
              <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.deals} onChange={e => setForm(f => ({ ...f, deals: e.target.value === 'true' }))}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Cities Covered</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.citiesCovered.join(', ')} onChange={e => setForm(f => ({ ...f, citiesCovered: e.target.value.split(',').map(s => s.trim()) }))} placeholder="e.g. Manali, Kullu, Solang" />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Day-wise Itinerary</label>
              <div className="space-y-4">
                {form.itinerary.map((day, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                    <div className="font-semibold text-gray-800">Day {idx + 1}</div>
                    <input className="w-full border border-gray-300 rounded-xl px-4 py-2" value={day.title} onChange={e => updateItinerary(idx, 'title', e.target.value)} placeholder="Title (e.g. Arrival in Manali)" />
                    <textarea className="w-full border border-gray-300 rounded-xl px-4 py-2" value={day.desc} onChange={e => updateItinerary(idx, 'desc', e.target.value)} placeholder="Description" rows={2} />
                  </div>
                ))}
                <button type="button" className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium" onClick={addItineraryDay}>+ Add Day</button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">ℹ️ This section is optional. You can skip if not applicable.</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Hotels Provided (Optional)</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.hotels} onChange={e => setForm(f => ({ ...f, hotels: e.target.value }))} placeholder="e.g. Hotel Snow View" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Hotel Category (Optional)</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.hotelCategory} onChange={e => setForm(f => ({ ...f, hotelCategory: e.target.value }))}>
                  <option value="">Select</option>
                  {hotelCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Meal Plan (Optional)</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.mealPlan} onChange={e => setForm(f => ({ ...f, mealPlan: e.target.value }))}>
                  <option value="">Select</option>
                  {mealPlans.map(mp => <option key={mp} value={mp}>{mp}</option>)}
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">ℹ️ This section is optional. You can skip if not applicable.</p>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Mode of Transport (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {transportModes.map(mode => (
                  <label key={mode} className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                    <input type="checkbox" checked={form.transport.includes(mode)} onChange={() => toggleMulti('transport', mode)} className="form-checkbox" />
                    {mode}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Pickup Location (Optional)</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.pickup} onChange={e => setForm(f => ({ ...f, pickup: e.target.value }))} placeholder="e.g. Delhi Airport" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Drop Location (Optional)</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.drop} onChange={e => setForm(f => ({ ...f, drop: e.target.value }))} placeholder="e.g. Chandigarh" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Inclusions (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {inclusionsList.map(inc => (
                  <button type="button" key={inc} onClick={() => toggleMulti('inclusions', inc)} className={`px-3 py-1 rounded-full border ${form.inclusions.includes(inc) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}>
                    {inc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Exclusions (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {exclusionsList.map(exc => (
                  <button type="button" key={exc} onClick={() => toggleMulti('exclusions', exc)} className={`px-3 py-1 rounded-full border ${form.exclusions.includes(exc) ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}>
                    {exc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Discounts (Optional)</label>
              <div className="flex flex-wrap gap-2">
                {discountsList.map(discount => (
                  <button type="button" key={discount} onClick={() => toggleMulti('discounts', discount)} className={`px-3 py-1 rounded-full border ${form.discounts.includes(discount) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}>
                    {discount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Cover Image (Banner)</label>
              <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-3" onChange={e => {
                const file = e.target.files[0];
                console.log('Cover image selected:', file);
                setForm(f => ({ ...f, cover: file }));
              }} />
              {form.cover && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-700 text-sm">✅ Cover image selected: {form.cover.name}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Gallery Images (Add at least 3 images)</label>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gallery Image 1 *</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                    onChange={e => {
                      const files = [...(form.gallery || [])];
                      files[0] = e.target.files[0];
                      setForm(f => ({ ...f, gallery: files }));
                    }} 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gallery Image 2 *</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                    onChange={e => {
                      const files = [...(form.gallery || [])];
                      files[1] = e.target.files[0];
                      setForm(f => ({ ...f, gallery: files }));
                    }} 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gallery Image 3 *</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                    onChange={e => {
                      const files = [...(form.gallery || [])];
                      files[2] = e.target.files[0];
                      setForm(f => ({ ...f, gallery: files }));
                    }} 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gallery Image 4 (Optional)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                    onChange={e => {
                      const files = [...(form.gallery || [])];
                      files[3] = e.target.files[0];
                      setForm(f => ({ ...f, gallery: files }));
                    }} 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gallery Image 5 (Optional)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                    onChange={e => {
                      const files = [...(form.gallery || [])];
                      files[4] = e.target.files[0];
                      setForm(f => ({ ...f, gallery: files }));
                    }} 
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">* Required fields. Upload at least 3 images for the gallery.</p>
              
              {/* Gallery Images Status */}
              {form.gallery && form.gallery.filter(img => img).length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-700 text-sm font-medium">
                      Gallery Images: {form.gallery.filter(img => img).length}/5 uploaded
                    </span>
                    {form.gallery.filter(img => img).length >= 3 && (
                      <span className="text-green-600 text-sm">✅ Minimum requirement met</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Itinerary PDF (Optional)</label>
              <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-3" onChange={e => setForm(f => ({ ...f, pdf: e.target.files[0] }))} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Handle trip selection for interested users
  const handleTripSelectionForUsers = (tripId) => {
    setSelectedTripForUsers(tripId);
    if (tripId) {
      fetchInterestedUsers(tripId);
    } else {
      setInterestedUsers([]);
    }
  };

  // Render Add New Package tab
  const renderAddNewPackage = () => (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-transparent gap-4 lg:gap-8">
      {/* Left Stepper Modal */}
      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 lg:p-6 w-full max-w-full lg:max-w-xs mb-4 lg:mb-0">
        <div className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">Add New Tour Package</div>
        <ol className="space-y-0.5">
          <li className={`flex items-start gap-2 sm:gap-3 py-2 sm:py-3 px-2 rounded-lg transition-all text-xs sm:text-sm ${step === 0 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> 
            <span className="mt-1">🧭</span> 
            <span>Basic Information</span> 
            {step === 0 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} 
          </li>
          <li className={`flex items-start gap-2 sm:gap-3 py-2 sm:py-3 px-2 rounded-lg transition-all text-xs sm:text-sm ${step === 1 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> 
            <span className="mt-1">🧳</span> 
            <span>Places & Itinerary</span> 
            {step === 1 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} 
          </li>
          <li className={`flex items-start gap-2 sm:gap-3 py-2 sm:py-3 px-2 rounded-lg transition-all text-xs sm:text-sm ${step === 2 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> 
            <span className="mt-1">🏨</span> 
            <span>Accommodation Details</span> 
            {step === 2 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} 
          </li>
          <li className={`flex items-start gap-2 sm:gap-3 py-2 sm:py-3 px-2 rounded-lg transition-all text-xs sm:text-sm ${step === 3 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> 
            <span className="mt-1">🚍</span> 
            <span>Transport & Inclusions</span> 
            {step === 3 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} 
          </li>
          <li className={`flex items-start gap-2 sm:gap-3 py-2 sm:py-3 px-2 rounded-lg transition-all text-xs sm:text-sm ${step === 4 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> 
            <span className="mt-1">🖼️</span> 
            <span>Media Upload</span> 
            {step === 4 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} 
          </li>
        </ol>
      </div>
      
      {/* Right Form Card */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-3 sm:p-4 lg:p-8 w-full max-w-full">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span className="text-green-800 text-sm font-medium">{successMessage}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={e => { 
          e.preventDefault(); 
          // Prepare form data for API
          const tripData = {
            title: form.title,
            destination: `${form.city}, ${form.state}`,
            description: form.description || `Explore ${form.city} with our amazing package`,
            duration: `${form.days} days, ${form.nights} nights`,
            price: parseInt(form.budget) || 0,
            tripType: form.tripType || 'Adventure',
            itinerary: form.itinerary.map(item => ({
              day: item.day,
              activities: item.title && item.desc ? `${item.title} - ${item.desc}` : (item.title || '')
            })),
            theme: form.theme || 'adventure',
            maxGroupSize: parseInt(form.maxGroupSize) || 20,
            minimumAge: 18,
            languageSupport: ['English'],
            discounts: form.discounts || [],
            cancellationPolicy: 'Standard cancellation policy applies',
            // New fields
            curatedJourneyType: form.curatedJourneyType,
            trending: form.trending,
            deals: form.deals,
            hiddenGem: form.hiddenGem,
            weekend: form.weekend
          };
          
          // Only add date fields if not a weekend trip
          if (!form.weekend) {
            tripData.startDate = form.startDate || form.date;
            tripData.endDate = form.endDate || (form.date ? new Date(new Date(form.date).getTime() + (form.days * 24 * 60 * 60 * 1000)).toISOString() : '');
            tripData.availableDates = form.date ? [form.date] : [];
            tripData.bookingDeadline = form.bookingDeadline || (form.date ? new Date(new Date(form.date).getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString() : '');
          }
          
          // Optional fields - only add if provided
          if (form.pickup) tripData.departureLocation = form.pickup;
          if (form.inclusions.length > 0 || form.exclusions.length > 0) {
            tripData.inclusions = {
              included: form.inclusions,
              notIncluded: form.exclusions
            };
          }
          if (form.transport.length > 0) tripData.travelMode = form.transport.join(', ');
          
          console.log('Form data being submitted:', form);
          console.log('Cover image status:', form.cover ? `Selected: ${form.cover.name} (${form.cover.size} bytes)` : 'No cover image');
          console.log('Trip data for API:', tripData);
          addTripDetails(tripData);
        }}>
          {renderStep()}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-6 sm:mt-10">
            {step > 0 && (
              <button type="button" className="border border-blue-600 text-blue-600 font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg shadow-sm hover:bg-blue-50 transition text-sm sm:text-base" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 4 && (
              <button type="button" className="bg-blue-600 text-white font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base" onClick={() => setStep(step + 1)}>
                Next
              </button>
            )}
            {step === 4 && (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg shadow transition text-sm sm:text-base ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:brightness-110'
                }`}
              >
                {isSubmitting ? 'Creating Trip...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  // Render packages tab
  const renderPackages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tour Packages</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Total: {trips.length} packages
          </div>
          <button 
            onClick={fetchAllTrips}
            disabled={isLoadingTrips}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoadingTrips ? '🔄' : '🔄 Refresh'}
          </button>
        </div>
      </div>
      
      {isLoadingTrips ? (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">Loading packages...</div>
        </div>
      ) : trips.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">No packages found</div>
          <div className="text-sm text-gray-500 mt-2">Create your first package in the "Add New Package" tab</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePackageSelect(trip)}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{trip.title}</h3>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              
              {trip.coverImage && (
                <div className="mb-4">
                  <img 
                    src={trip.coverImage} 
                    alt={trip.title} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">⏱️</span>
                  {trip.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">💰</span>
                  ₹{trip.price?.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  {trip.destination}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🎯</span>
                  {trip.tripType}
                </div>
              </div>
              
              <div className="text-center text-sm text-blue-600 font-medium">
                Click to view details
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render dashboard tab
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Statistics</h2>
        <button
          onClick={fetchStatistics}
          disabled={isLoadingStatistics}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoadingStatistics ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </>
          ) : (
            <>
              🔄 Refresh
            </>
          )}
        </button>
      </div>

      {isLoadingStatistics ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading statistics...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Signups */}
          <div 
            onClick={() => fetchStatisticsData('all-users', 'Total Signups')}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6 border border-blue-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-blue-600 mb-1">Total Signups</h3>
            <p className="text-3xl font-bold text-blue-900">{statistics.totalUsers || 0}</p>
            <p className="text-xs text-blue-700 mt-2">All registered users • Click to view</p>
          </div>

          {/* Verified Users */}
          <div 
            onClick={() => fetchStatisticsData('verified-users', 'Verified Users')}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border border-green-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-green-600 mb-1">Verified Users</h3>
            <p className="text-3xl font-bold text-green-900">{statistics.verifiedUsers || 0}</p>
            <p className="text-xs text-green-700 mt-2">Email verified users • Click to view</p>
          </div>

          {/* Unverified Users */}
          <div 
            onClick={() => fetchStatisticsData('unverified-users', 'Unverified Users')}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md p-6 border border-yellow-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-yellow-600 mb-1">Unverified Users</h3>
            <p className="text-3xl font-bold text-yellow-900">{statistics.unverifiedUsers || 0}</p>
            <p className="text-xs text-yellow-700 mt-2">Pending email verification • Click to view</p>
          </div>

          {/* Total Bookings */}
          <div 
            onClick={() => fetchStatisticsData('all-bookings', 'Total Bookings')}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6 border border-purple-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-purple-600 mb-1">Total Bookings</h3>
            <p className="text-3xl font-bold text-purple-900">{statistics.totalBookings || 0}</p>
            <p className="text-xs text-purple-700 mt-2">All booking inquiries • Click to view</p>
          </div>

          {/* Booked Users */}
          <div 
            onClick={() => fetchStatisticsData('booked-users', 'Booked Users')}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-md p-6 border border-indigo-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-indigo-600 mb-1">Booked Users</h3>
            <p className="text-3xl font-bold text-indigo-900">{statistics.bookedUsers || 0}</p>
            <p className="text-xs text-indigo-700 mt-2">Confirmed bookings • Click to view</p>
          </div>

          {/* Interested Users */}
          <div 
            onClick={() => fetchStatisticsData('interested-users', 'Interested Users')}
            className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-md p-6 border border-pink-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-pink-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-pink-600 mb-1">Interested Users</h3>
            <p className="text-3xl font-bold text-pink-900">{statistics.interestedUsers || 0}</p>
            <p className="text-xs text-pink-700 mt-2">Pending bookings • Click to view</p>
          </div>

          {/* Total Trips */}
          <div 
            onClick={() => fetchStatisticsData('all-trips', 'Total Trips')}
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-md p-6 border border-teal-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-teal-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-teal-600 mb-1">Total Trips</h3>
            <p className="text-3xl font-bold text-teal-900">{statistics.totalTrips || 0}</p>
            <p className="text-xs text-teal-700 mt-2">Available packages • Click to view</p>
          </div>

          {/* Recent Signups (Last 7 Days) */}
          <div 
            onClick={() => fetchStatisticsData('recent-signups', 'Recent Signups (Last 7 Days)')}
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md p-6 border border-orange-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-orange-600 mb-1">Recent Signups</h3>
            <p className="text-3xl font-bold text-orange-900">{statistics.recentSignups || 0}</p>
            <p className="text-xs text-orange-700 mt-2">Last 7 days • Click to view</p>
          </div>

          {/* Recent Bookings (Last 7 Days) */}
          <div 
            onClick={() => fetchStatisticsData('recent-bookings', 'Recent Bookings (Last 7 Days)')}
            className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border border-red-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-medium text-red-600 mb-1">Recent Bookings</h3>
            <p className="text-3xl font-bold text-red-900">{statistics.recentBookings || 0}</p>
            <p className="text-xs text-red-700 mt-2">Last 7 days • Click to view</p>
          </div>
        </div>
      )}

      {/* Statistics Detail Modal */}
      {showStatisticsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{selectedStatTitle}</h2>
              <button
                onClick={() => {
                  setShowStatisticsModal(false);
                  setStatisticsData([]);
                  setSelectedStatType('');
                  setSelectedStatTitle('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isLoadingStatisticsData ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <div className="text-lg text-gray-600">Loading data...</div>
                </div>
              ) : statisticsData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-lg text-gray-600">No data available</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {selectedStatType.includes('user') && !selectedStatType.includes('booking') ? (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signup Date</th>
                          </>
                        ) : selectedStatType.includes('booking') || selectedStatType.includes('interested') ? (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travelers</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                          </>
                        ) : selectedStatType.includes('trip') ? (
                          <>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                          </>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {statisticsData.map((item, index) => {
                        if (selectedStatType.includes('user') && !selectedStatType.includes('booking')) {
                          // User data
                          return (
                            <tr key={item._id || index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.name || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.email || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.isemailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.isemailVerified ? 'Verified' : 'Unverified'}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  }) : 'N/A'}
                                </div>
                              </td>
                            </tr>
                          );
                        } else if (selectedStatType.includes('booking') || selectedStatType.includes('interested')) {
                          // Booking data
                          return (
                            <tr key={item._id || index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.userId?.name || 'N/A'}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.email || item.userId?.email || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.mobileNumber || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.tripId?.title || 'N/A'}
                                  {item.tripId?.destination && (
                                    <div className="text-xs text-gray-500">{item.tripId.destination}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.bookingDate || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-medium">
                                  {item.numberOfTravelers ? `${item.numberOfTravelers} ${item.numberOfTravelers === 1 ? 'person' : 'people'}` : 'N/A'}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">
                                  {item.totalPrice ? `₹${item.totalPrice.toLocaleString('en-IN')}` : 'N/A'}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === 'booked' ? 'bg-green-100 text-green-800' :
                                  item.status === 'interested' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {item.status || 'N/A'}
                                </span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-xs text-gray-500">
                                  {item.createdAt ? new Date(item.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  }) : 'N/A'}
                                </div>
                              </td>
                            </tr>
                          );
                        } else if (selectedStatType.includes('trip')) {
                          // Trip data
                          return (
                            <tr key={item._id || index} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.title || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.destination || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.duration || 'N/A'}</div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">
                                  {item.price ? `₹${item.price.toLocaleString('en-IN')}` : 'N/A'}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="text-xs text-gray-500">
                                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  }) : 'N/A'}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total: {statisticsData.length} {selectedStatType.includes('user') ? 'users' : selectedStatType.includes('trip') ? 'trips' : 'bookings'}
              </div>
              <button
                onClick={() => {
                  setShowStatisticsModal(false);
                  setStatisticsData([]);
                  setSelectedStatType('');
                  setSelectedStatTitle('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render interested users tab
  const renderInterestedUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Interested Users</h2>
        <div className="text-sm text-gray-500">
          {selectedTripForUsers ? `Total: ${interestedUsers.length} users` : 'Select a trip to view interested users'}
        </div>
      </div>
      
      {/* Trip Selection Dropdown */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Trip Package
            </label>
            <select
              value={selectedTripForUsers}
              onChange={(e) => handleTripSelectionForUsers(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a trip package...</option>
              {trips.map((trip) => (
                <option key={trip._id} value={trip._id}>
                  {trip.title} - {trip.destination} (₹{trip.price?.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
          {selectedTripForUsers && (
            <button
              onClick={() => fetchInterestedUsers(selectedTripForUsers)}
              disabled={isLoadingInterestedUsers}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isLoadingInterestedUsers ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                <>
                  🔄 Refresh
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Interested Users Table */}
      {selectedTripForUsers ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {isLoadingInterestedUsers ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading interested users...</div>
            </div>
          ) : interestedUsers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600">No interested users found for this trip</div>
              <div className="text-sm text-gray-500 mt-2">Users who have shown interest in this package will appear here</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travelers</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {interestedUsers.map((user, index) => {
                    const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A';
                    const updatedAt = user.updatedAt ? new Date(user.updatedAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'N/A';
                    
                    return (
                      <tr key={user._id || user.id || index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.firstName || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.lastName || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.mobileNumber || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.bookingDate || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {user.numberOfTravelers ? `${user.numberOfTravelers} ${user.numberOfTravelers === 1 ? 'person' : 'people'}` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.totalPrice ? `₹${user.totalPrice.toLocaleString('en-IN')}` : 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            user.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                            user.status === 'booked' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status || 'interested'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-xs text-gray-500">{createdAt}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-xs text-gray-500">{updatedAt}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-gray-500 text-lg mb-2">No trip selected</div>
          <div className="text-gray-400 text-sm">Please select a trip package from the dropdown above to view interested users</div>
        </div>
      )}
    </div>
  );

  // Render Package Modal
  const renderPackageModal = () => {
    if (!selectedPackage) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-70">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
          <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={closePackageModal}>&times;</button>
          
          {/* View Mode - Show package details */}
          <div className="space-y-6">
            {selectedPackage.isLoading ? (
              <div className="text-center py-8">
                <div className="text-lg text-gray-600">Loading trip details...</div>
              </div>
            ) : (
              <>
                {/* Header with title and status */}
                <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedPackage.title}</h2>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>

                {/* Cover Image */}
                {selectedPackage.coverImage && (
                  <div className="w-full h-64 rounded-xl overflow-hidden">
                    <img 
                      src={selectedPackage.coverImage} 
                      alt={selectedPackage.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Basic Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span>📍</span> Destination
                    </h3>
                    <p className="text-blue-800 font-medium">{selectedPackage.destination}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <span>⏱️</span> Duration
                    </h3>
                    <p className="text-green-800 font-medium">{selectedPackage.duration}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <span>💰</span> Price
                    </h3>
                    <p className="text-purple-800 font-medium text-lg">₹{selectedPackage.price?.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                      <span>🎯</span> Trip Type
                    </h3>
                    <p className="text-orange-800 font-medium">{selectedPackage.tripType}</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                    <h3 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                      <span>🚗</span> Travel Mode
                    </h3>
                    <p className="text-indigo-800 font-medium">{selectedPackage.travelMode}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-900 mb-2 flex items-center gap-2">
                      <span>✈️</span> Departure
                    </h3>
                    <p className="text-pink-800 font-medium">{selectedPackage.departureLocation}</p>
                  </div>
                </div>

                {/* Description */}
                {selectedPackage.description && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2 text-lg">
                      <span>📝</span> Trip Description
                    </h3>
                    <p className="text-blue-800 leading-relaxed text-base">{selectedPackage.description}</p>
                  </div>
                )}

                {/* Trip Dates & Group Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2 text-lg">
                      <span>📅</span> Trip Schedule
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-emerald-700 font-medium">Start Date:</span>
                        <span className="text-emerald-900 font-semibold">
                          {new Date(selectedPackage.startDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-emerald-700 font-medium">End Date:</span>
                        <span className="text-emerald-900 font-semibold">
                          {new Date(selectedPackage.endDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-emerald-700 font-medium">Booking Deadline:</span>
                        <span className="text-emerald-900 font-semibold">
                          {new Date(selectedPackage.bookingDeadline).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2 text-lg">
                      <span>👥</span> Group Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-amber-700 font-medium">Max Group Size:</span>
                        <span className="text-amber-900 font-semibold">{selectedPackage.maxGroupSize} people</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-amber-700 font-medium">Minimum Age:</span>
                        <span className="text-amber-900 font-semibold">{selectedPackage.minimumAge} years</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-amber-700 font-medium">Languages:</span>
                        <span className="text-amber-900 font-semibold">
                          {selectedPackage.languageSupport?.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Dates */}
                {selectedPackage.availableDates && selectedPackage.availableDates.length > 0 && (
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border border-cyan-200">
                    <h3 className="font-semibold text-cyan-900 mb-4 flex items-center gap-2 text-lg">
                      <span>🗓️</span> Available Dates
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedPackage.availableDates.map((date, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg text-center">
                          <span className="text-cyan-800 font-medium">
                            {new Date(date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 && (
                  <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-lg border border-violet-200">
                    <h3 className="font-semibold text-violet-900 mb-6 flex items-center gap-2 text-lg">
                      <span>🗺️</span> Detailed Itinerary
                    </h3>
                    <div className="space-y-4">
                      {selectedPackage.itinerary.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-violet-500 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-violet-500 to-violet-600 text-white px-3 py-2 rounded-full text-sm font-bold min-w-[70px] text-center">
                              Day {item.day}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-violet-900 text-lg mb-2">Daily Activities</h4>
                              <p className="text-violet-800 leading-relaxed">{item.activities}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Options & Discounts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-lg border border-rose-200">
                    <h3 className="font-semibold text-rose-900 mb-4 flex items-center gap-2 text-lg">
                      <span>💳</span> Payment Options
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-rose-700 font-medium">Partial Payment:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedPackage.paymentOptions?.partialPayment 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedPackage.paymentOptions?.partialPayment ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-rose-700 font-medium">EMI Available:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedPackage.paymentOptions?.emiAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedPackage.paymentOptions?.emiAvailable ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-4 flex items-center gap-2 text-lg">
                      <span>🏷️</span> Available Discounts
                    </h3>
                    <div className="space-y-3">
                      {selectedPackage.discounts && selectedPackage.discounts.length > 0 ? (
                        selectedPackage.discounts.map((discount, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-lg text-center">
                            <span className="text-yellow-800 font-semibold bg-yellow-100 px-3 py-1 rounded-full">
                              {discount}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white p-3 rounded-lg text-center">
                          <span className="text-yellow-600 font-medium">No discounts available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cancellation Policy */}
                {selectedPackage.cancellationPolicy && (
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-4 flex items-center gap-2 text-lg">
                      <span>📋</span> Cancellation Policy
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-orange-800 leading-relaxed">{selectedPackage.cancellationPolicy}</p>
                    </div>
                  </div>
                )}

                {/* Gallery Images */}
                {selectedPackage.gallery && selectedPackage.gallery.length > 0 && (
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg border border-teal-200">
                    <h3 className="font-semibold text-teal-900 mb-6 flex items-center gap-2 text-lg">
                      <span>🖼️</span> Trip Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {selectedPackage.gallery.map((image, idx) => (
                        <div key={idx} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                          <img 
                            src={image} 
                            alt={`Gallery ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleUpdatePackage}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    ✏️ Edit Package
                  </button>
                  <button
                    onClick={handleDeletePackage}
                    disabled={deleteLoading}
                    className={`flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl ${
                      deleteLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {deleteLoading ? '🗑️ Deleting...' : '🗑️ Delete Package'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Show Admin Login Modal if not logged in */}
      {showLoginModal && (
        <AdminLogin 
          isOpen={showLoginModal} 
          onClose={handleLoginClose}
        />
      )}

      {/* Show Admin Landing Page after successful login */}
      {isAdminLoggedIn && (
        <AdminHeader>
          <div className="max-w-7xl mx-auto">
            {/* Admin Token Display */}
            
            
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'dashboard'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('add-package')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'add-package'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    ➕ Add New Package
                  </button>
                  <button
                    onClick={() => setActiveTab('packages')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'packages'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📦 Packages
                  </button>
                  <button
                    onClick={() => setActiveTab('interested-users')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'interested-users'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    👥 Interested Users
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'add-package' && renderAddNewPackage()}
                {activeTab === 'packages' && renderPackages()}
                {activeTab === 'interested-users' && renderInterestedUsers()}
              </div>
            </div>
          </div>
        </AdminHeader>
      )}

      {/* Package Modal */}
      {renderPackageModal()}

      {/* Edit Package Modal */}
      <EditPackageModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingPackage(null);
        }}
        packageData={editingPackage}
        onUpdate={handlePackageUpdate}
      />
    </>
  );
}

export default AdminLanding;
