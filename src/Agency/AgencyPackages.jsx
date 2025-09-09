import React, { useEffect, useState } from 'react';
import manaliImg from '../assets/Images/Manali.jpg';
import goaImg from '../assets/Images/Goa.jpg';
import kashmirImg from '../assets/Images/kashmir.jpg';
import keralaImg from '../assets/Images/kerala.jpg';
import spitiImg from '../assets/Images/spiti.jpg';
import himaImg from '../assets/Images/hima.jpg';
import Footer from '../Components/Footer';
import EditPackageModal from '../Components/EditPackageModal';

const mockPackages = [
  {
    id: '68b200e6c387b8e7fe8f2442', // Using the ID from the API
    name: 'Manali Adventure',
    budget: 12000,
    image: manaliImg,
    days: 5,
    nights: 4,
    city: 'Manali',
    state: 'Himachal Pradesh',
    themes: ['Adventure', 'Family'],
    date: '2024-07-01',
    citiesCovered: ['Manali', 'Kullu', 'Solang'],
    itinerary: [
      { day: 1, title: 'Arrival', desc: 'Arrive in Manali and check in.' },
      { day: 2, title: 'Sightseeing', desc: 'Visit local attractions.' },
      { day: 3, title: 'Adventure Day', desc: 'River rafting and paragliding.' },
      { day: 4, title: 'Leisure', desc: 'Explore markets and relax.' },
      { day: 5, title: 'Departure', desc: 'Check out and depart.' },
    ],
    hotels: 'Hotel Snow View',
    hotelCategory: '3-star',
    mealPlan: 'MAP',
    transport: ['Car'],
    pickup: 'Delhi Airport',
    drop: 'Chandigarh',
    inclusions: ['Hotel Stay', 'Meals', 'Sightseeing'],
    exclusions: ['Flights', 'Personal Expenses'],
    // Additional fields for edit form
    startDate: '2024-07-01',
    endDate: '2024-07-05',
    price: 12000,
    tripType: 'Adventure',
    departureLocation: 'Delhi Airport',
    travelMode: 'Private transport',
    maxGroupSize: 20,
    minimumAge: 18,
    languageSupport: ['English', 'Hindi'],
    availableDates: ['2024-07-01', '2024-08-01'],
    bookingDeadline: '2024-06-25',
    discounts: ['EARLYBIRD10', 'GROUP5']
  },
  {
    id: '68b200e6c387b8e7fe8f2443',
    name: 'Goa Beach Fun',
    budget: 15000,
    image: goaImg,
    days: 4,
    nights: 3,
    city: 'Goa',
    state: 'Goa',
    themes: ['Beach', 'Honeymoon'],
    date: '2024-08-10',
    citiesCovered: ['Goa', 'Calangute', 'Baga'],
    itinerary: [
      { day: 1, title: 'Arrival', desc: 'Arrive in Goa and check in.' },
      { day: 2, title: 'Beach Day', desc: 'Relax at Calangute and Baga beaches.' },
      { day: 3, title: 'Sightseeing', desc: 'Visit Fort Aguada and churches.' },
      { day: 4, title: 'Departure', desc: 'Check out and depart.' },
    ],
    hotels: 'Goa Beach Resort',
    hotelCategory: '4-star',
    mealPlan: 'CP',
    transport: ['Flight', 'Car'],
    pickup: 'Goa Airport',
    drop: 'Goa Airport',
    inclusions: ['Hotel Stay', 'Meals', 'Guide'],
    exclusions: ['Tips', 'Insurance'],
    // Additional fields for edit form
    startDate: '2024-08-10',
    endDate: '2024-08-13',
    price: 15000,
    tripType: 'Beach',
    departureLocation: 'Goa Airport',
    travelMode: 'Flight, Car',
    maxGroupSize: 15,
    minimumAge: 16,
    languageSupport: ['English', 'Portuguese'],
    availableDates: ['2024-08-10', '2024-09-10'],
    bookingDeadline: '2024-08-01',
    discounts: ['SUMMER20', 'WEEKEND15']
  },
  // ... existing packages with similar structure
  {
    id: '68b200e6c387b8e7fe8f2444',
    name: 'Kashmir Paradise',
    budget: 18000,
    image: kashmirImg,
    days: 6,
    nights: 5,
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    themes: ['Adventure', 'Culture'],
    date: '2024-09-15',
    citiesCovered: ['Srinagar', 'Pahalgam', 'Gulmarg'],
    itinerary: [
      { day: 1, title: 'Arrival', desc: 'Arrive in Srinagar and check in.' },
      { day: 2, title: 'Dal Lake Cruise', desc: 'Enjoy a boat ride on Dal Lake.' },
      { day: 3, title: 'Shikaras', desc: 'Explore the famous shikaras (houseboats) on Dal Lake.' },
      { day: 4, title: 'Pahalgam', desc: 'Visit Pahalgam, known for its beautiful landscapes.' },
      { day: 5, title: 'Gulmarg', desc: 'Visit Gulmarg, famous for skiing and golf course.' },
      { day: 6, title: 'Departure', desc: 'Check out and depart.' },
    ],
    hotels: 'Hotel Kashmir View',
    hotelCategory: '4-star',
    mealPlan: 'MAP',
    transport: ['Flight', 'Car'],
    pickup: 'Srinagar Airport',
    drop: 'Srinagar Airport',
    inclusions: ['Hotel Stay', 'Meals', 'Sightseeing'],
    exclusions: ['Flights', 'Personal Expenses'],
    // Additional fields for edit form
    startDate: '2024-09-15',
    endDate: '2024-09-20',
    price: 18000,
    tripType: 'Adventure',
    departureLocation: 'Srinagar Airport',
    travelMode: 'Flight, Car',
    maxGroupSize: 25,
    minimumAge: 18,
    languageSupport: ['English', 'Kashmiri'],
    availableDates: ['2024-09-15', '2024-10-15'],
    bookingDeadline: '2024-09-01',
    discounts: ['AUTUMN25', 'GROUP10']
  },
  {
    id: '68b200e6c387b8e7fe8f2445',
    name: 'Kerala Backwaters',
    budget: 16000,
    image: keralaImg,
    days: 4,
    nights: 3,
    city: 'Alappuzha',
    state: 'Kerala',
    themes: ['Backwaters', 'Nature'],
    date: '2024-10-01',
    citiesCovered: ['Alappuzha', 'Kumarakom', 'Kochi'],
    itinerary: [
      { day: 1, title: 'Arrival', desc: 'Arrive in Alappuzha and check in.' },
      { day: 2, title: 'Houseboat Cruise', desc: 'Enjoy a houseboat cruise on the backwaters.' },
      { day: 3, title: 'Kumarakom', desc: 'Visit Kumarakom Bird Sanctuary.' },
      { day: 4, title: 'Kochi', desc: 'Explore Kochi, the commercial capital of Kerala.' },
    ],
    hotels: 'Houseboat Stay',
    hotelCategory: 'N/A',
    mealPlan: 'MAP',
    transport: ['Flight', 'Car'],
    pickup: 'Kochi Airport',
    drop: 'Kochi Airport',
    inclusions: ['Hotel Stay', 'Meals', 'Sightseeing'],
    exclusions: ['Flights', 'Personal Expenses'],
    // Additional fields for edit form
    startDate: '2024-10-01',
    endDate: '2024-10-04',
    price: 16000,
    tripType: 'Nature',
    departureLocation: 'Kochi Airport',
    travelMode: 'Flight, Car',
    maxGroupSize: 12,
    minimumAge: 12,
    languageSupport: ['English', 'Malayalam'],
    availableDates: ['2024-10-01', '2024-11-01'],
    bookingDeadline: '2024-09-20',
    discounts: ['MONSOON30', 'FAMILY20']
  },
  {
    id: '68b200e6c387b8e7fe8f2446',
    name: 'Spiti Valley Adventure',
    budget: 20000,
    image: spitiImg,
    days: 7,
    nights: 6,
    city: 'Spiti Valley',
    state: 'Himachal Pradesh',
    themes: ['Adventure', 'Nature'],
    date: '2024-11-01',
    citiesCovered: ['Spiti Valley', 'Kaza', 'Tabo'],
    itinerary: [
      { day: 1, title: 'Arrival', desc: 'Arrive in Kaza and check in.' },
      { day: 2, title: 'Kaza to Key Monastery', desc: 'Drive to Key Monastery.' },
      { day: 3, title: 'Tabo', desc: 'Visit Tabo Monastery.' },
      { day: 4, title: 'Kaza to Dhankar', desc: 'Drive to Dhankar Monastery.' },
      { day: 5, title: 'Kaza to Kibber', desc: 'Drive to Kibber.' },
      { day: 6, title: 'Kaza to Kaza', desc: 'Return to Kaza.' },
      { day: 7, title: 'Departure', desc: 'Check out and depart.' },
    ],
    hotels: 'Hotel Spiti View',
    hotelCategory: '3-star',
    mealPlan: 'MAP',
    transport: ['Flight', 'Car'],
    pickup: 'Kaza Airport',
    drop: 'Kaza Airport',
    inclusions: ['Hotel Stay', 'Meals', 'Sightseeing'],
    exclusions: ['Flights', 'Personal Expenses'],
    // Additional fields for edit form
    startDate: '2024-11-01',
    endDate: '2024-11-07',
    price: 20000,
    tripType: 'Adventure',
    departureLocation: 'Kaza Airport',
    travelMode: 'Flight, Car',
    maxGroupSize: 18,
    minimumAge: 21,
    languageSupport: ['English', 'Hindi'],
    availableDates: ['2024-11-01', '2024-12-01'],
    bookingDeadline: '2024-10-15',
    discounts: ['WINTER35', 'ADVENTURE15']
  },
  {
    id: '68b200e6c387b8e7fe8f2447',
    name: 'Himalayan Escape',
    budget: 22000,
    image: himaImg,
    days: 8,
    nights: 7,
    city: 'Ladakh',
    state: 'Jammu & Kashmir',
    themes: ['Adventure', 'Culture'],
    date: '2024-12-01',
    citiesCovered: ['Ladakh', 'Pangong Tso', 'Tso Moriri'],
    itinerary: [
      { day: 1, title: 'Arrival', desc: 'Arrive in Leh and check in.' },
      { day: 2, title: 'Leh to Nubra Valley', desc: 'Drive to Nubra Valley.' },
      { day: 3, title: 'Pangong Tso', desc: 'Visit Pangong Tso.' },
      { day: 4, title: 'Tso Moriri', desc: 'Visit Tso Moriri.' },
      { day: 5, title: 'Leh to Khardung La', desc: 'Drive to Khardung La.' },
      { day: 6, title: 'Leh to Pangong Tso', desc: 'Return to Pangong Tso.' },
      { day: 7, title: 'Leh to Tso Moriri', desc: 'Return to Tso Moriri.' },
      { day: 8, title: 'Departure', desc: 'Check out and depart.' },
    ],
    hotels: 'Hotel Ladakh View',
    hotelCategory: '4-star',
    mealPlan: 'MAP',
    transport: ['Flight', 'Car'],
    pickup: 'Leh Airport',
    drop: 'Leh Airport',
    inclusions: ['Hotel Stay', 'Meals', 'Sightseeing'],
    exclusions: ['Flights', 'Personal Expenses'],
    // Additional fields for edit form
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    price: 22000,
    tripType: 'Adventure',
    departureLocation: 'Leh Airport',
    travelMode: 'Flight, Car',
    maxGroupSize: 22,
    minimumAge: 18,
    languageSupport: ['English', 'Ladakhi'],
    availableDates: ['2024-12-01', '2025-01-01'],
    bookingDeadline: '2024-11-20',
    discounts: ['SNOW40', 'GROUP20']
  },
];

function AgencyPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPackages(mockPackages);
      setLoading(false);
    }, 800);
  }, []);

  const closeModal = () => setSelected(null);

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingPackage(null);
  };

  const handlePackageUpdate = (updatedPackage) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => 
        pkg.id === updatedPackage.id ? { ...pkg, ...updatedPackage } : pkg
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
      <div className={selected ? "w-full flex flex-col items-center opacity-40 pointer-events-none" : "w-full flex flex-col items-center"}>
      <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 sm:px-8 py-4 mb-8">
        <span className="text-2xl sm:text-2xl font-extrabold tracking-tight text-purple-700">trippnova</span>
        <span className="text-gray-500 font-medium text-sm">Your Tour Packages</span>
      </header>
      <main className="w-full max-w-5xl px-2 sm:px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Created Packages</h2>
        {loading ? (
          <div className="text-center text-gray-500 py-12 text-lg">Loading packages...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
                <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-lg text-gray-900 mb-1">{pkg.name}</div>
                    <div className="text-gray-500 text-sm mb-2">Budget: <span className="font-semibold text-green-700">₹{pkg.budget}</span></div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm" 
                      onClick={() => setSelected(pkg)}
                    >
                      View Details
                    </button>
                    <button 
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition text-sm" 
                      onClick={() => handleEditPackage(pkg)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      </div>
      
      {/* View Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-70 modal-backdrop">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative modal-content flex flex-col md:flex-row gap-6">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold" onClick={closeModal}>&times;</button>
            <img src={selected.image} alt={selected.name} className="w-full md:w-72 h-56 object-cover rounded-xl mb-4 md:mb-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="font-bold text-2xl text-gray-900 mb-1">{selected.name}</div>
              <div className="text-gray-600 text-lg mb-1">Budget: <span className="font-semibold text-green-700">₹{selected.budget}</span></div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                <span><b>Days:</b> {selected.days}</span>
                <span><b>Nights:</b> {selected.nights}</span>
                <span><b>Date:</b> {selected.date}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                <span><b>City:</b> {selected.city}</span>
                <span><b>State:</b> {selected.state}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                <span><b>Themes:</b> {selected.themes && selected.themes.join(', ')}</span>
                <span><b>Cities Covered:</b> {selected.citiesCovered && selected.citiesCovered.join(', ')}</span>
              </div>
              <div className="text-sm text-gray-700 mb-2"><b>Hotel:</b> {selected.hotels} ({selected.hotelCategory})</div>
              <div className="text-sm text-gray-700 mb-2"><b>Meal Plan:</b> {selected.mealPlan}</div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                <span><b>Transport:</b> {selected.transport && selected.transport.join(', ')}</span>
                <span><b>Pickup:</b> {selected.pickup}</span>
                <span><b>Drop:</b> {selected.drop}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                <span><b>Inclusions:</b> {selected.inclusions && selected.inclusions.join(', ')}</span>
                <span><b>Exclusions:</b> {selected.exclusions && selected.exclusions.join(', ')}</span>
              </div>
              <div className="mb-2">
                <b>Itinerary:</b>
                <ol className="list-decimal list-inside ml-4 mt-1">
                  {selected.itinerary && selected.itinerary.map((item, idx) => (
                    <li key={idx} className="mb-1"><b>Day {item.day}:</b> <span className="font-semibold">{item.title}</span> - {item.desc}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      <EditPackageModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        packageData={editingPackage}
        onUpdate={handlePackageUpdate}
      />
      
      <Footer />
    </div>
  );
}

export default AgencyPackages;
