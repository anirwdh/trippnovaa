import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tripThemes = ['Adventure', 'Honeymoon', 'Family', 'Beach', 'Pilgrimage', 'Weekend'];
const hotelCategories = ['2-star', '3-star', '4-star', '5-star'];
const mealPlans = ['Breakfast Only', 'MAP', 'AP', 'CP'];
const transportModes = ['Car', 'Bus', 'Train', 'Flight'];
const inclusionsList = ['Hotel Stay', 'Meals', 'Sightseeing', 'Guide'];
const exclusionsList = ['Flights', 'Personal Expenses', 'Tips', 'Insurance'];

function AgencyLandingPage() {
  const navigate = useNavigate();
  const initialForm = {
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
    cover: null,
    gallery: [],
    pdf: null,
  };
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);

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

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Tour Package Title</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Manali Adventure" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Duration (Days)</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.days} onChange={e => setForm(f => ({ ...f, days: e.target.value }))} placeholder="5" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1">Nights</label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.nights} onChange={e => setForm(f => ({ ...f, nights: e.target.value }))} placeholder="4" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Budget (per person)</label>
              <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="12000" />
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
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Cover Image (Banner)</label>
              <input type="file" className="w-full border border-gray-300 rounded-xl px-4 py-3" onChange={e => setForm(f => ({ ...f, cover: e.target.files[0] }))} />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Gallery Images</label>
              <input type="file" multiple className="w-full border border-gray-300 rounded-xl px-4 py-3" onChange={e => setForm(f => ({ ...f, gallery: Array.from(e.target.files) }))} />
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
      <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 sm:px-8 py-4">
        <span className="text-2xl sm:text-2xl font-extrabold tracking-tight text-purple-700">trippnova</span>
        <div className="flex items-center gap-4">
         
          <button type="button" className="px-0 py-0  text-grey-700  font-semibold  transition text-sm" onClick={() => navigate('/AgencyPackages')}>Packages</button>
          <button
            type="button"
            className="text-grey-400 font-semibold text-sm px-0 py-0 bg-transparent shadow-none rounded-none border-none hover:underline cursor-pointer focus:outline-none"
            style={{ background: 'none' }}
            onClick={() => { setForm(initialForm); setStep(0); }}
          >
            Add New Tour Package
          </button>
        </div>
      </header>
      <div className="w-full h-4" />
      <main className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent gap-4 md:gap-8 px-2 sm:px-4 mt-8 mb-12">
        {/* Left Stepper Modal */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-full md:max-w-xs mb-4 md:mb-0">
          <div className="font-bold text-lg mb-6 text-gray-900">Add New Tour Package</div>
          <ol className="space-y-0.5">
            <li className={`flex items-start gap-3 py-3 px-2 rounded-lg transition-all ${step === 0 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> <span className="mt-1">🧭</span> <span>Basic Information</span> {step === 0 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} </li>
            <li className={`flex items-start gap-3 py-3 px-2 rounded-lg transition-all ${step === 1 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> <span className="mt-1">🧳</span> <span>Places & Itinerary</span> {step === 1 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} </li>
            <li className={`flex items-start gap-3 py-3 px-2 rounded-lg transition-all ${step === 2 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> <span className="mt-1">🏨</span> <span>Accommodation Details</span> {step === 2 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} </li>
            <li className={`flex items-start gap-3 py-3 px-2 rounded-lg transition-all ${step === 3 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> <span className="mt-1">🚍</span> <span>Transport & Inclusions</span> {step === 3 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} </li>
            <li className={`flex items-start gap-3 py-3 px-2 rounded-lg transition-all ${step === 4 ? 'bg-blue-50 font-bold text-blue-700' : 'text-gray-700'}`}> <span className="mt-1">🖼️</span> <span>Media Upload</span> {step === 4 && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>} </li>
          </ol>
        </div>
        {/* Right Form Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-4 sm:p-8 w-full max-w-full">
          <form onSubmit={e => { e.preventDefault(); alert('Package submitted!'); }}>
            {renderStep()}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
              {step > 0 && (
                <button type="button" className="border border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-xl shadow-sm hover:bg-blue-50 transition text-base" onClick={() => setStep(step - 1)}>
                  Back
                </button>
              )}
              {step < 4 && (
                <button type="button" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition text-base" onClick={() => setStep(step + 1)}>
                  Next
                </button>
              )}
              {step === 4 && (
                <button type="submit" className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-xl shadow hover:brightness-110 transition text-base">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AgencyLandingPage;
