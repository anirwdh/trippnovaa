import React, { useState } from 'react';

const steps = [
  {
    title: 'Sign-Up / Account Creation',
   
  },
  {
    title: 'Upload Business Documents',
   
  },
  {
    title: 'Add Services You Offer',
   
  },
 
 
  
];

function AgencyRegistration() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});

  // Header as in the image
  const header = (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 sm:px-8 py-4">
      <span className="text-2xl sm:text-2xl font-extrabold tracking-tight text-purple-700">trippnova</span>
      <a href="#" className="text-blue-600 font-semibold text-xs sm:text-base hover:underline">Need help? Call +919027224030</a>
    </header>
  );

  // Step content renderers
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-base">Agency Name</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Agency name*" />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-base">Owner Name</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Owner name*" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1 text-base">Phone</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Phone number*" />
              </div>
              <div className="flex-1">
                <label className="block font-medium text-gray-700 mb-1 text-base">Email</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Email address*" />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-base">Office Address</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Office address*" />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-base">Agency Type</label>
              <select className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>B2B</option>
                <option>B2C</option>
                <option>Domestic</option>
                <option>International</option>
              </select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="font-semibold mb-2 text-gray-900 text-lg">Upload the following documents:</div>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-base">GST Certificate</label>
                <input type="file" className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-base">Company PAN Card</label>
                <input type="file" className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-base">Agency Registration Certificate (if available)</label>
                <input type="file" className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-base">Bank Account Details (for payouts)</label>
                <input type="file" className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-base">Government-approved License (if applicable)</label>
                <input type="file" className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1 text-base">Authorized Signatory ID proof (Aadhaar/PAN)</label>
                <input type="file" className="block w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="font-semibold mb-2 text-gray-900 text-lg">Select the services your agency provides:</div>
            <div className="space-y-4">
              <div>
                <label className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                  <input type="checkbox" className="form-checkbox" />
                  Tour packages (Domestic, International)
                </label>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                  <input type="checkbox" className="form-checkbox" />
                  Hotel bookings
                </label>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                  <input type="checkbox" className="form-checkbox" />
                  Car rentals
                </label>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                  <input type="checkbox" className="form-checkbox" />
                  Flight bookings
                </label>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                  <input type="checkbox" className="form-checkbox" />
                  Event bookings / activities
                </label>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 font-medium text-gray-700 text-base">
                  <input type="checkbox" className="form-checkbox" />
                  Visa/Insurance Assistance
                </label>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1 mt-4 text-base">Other services (optional)</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-normal text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Describe other services you offer" />
              </div>
            </div>
          </div>
        );
      default:
        return <div>Step coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans">
      {header}
      <div className="w-full h-4" />
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-transparent gap-4 md:gap-8 px-2 sm:px-4">
        {/* Left Stepper */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-full md:max-w-xs mb-4 md:mb-0">
          <div className="font-bold text-lg mb-6 text-gray-900">Complete your registration</div>
          <ol className="space-y-0.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3 py-3 px-2 rounded-lg transition-all"
                style={{ background: i === step ? '#f5f7fa' : 'transparent', fontWeight: i === step ? 'bold' : 'normal', color: i === step ? '#3b3b3b' : '#888' }}>
                <span className="mt-1">
                  {i === 0 && <span role="img" aria-label="signup">🧑‍💼</span>}
                  {i === 1 && <span role="img" aria-label="docs">📄</span>}
                  {i === 2 && <span role="img" aria-label="services">🛎️</span>}
                  {i === 3 && <span role="img" aria-label="pricing">💰</span>}
                  {i === 4 && <span role="img" aria-label="media">🖼️</span>}
                  {i === 5 && <span role="img" aria-label="verify">✅</span>}
                </span>
                <div>
                  <div className="text-base leading-tight font-semibold text-gray-900">{s.title}</div>
                  <div className="text-xs text-gray-500 leading-tight font-normal">{s.description}</div>
                  {i === step && <div className="text-xs text-blue-600 font-semibold mt-1">Continue &rarr;</div>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        {/* Right Form Card */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-4 sm:p-8 w-full max-w-full">
          <div className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">{steps[step].title}</div>
          {renderStepContent()}
          <div className="flex flex-col sm:flex-row justify-end mt-8 gap-4 w-full">
            {step > 0 && (
              <button
                className="border border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-xl shadow-sm hover:bg-blue-50 transition text-base"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            {step < 2 && (
              <button
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition text-base"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <button
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition text-base"
                onClick={() => alert('Registration submitted!')}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyRegistration;
