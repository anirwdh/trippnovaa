import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-8 sm:py-12 md:py-16 mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-white/20 p-3 sm:p-4 rounded-full">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Security Policy</h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto px-2">
            Your safety and data protection are our top priorities. Learn about our comprehensive security measures.
          </p>
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="bg-white/20 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm">
              Last updated: December 2024
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Our Security Commitment</h3>
                  <p className="text-green-800">
                    At Trippnova, the safety and privacy of your personal and financial information is our top priority. We are committed to maintaining the highest standards of security to ensure that your data is always protected when you interact with our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {/* Section 1 */}
              <section className="border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">1. Data Encryption</h2>
                </div>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3 sm:mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">256-bit SSL Encryption</h3>
                      <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
                        All data transmitted between your browser and our servers is protected using 256-bit SSL (Secure Socket Layer) encryption. This means your information — including login credentials and payment details — is encrypted and cannot be accessed by unauthorized parties.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">2. Secure Payment Gateways</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      PCI-DSS Compliant
                    </h3>
                    <p className="text-green-800">
                      Trippnova does not store your credit/debit card or banking details. All payments are processed through PCI-DSS compliant and industry-standard third-party payment gateways.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Complete Encryption
                    </h3>
                    <p className="text-blue-800">
                      These gateways ensure complete encryption and tokenization of sensitive data, providing an additional layer of security for your financial information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 9a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">3. Account Security</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Secure Password Hashing',
                      description: 'User passwords are securely hashed and never stored in plain text.',
                      icon: '🔐',
                      color: 'purple'
                    },
                    {
                      title: 'Strong Password Policy',
                      description: 'We recommend creating strong, unique passwords and avoiding password sharing.',
                      icon: '🛡️',
                      color: 'blue'
                    },
                    {
                      title: 'Suspicious Activity Reporting',
                      description: 'Any suspicious activity should be reported immediately.',
                      icon: '🚨',
                      color: 'red'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 p-6 rounded-lg border border-${item.color}-200`}>
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-red-800">
                        Any suspicious activity on your account should be reported to us immediately at{' '}
                        <a href="mailto:support@trippnova.com" className="text-red-600 hover:text-red-800 underline font-medium">
                          support@trippnova.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">4. Regular Security Audits</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Vulnerability Assessments',
                      description: 'Regular scanning and testing for security weaknesses',
                      icon: '🔍',
                      color: 'indigo'
                    },
                    {
                      title: 'Server Monitoring',
                      description: '24/7 monitoring of server infrastructure',
                      icon: '📊',
                      color: 'blue'
                    },
                    {
                      title: 'System Upgrades',
                      description: 'Regular updates to maintain security standards',
                      icon: '⚙️',
                      color: 'green'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 p-6 rounded-lg border border-${item.color}-200`}>
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-800">
                    to detect and eliminate potential threats. Our infrastructure is hosted on reliable and secure cloud environments.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">5. User Data Protection</h2>
                </div>
                <div className="space-y-4">
                  {[
                    'We collect only the minimum personal information required to fulfill your bookings.',
                    'Your data is never sold, rented, or shared with unauthorised third parties.',
                    'Our team is trained in data handling best practices and confidentiality protocols.'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 6 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">6. Fraud Prevention</h2>
                </div>
                <div className="bg-red-50 p-6 rounded-lg mb-6">
                  <p className="text-red-800 mb-4 font-medium">
                    We use automated and manual monitoring systems to detect and prevent:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { text: 'Fake bookings', icon: '🚫' },
                      { text: 'Unauthorized access attempts', icon: '🔒' },
                      { text: 'Payment fraud', icon: '💳' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <span className="text-red-800">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                  <p className="text-orange-800">
                    Any accounts involved in malicious activities will be suspended and may be reported to legal authorities.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">7. Incident Response</h2>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <p className="text-blue-800 mb-4 font-medium">
                    In the unlikely event of a data breach or cyber-attack:
                  </p>
                  <div className="space-y-3">
                    {[
                      'We will notify affected users promptly',
                      'Investigate the root cause',
                      'Take corrective action immediately'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-800">
                    We also comply with Indian IT laws and global standards for data breach handling.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">8. Your Responsibility</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Keep Credentials Safe',
                      description: 'Keep their login credentials confidential',
                      icon: '🔑',
                      color: 'green'
                    },
                    {
                      title: 'Log Out Properly',
                      description: 'Log out from shared devices',
                      icon: '🚪',
                      color: 'blue'
                    },
                    {
                      title: 'Avoid Suspicious Links',
                      description: 'Avoid clicking on suspicious links claiming to be from Trippnova',
                      icon: '⚠️',
                      color: 'yellow'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`bg-${item.color}-50 p-6 rounded-lg border border-${item.color}-200`}>
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-center mb-6">
                    <div className="bg-white/20 p-4 rounded-full">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Need Help or Noticed Something Suspicious?</h2>
                  <p className="text-xl text-green-100 mb-6">
                    If you believe your data may have been compromised or you notice anything unusual on your account, please contact our security team immediately.
                  </p>
                  <a 
                    href="mailto:support@trippnova.com" 
                    className="inline-flex items-center bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Security Team
                  </a>
                </div>
              </section>

              {/* Trust Section */}
              <section className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-center mb-6">
                    <div className="bg-emerald-100 p-4 rounded-full">
                      <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-emerald-900">We're Committed to Trust</h2>
                  <p className="text-xl text-emerald-800">
                    At Trippnova, building a safe travel experience begins with trust. Our systems are designed to safeguard your data so you can focus on discovering the world, worry-free.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Security;
