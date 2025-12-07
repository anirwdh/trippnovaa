import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApiService';

// Constants matching AdminLanding
const tripThemes = ['Adventure', 'Honeymoon', 'Family', 'Beach', 'Pilgrimage', 'Weekend'];
const hotelCategories = ['2-star', '3-star', '4-star', '5-star'];
const mealPlans = ['Breakfast Only', 'MAP', 'AP', 'CP'];
const transportModes = ['Car', 'Bus', 'Train', 'Flight'];
const inclusionsList = ['Hotel Stay', 'Meals', 'Sightseeing', 'Guide'];
const exclusionsList = ['Flights', 'Personal Expenses', 'Tips', 'Insurance'];

function EditPackageModal({ isOpen, onClose, packageData, onUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
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
    languageSupport: ['English'],
    cover: null,
    gallery: [],
    pdf: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize form data when package data changes
  useEffect(() => {
    if (packageData) {
      console.log('EditPackageModal: Received package data:', packageData);
      console.log('EditPackageModal: Package ID:', packageData._id);
      console.log('EditPackageModal: Package title:', packageData.title);
      
      setFormData({
        title: packageData.title || '',
        days: packageData.days || packageData.duration?.split(' ')[0] || '',
        nights: packageData.nights || packageData.duration?.split(' ')[3] || '',
        budget: packageData.budget || packageData.price || '',
        themes: Array.isArray(packageData.themes) ? packageData.themes : 
                packageData.tripType ? [packageData.tripType] : [],
        city: packageData.city || packageData.destination?.split(',')[0]?.trim() || '',
        state: packageData.state || packageData.destination?.split(',')[1]?.trim() || '',
        date: packageData.date || packageData.startDate?.split('T')[0] || '',
        citiesCovered: Array.isArray(packageData.citiesCovered) ? packageData.citiesCovered : 
                      packageData.destination ? [packageData.destination] : [],
        itinerary: Array.isArray(packageData.itinerary) ? packageData.itinerary.map(item => ({
          day: item.day,
          title: item.title || item.activities || '',
          desc: item.desc || item.activities || ''
        })) : [{ day: 1, title: '', desc: '' }],
        hotels: packageData.hotels || '',
        hotelCategory: packageData.hotelCategory || '',
        mealPlan: packageData.mealPlan || '',
        transport: Array.isArray(packageData.transport) ? packageData.transport : 
                  packageData.travelMode ? [packageData.travelMode] : [],
        pickup: packageData.pickup || packageData.departureLocation || '',
        drop: packageData.drop || packageData.departureLocation || '',
        inclusions: Array.isArray(packageData.inclusions) ? packageData.inclusions : 
                   Array.isArray(packageData.inclusions?.included) ? packageData.inclusions.included : [],
        exclusions: Array.isArray(packageData.exclusions) ? packageData.exclusions : 
                   Array.isArray(packageData.inclusions?.excluded) ? packageData.inclusions.excluded : [],
        languageSupport: Array.isArray(packageData.languageSupport) ? packageData.languageSupport : ['English'],
        cover: packageData.cover || packageData.coverImage || null,
        gallery: Array.isArray(packageData.gallery) ? packageData.gallery : [],
        pdf: packageData.pdf || null,
      });
    } else {
      // Reset form when no package data
      setFormData({
        title: '',
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
        languageSupport: ['English'],
        cover: null,
        gallery: [],
        pdf: null,
      });
    }
  }, [packageData]);

  // Helper for multi-select (matching AdminLanding)
  const toggleMulti = (field, value) => {
    setFormData(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }));
  };

  // Helper for itinerary (matching AdminLanding)
  const addItineraryDay = () => {
    setFormData(f => ({ 
      ...f, 
      itinerary: [...f.itinerary, { day: f.itinerary.length + 1, title: '', desc: '' }] 
    }));
  };

  const updateItinerary = (idx, key, value) => {
    setFormData(f => ({
      ...f,
      itinerary: f.itinerary.map((d, i) => i === idx ? { ...d, [key]: value } : d),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.title || !formData.city || !formData.state || !formData.date || !formData.budget) {
      setError('Please fill in all required fields (Title, City, State, Date, Budget)');
      setLoading(false);
      return;
    }

    try {
      // Create FormData for the API call (matching Postman format)
      const formDataToSend = new FormData();
      
      // Helper function to sanitize values
      const sanitizeValue = (value) => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') return value.trim();
        if (typeof value === 'number') return value.toString();
        if (typeof value === 'boolean') return value.toString();
        if (Array.isArray(value)) return JSON.stringify(value);
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
      };
      
      // Add all text fields in the exact format expected by the API
      formDataToSend.append('title', sanitizeValue(formData.title));
      formDataToSend.append('destination', sanitizeValue(`${formData.city || ''}, ${formData.state || ''}`));
      formDataToSend.append('description', sanitizeValue(`Explore ${formData.city || 'this destination'} with our amazing package`));
      formDataToSend.append('duration', sanitizeValue(`${formData.days || 0} days, ${formData.nights || 0} nights`));
      formDataToSend.append('startDate', sanitizeValue(formData.date || new Date().toISOString().split('T')[0]));
      formDataToSend.append('endDate', sanitizeValue(new Date(new Date(formData.date || new Date()).getTime() + ((parseInt(formData.days) || 0) * 24 * 60 * 60 * 1000)).toISOString()));
      formDataToSend.append('price', sanitizeValue(parseInt(formData.budget) || 0));
      formDataToSend.append('tripType', sanitizeValue(formData.themes?.[0] || 'Adventure'));
      formDataToSend.append('itinerary', sanitizeValue((formData.itinerary || []).map(item => ({
        day: item.day || 1,
        activities: item.title || ''
      }))));
      formDataToSend.append('departureLocation', sanitizeValue(formData.pickup));
      formDataToSend.append('inclusions', sanitizeValue({
        included: formData.inclusions || [],
        notIncluded: formData.exclusions || []
      }));
      formDataToSend.append('travelMode', sanitizeValue((formData.transport || []).join(', ') || 'Private transport'));
      formDataToSend.append('theme', sanitizeValue(formData.themes?.[0]?.toLowerCase() || 'adventure'));
      formDataToSend.append('maxGroupSize', sanitizeValue(20));
      formDataToSend.append('minimumAge', sanitizeValue(18));
      formDataToSend.append('languageSupport', sanitizeValue(formData.languageSupport || ['English']));
      formDataToSend.append('availableDates', sanitizeValue([formData.date || new Date().toISOString().split('T')[0]]));
      formDataToSend.append('bookingDeadline', sanitizeValue(new Date(new Date(formData.date || new Date()).getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString()));
      formDataToSend.append('cancellationPolicy', sanitizeValue('Full refund if canceled 14 days prior to departure'));
      formDataToSend.append('paymentOptions', sanitizeValue({
        partialPayment: true,
        emiAvailable: false
      }));
      formDataToSend.append('discounts', sanitizeValue(['EARLYBIRD10', 'GROUP5']));
      
      // Add cover image if exists
      if (formData.cover) {
        formDataToSend.append('coverimage', formData.cover);
      } else if (packageData.coverImage) {
        // If no new cover image, keep the existing one
        formDataToSend.append('coverimage', packageData.coverImage);
      }
      
      // Add gallery images if exists
      if (formData.gallery && formData.gallery.length > 0) {
        formData.gallery.forEach((image, index) => {
          if (image instanceof File) {
            formDataToSend.append('gallery', image);
          } else if (typeof image === 'string') {
            // If it's a URL string, keep it as is
            formDataToSend.append('gallery', image);
          }
        });
      } else if (packageData.gallery && packageData.gallery.length > 0) {
        // If no new gallery, keep the existing one
        packageData.gallery.forEach(image => {
          formDataToSend.append('gallery', image);
        });
      }

      console.log('FormData being sent:', formDataToSend);
      console.log('Package ID:', packageData._id);
      console.log('Form data before transformation:', formData);
      
      // Debug: Show FormData contents
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`FormData ${key}:`, value);
      }
      
      // Validate FormData before sending
      console.log('=== FORM DATA VALIDATION ===');
      const requiredFields = ['title', 'destination', 'duration', 'startDate', 'endDate', 'price', 'tripType'];
      const missingFields = [];
      
      for (const field of requiredFields) {
        const value = formDataToSend.get(field);
        if (!value || value === 'undefined' || value === 'null' || value === '') {
          missingFields.push(field);
        }
        console.log(`Field ${field}:`, value, `(Type: ${typeof value})`);
      }
      
      if (missingFields.length > 0) {
        console.error('Missing or invalid required fields:', missingFields);
        setError(`Missing required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }
      
      console.log('FormData validation passed');
      console.log('=== END VALIDATION ===');

      // Call the update API with FormData
      const response = await adminApi.updateTripDetails(packageData._id, formDataToSend);
      
      console.log('=== API RESPONSE ANALYSIS ===');
      console.log('Raw API response:', response);
      console.log('Response type:', typeof response);
      console.log('Response keys:', Object.keys(response || {}));
      console.log('Response success:', response?.success);
      console.log('Response message:', response?.message);
      console.log('Response data:', response?.data);
      console.log('Response status:', response?.status);
      console.log('Response error:', response?.error);
      console.log('Response toString:', response?.toString());
      console.log('Response JSON:', JSON.stringify(response, null, 2));
      console.log('=== END ANALYSIS ===');
      
      // Check for success in multiple ways (API might return different structures)
      const isSuccess = response?.success === true || 
                       response?.status === 200 || 
                       response?.status === 'success' ||
                       (response?.message && response?.message.toLowerCase().includes('success'));
      
      console.log('Success check result:', isSuccess);
      
      if (isSuccess) {
        console.log('✅ Package update successful!');
        setSuccess('Package updated successfully!');
        setError(''); // Clear any existing errors
        
        // Call onUpdate with the response data or the original package data if no response data
        const updatedData = response?.data || response || packageData;
        console.log('Data being passed to onUpdate:', updatedData);
        
        try {
          onUpdate(updatedData);
        } catch (updateError) {
          console.error('Error in onUpdate callback:', updateError);
        }
        
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        console.log('❌ Package update failed');
        const errorMessage = response?.message || response?.error || 'Failed to update package';
        console.log('Setting error message:', errorMessage);
        setError(errorMessage);
        setSuccess(''); // Clear any existing success message
        console.error('API returned error:', response);
      }
    } catch (err) {
      console.error('=== ERROR DETAILS ===');
      console.error('Error updating package:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      console.error('Error cause:', err.cause);
      console.error('Full error object:', err);
      console.error('=== END ERROR DETAILS ===');
      
      // Handle specific error types
      if (err.message && err.message.includes('500')) {
        setError('Server error (500): The server encountered an error processing your request. Please check the console for details.');
        console.error('500 Server Error Details:', err);
      } else if (err.message && err.message.includes('400')) {
        setError('Bad Request (400): The data sent was invalid. Please check all required fields.');
      } else if (err.message && err.message.includes('401')) {
        setError('Unauthorized (401): Please login again as your session may have expired.');
      } else if (err.message && err.message.includes('403')) {
        setError('Forbidden (403): You do not have permission to perform this action.');
      } else if (err.message && err.message.includes('404')) {
        setError('Not Found (404): The package or endpoint could not be found.');
      } else {
        setError(err.message || 'An error occurred while updating the package');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Don't render if no package data is provided
  if (!packageData) {
    console.warn('EditPackageModal: No package data provided');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-backdrop">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto m-4 modal-content">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Package: {packageData.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Error: {error}</span>
                <button 
                  onClick={() => setError('')} 
                  className="text-red-400 hover:text-red-600 text-lg font-bold"
                >
                  ×
                </button>
              </div>
              <div className="text-sm text-red-600 mt-1">
                Error state: {error} | Type: {typeof error}
              </div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span>{success}</span>
                <button 
                  onClick={() => setSuccess('')} 
                  className="text-green-400 hover:text-green-600 text-lg font-bold"
                >
                  ×
                </button>
              </div>
              <div className="text-sm text-green-600 mt-1">
                Success state: {success} | Type: {typeof success}
              </div>
            </div>
          )}

          {/* Debug Information (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm">
              <div className="font-semibold mb-2">Debug Info:</div>
              <div>Error State: "{error}" (Type: {typeof error})</div>
              <div>Success State: "{success}" (Type: {typeof success})</div>
              <div>Loading State: {loading ? 'true' : 'false'}</div>
              <div>Package ID: {packageData?._id}</div>
            </div>
          )}

          {/* Step 0: Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🧭 Basic Information</h3>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Tour Package Title</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" 
                value={formData.title} 
                onChange={e => handleInputChange('title', e.target.value)} 
                placeholder="e.g. Manali Adventure" 
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">Duration (Days)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" 
                  value={formData.days} 
                  onChange={e => handleInputChange('days', e.target.value)} 
                  placeholder="5" 
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Nights</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" 
                  value={formData.nights} 
                  onChange={e => handleInputChange('nights', e.target.value)} 
                  placeholder="4" 
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Budget (per person)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base" 
                value={formData.budget} 
                onChange={e => handleInputChange('budget', e.target.value)} 
                placeholder="12000" 
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Trip Theme</label>
              <div className="flex flex-wrap gap-2">
                {tripThemes.map(theme => (
                  <button 
                    type="button" 
                    key={theme} 
                    onClick={() => toggleMulti('themes', theme)} 
                    className={`px-3 py-1 rounded-full border ${formData.themes.includes(theme) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Location / City</label>
                <input 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                  value={formData.city} 
                  onChange={e => handleInputChange('city', e.target.value)} 
                  placeholder="e.g. Manali" 
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">State / Country</label>
                <input 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                  value={formData.state} 
                  onChange={e => handleInputChange('state', e.target.value)} 
                  placeholder="e.g. Himachal Pradesh" 
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Date Availability</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                value={formData.date} 
                onChange={e => handleInputChange('date', e.target.value)} 
              />
            </div>
          </div>

          {/* Step 1: Places & Itinerary */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🧳 Places & Itinerary</h3>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Cities Covered</label>
              <input 
                className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                value={formData.citiesCovered.join(', ')} 
                onChange={e => handleInputChange('citiesCovered', e.target.value.split(',').map(s => s.trim()))} 
                placeholder="e.g. Manali, Kullu, Solang" 
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Day-wise Itinerary</label>
              <div className="space-y-4">
                {formData.itinerary.map((day, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                    <div className="font-semibold text-gray-800">Day {idx + 1}</div>
                    <input 
                      className="w-full border border-gray-300 rounded-xl px-4 py-2" 
                      value={day.title} 
                      onChange={e => updateItinerary(idx, 'title', e.target.value)} 
                      placeholder="Title (e.g. Arrival in Manali)" 
                    />
                    <textarea 
                      className="w-full border border-gray-300 rounded-xl px-4 py-2" 
                      value={day.desc} 
                      onChange={e => updateItinerary(idx, 'desc', e.target.value)} 
                      placeholder="Description" 
                      rows={2} 
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium" 
                  onClick={addItineraryDay}
                >
                  + Add Day
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Accommodation Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏨 Accommodation Details</h3>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Hotels Provided</label>
              <input 
                className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                value={formData.hotels} 
                onChange={e => handleInputChange('hotels', e.target.value)} 
                placeholder="e.g. Hotel Snow View" 
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Hotel Category</label>
                <select 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                  value={formData.hotelCategory} 
                  onChange={e => handleInputChange('hotelCategory', e.target.value)}
                >
                  <option value="">Select</option>
                  {hotelCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Meal Plan</label>
                <select 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                  value={formData.mealPlan} 
                  onChange={e => handleInputChange('mealPlan', e.target.value)}
                >
                  <option value="">Select</option>
                  {mealPlans.map(mp => <option key={mp} value={mp}>{mp}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Transport & Inclusions */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚍 Transport & Inclusions</h3>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Mode of Transport</label>
              <div className="flex flex-wrap gap-2">
                {transportModes.map(mode => (
                  <label key={mode} className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                    <input 
                      type="checkbox" 
                      checked={formData.transport.includes(mode)} 
                      onChange={() => toggleMulti('transport', mode)} 
                      className="form-checkbox" 
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Pickup Location</label>
                <input 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                  value={formData.pickup} 
                  onChange={e => handleInputChange('pickup', e.target.value)} 
                  placeholder="e.g. Delhi Airport" 
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Drop Location</label>
                <input 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                  value={formData.drop} 
                  onChange={e => handleInputChange('drop', e.target.value)} 
                  placeholder="e.g. Chandigarh" 
                />
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Inclusions</label>
              <div className="flex flex-wrap gap-2">
                {inclusionsList.map(inc => (
                  <button 
                    type="button" 
                    key={inc} 
                    onClick={() => toggleMulti('inclusions', inc)} 
                    className={`px-3 py-1 rounded-full border ${formData.inclusions.includes(inc) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}
                  >
                    {inc}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Exclusions</label>
              <div className="flex flex-wrap gap-2">
                {exclusionsList.map(exc => (
                  <button 
                    type="button" 
                    key={exc} 
                    onClick={() => toggleMulti('exclusions', exc)} 
                    className={`px-3 py-1 rounded-full border ${formData.exclusions.includes(exc) ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'} font-medium text-sm`}
                  >
                    {exc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Media Upload */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🖼️ Media Upload</h3>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Cover Image (Banner)</label>
              <input 
                type="file" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                onChange={e => {
                  const file = e.target.files[0];
                  console.log('Cover image selected:', file);
                  handleInputChange('cover', file);
                }} 
              />
              {formData.cover && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-700 text-sm">✅ Cover image selected: {formData.cover.name}</span>
                </div>
              )}
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Gallery Images</label>
              <input 
                type="file" 
                multiple 
                className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                onChange={e => handleInputChange('gallery', Array.from(e.target.files))} 
              />
            </div>
            
            <div>
              <label className="block font-medium text-gray-700 mb-1">Itinerary PDF (Optional)</label>
              <input 
                type="file" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3" 
                onChange={e => handleInputChange('pdf', e.target.files[0])} 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white rounded-lg hover:brightness-110 disabled:bg-gray-400 disabled:cursor-not-allowed ${
                loading ? 'opacity-75' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPackageModal;
