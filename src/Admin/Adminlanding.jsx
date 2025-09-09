import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../Components/AdminLogin';
import AdminHeader from '../Components/AdminHeader';
import EditPackageModal from '../Components/EditPackageModal';
import { adminApi } from '../services/adminApiService';

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
  const [activeTab, setActiveTab] = useState('add-package');
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
    themes: [],
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

  // Fetch trips when admin is logged in
  useEffect(() => {
    if (isAdminLoggedIn && adminToken) {
      fetchAllTrips();
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
    if (!form.title || !form.description || !form.city || !form.state || !form.date || !form.budget) {
      alert('Please fill in all required fields: Title, Description, City, State, Date, and Budget');
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
    // Validate start and end dates if provided
    if (form.startDate && form.endDate) {
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
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('endDate', formData.endDate);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('tripType', formData.tripType);
      formDataToSend.append('itinerary', JSON.stringify(formData.itinerary || []));
      formDataToSend.append('departureLocation', formData.departureLocation || '');
      formDataToSend.append('inclusions', JSON.stringify(formData.inclusions || {}));
      formDataToSend.append('travelMode', formData.travelMode || '');
      formDataToSend.append('theme', formData.theme || 'adventure');
      formDataToSend.append('maxGroupSize', formData.maxGroupSize || 20);
      formDataToSend.append('minimumAge', formData.minimumAge || 18);
      formDataToSend.append('languageSupport', JSON.stringify(formData.languageSupport || ['English']));
      formDataToSend.append('availableDates', JSON.stringify(formData.availableDates || []));
      formDataToSend.append('bookingDeadline', formData.bookingDeadline || '');
      formDataToSend.append('discounts', JSON.stringify(formData.discounts || []));
      formDataToSend.append('cancellationPolicy', formData.cancellationPolicy || 'Standard cancellation policy applies');
      // Add new fields
      formDataToSend.append('curatedJourneyType', formData.curatedJourneyType || '');
      formDataToSend.append('trending', formData.trending || false);
      formDataToSend.append('deals', formData.deals || false);
      formDataToSend.append('hiddenGem', formData.hiddenGem || false);
      
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

      const response = await fetch('https://tripnova-backend.onrender.com/api/admin/trip/add-tripDetails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          // Don't set Content-Type header - let browser set it for FormData
        },
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
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
      const response = await fetch('https://tripnova-backend.onrender.com/api/trips/getAllTrips', {
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
      const response = await fetch(`https://tripnova-backend.onrender.com/api/trips/get-trip-details/${tripId}`, {
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

  // API function to fetch interested users for a specific trip
  const fetchInterestedUsers = async (tripId) => {
    if (!adminToken || !tripId) {
      console.log('No admin token or trip ID available for fetching interested users');
      return;
    }

    setIsLoadingInterestedUsers(true);
    try {
      console.log('Fetching interested users for trip ID:', tripId);
      
      const response = await fetch(`https://tripnova-backend.onrender.com/api/user/trip/get-interested-users/${tripId}`, {
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
        itinerary: detailedTrip.itinerary ? detailedTrip.itinerary.map(item => ({
          day: item.day,
          title: item.activities,
          desc: item.activities
        })) : [{ day: 1, title: '', desc: '' }],
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
        itinerary: trip.itinerary ? trip.itinerary.map(item => ({
          day: item.day,
          title: item.activities,
          desc: item.activities
        })) : [{ day: 1, title: '', desc: '' }],
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
            <div>
              <label className="block font-medium text-gray-700 mb-1">Trip Theme</label>
              <div className="flex flex-wrap gap-2">
                {tripThemes.map(theme => (
                  <button type="button" key={theme} onClick={() => toggleMulti('themes', theme)} className={`px-3 py-1 rounded-full border ${form.themes.includes(theme) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}>
                    {theme}
                  </button>
                ))}
              </div>
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
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Max Group Size</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.maxGroupSize} onChange={e => setForm(f => ({ ...f, maxGroupSize: e.target.value }))} placeholder="20" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Booking Deadline</label>
                <input type="date" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.bookingDeadline} onChange={e => setForm(f => ({ ...f, bookingDeadline: e.target.value }))} />
              </div>
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
            <div>
              <label className="block font-medium text-gray-700 mb-1">Hotels Provided</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.hotels} onChange={e => setForm(f => ({ ...f, hotels: e.target.value }))} placeholder="e.g. Hotel Snow View" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Hotel Category</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.hotelCategory} onChange={e => setForm(f => ({ ...f, hotelCategory: e.target.value }))}>
                  <option value="">Select</option>
                  {hotelCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Meal Plan</label>
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
            <div>
              <label className="block font-medium text-gray-700 mb-1">Mode of Transport</label>
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
                <label className="block font-medium text-gray-700 mb-1">Pickup Location</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.pickup} onChange={e => setForm(f => ({ ...f, pickup: e.target.value }))} placeholder="e.g. Delhi Airport" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Drop Location</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.drop} onChange={e => setForm(f => ({ ...f, drop: e.target.value }))} placeholder="e.g. Chandigarh" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Inclusions</label>
              <div className="flex flex-wrap gap-2">
                {inclusionsList.map(inc => (
                  <button type="button" key={inc} onClick={() => toggleMulti('inclusions', inc)} className={`px-3 py-1 rounded-full border ${form.inclusions.includes(inc) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}>
                    {inc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Exclusions</label>
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
            description: `Explore ${form.city} with our amazing package`,
            duration: `${form.days} days, ${form.nights} nights`,
            // Use new start/end dates if provided, otherwise fallback to calculated dates
            startDate: form.startDate || form.date,
            endDate: form.endDate || new Date(new Date(form.date).getTime() + (form.days * 24 * 60 * 60 * 1000)).toISOString(),
            price: parseInt(form.budget) || 0,
            tripType: form.tripType || 'Adventure',
            itinerary: form.itinerary.map(item => ({
              day: item.day,
              activities: item.title
            })),
            departureLocation: form.pickup,
            inclusions: {
              included: form.inclusions,
              notIncluded: form.exclusions
            },
            travelMode: form.transport.join(', '),
            theme: form.theme || 'adventure',
            maxGroupSize: parseInt(form.maxGroupSize) || 20,
            minimumAge: 18,
            languageSupport: ['English'],
            availableDates: [form.date],
            bookingDeadline: form.bookingDeadline || new Date(new Date(form.date).getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString(),
            discounts: form.discounts || [],
            cancellationPolicy: 'Standard cancellation policy applies',
            // New fields
            curatedJourneyType: form.curatedJourneyType,
            trending: form.trending,
            deals: form.deals,
            hiddenGem: form.hiddenGem
          };
          
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {interestedUsers.map((user, index) => (
                    <tr key={user._id || user.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName || user.firstName + ' ' + user.lastName || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.mobileNumber || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          user.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                          user.status === 'booked' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status || 'interested'}
                        </span>
                      </td>
                    </tr>
                  ))}
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
