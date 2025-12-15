import { useState } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // User confirmation template (fallback to admin template if not set)
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Google Sheets Configuration
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

const LOCATIONS = [
  // Tamil Nadu
  "Chennai, Tamil Nadu", "Coimbatore, Tamil Nadu", "Madurai, Tamil Nadu", "Tiruchirappalli, Tamil Nadu", 
  "Salem, Tamil Nadu", "Tirunelveli, Tamil Nadu", "Erode, Tamil Nadu", "Vellore, Tamil Nadu", 
  "Thanjavur, Tamil Nadu", "Dindigul, Tamil Nadu", "Tiruppur, Tamil Nadu", "Karur, Tamil Nadu",
  "Thoothukudi, Tamil Nadu", "Nagercoil, Tamil Nadu", "Kancheepuram, Tamil Nadu", "Kumbakonam, Tamil Nadu",
  "Cuddalore, Tamil Nadu", "Tiruvallur, Tamil Nadu", "Ambur, Tamil Nadu", "Pollachi, Tamil Nadu",
  "Rajapalayam, Tamil Nadu", "Neyveli, Tamil Nadu", "Nagapattinam, Tamil Nadu", "Karaikudi, Tamil Nadu",
  "Hosur, Tamil Nadu", "Pudukkottai, Tamil Nadu", "Sivakasi, Tamil Nadu", "Tiruvannamalai, Tamil Nadu", 
  "Krishnagiri, Tamil Nadu", "Dharmapuri, Tamil Nadu", "Namakkal, Tamil Nadu",
  "Ranipet, Tamil Nadu", "Arakkonam, Tamil Nadu", "Tambaram, Tamil Nadu", "Avadi, Tamil Nadu",
  "Pallavaram, Tamil Nadu", "Tirupathur, Tamil Nadu", "Ooty, Tamil Nadu", "Udhagamandalam, Tamil Nadu",
  "Coonoor, Tamil Nadu", "Kodaikanal, Tamil Nadu", "Ramanathapuram, Tamil Nadu", "Virudhunagar, Tamil Nadu",
  "Theni, Tamil Nadu", "Mayiladuthurai, Tamil Nadu", "Ariyalur, Tamil Nadu", "Perambalur, Tamil Nadu",
  "Mettupalayam, Tamil Nadu", "Gobichettipalayam, Tamil Nadu", "Chengalpattu, Tamil Nadu",
  "Srivilliputhur, Tamil Nadu", "Villupuram, Tamil Nadu", "Tindivanam, Tamil Nadu", "Vandavasi, Tamil Nadu",
  // Karnataka
  "Bangalore, Karnataka", "Mysore, Karnataka", "Mangalore, Karnataka", "Hubli, Karnataka", 
  "Belgaum, Karnataka", "Tumkur, Karnataka", "Davangere, Karnataka",
  // Maharashtra
  "Mumbai, Maharashtra", "Pune, Maharashtra", "Nagpur, Maharashtra", "Nashik, Maharashtra", 
  "Aurangabad, Maharashtra", "Thane, Maharashtra", "Kolhapur, Maharashtra",
  // Kerala
  "Thiruvananthapuram, Kerala", "Kochi, Kerala", "Kozhikode, Kerala", "Thrissur, Kerala", 
  "Kollam, Kerala", "Kannur, Kerala", "Palakkad, Kerala",
  // Telangana
  "Hyderabad, Telangana", "Warangal, Telangana", "Nizamabad, Telangana", "Karimnagar, Telangana",
  // Andhra Pradesh
  "Visakhapatnam, Andhra Pradesh", "Vijayawada, Andhra Pradesh", "Guntur, Andhra Pradesh", 
  "Tirupati, Andhra Pradesh", "Nellore, Andhra Pradesh",
  // West Bengal
  "Kolkata, West Bengal", "Howrah, West Bengal", "Durgapur, West Bengal", "Siliguri, West Bengal",
  // Gujarat
  "Ahmedabad, Gujarat", "Surat, Gujarat", "Vadodara, Gujarat", "Rajkot, Gujarat", 
  "Gandhinagar, Gujarat", "Bhavnagar, Gujarat",
  // Rajasthan
  "Jaipur, Rajasthan", "Jodhpur, Rajasthan", "Udaipur, Rajasthan", "Kota, Rajasthan", 
  "Ajmer, Rajasthan", "Bikaner, Rajasthan",
  // Delhi
  "New Delhi, Delhi", "Delhi, Delhi",
  // Punjab
  "Ludhiana, Punjab", "Amritsar, Punjab", "Jalandhar, Punjab", "Patiala, Punjab", "Chandigarh, Punjab",
  // Haryana
  "Gurgaon, Haryana", "Faridabad, Haryana", "Panipat, Haryana", "Ambala, Haryana",
  // Uttar Pradesh
  "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh", "Agra, Uttar Pradesh", "Varanasi, Uttar Pradesh", 
  "Noida, Uttar Pradesh", "Ghaziabad, Uttar Pradesh", "Allahabad, Uttar Pradesh",
  // Madhya Pradesh
  "Bhopal, Madhya Pradesh", "Indore, Madhya Pradesh", "Jabalpur, Madhya Pradesh", "Gwalior, Madhya Pradesh",
  // Bihar
  "Patna, Bihar", "Gaya, Bihar", "Bhagalpur, Bihar", "Muzaffarpur, Bihar",
  // Odisha
  "Bhubaneswar, Odisha", "Cuttack, Odisha", "Rourkela, Odisha", "Puri, Odisha",
  // Jharkhand
  "Ranchi, Jharkhand", "Jamshedpur, Jharkhand", "Dhanbad, Jharkhand", "Bokaro, Jharkhand",
  // Assam
  "Guwahati, Assam", "Dibrugarh, Assam", "Silchar, Assam", "Jorhat, Assam",
  // Chhattisgarh
  "Raipur, Chhattisgarh", "Bhilai, Chhattisgarh", "Bilaspur, Chhattisgarh", "Korba, Chhattisgarh",
  // Uttarakhand
  "Dehradun, Uttarakhand", "Haridwar, Uttarakhand", "Roorkee, Uttarakhand", "Nainital, Uttarakhand",
  // Goa
  "Panaji, Goa", "Margao, Goa", "Vasco da Gama, Goa",
  // Other states
  "Srinagar, Jammu and Kashmir", "Jammu, Jammu and Kashmir",
  "Shimla, Himachal Pradesh", "Dharamshala, Himachal Pradesh",
  "Agartala, Tripura", "Shillong, Meghalaya", "Imphal, Manipur", 
  "Kohima, Nagaland", "Aizawl, Mizoram", "Gangtok, Sikkim",
  "Itanagar, Arunachal Pradesh", "Puducherry, Puducherry"
];

const DESIGNATIONS = [
  "Owner/Director/Trustee","Principal/HOD/Administrator","Staff/Teacher"];

export default function DemoForm({ className = "", onSubmit, hideHeader = false }) {
  const [locationInput, setLocationInput] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [mobileInput, setMobileInput] = useState('');
  const [mobileError, setMobileError] = useState('');

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    
    if (value.trim()) {
      const filtered = LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  const selectLocation = (location) => {
    setLocationInput(location);
    setShowLocationSuggestions(false);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    
    // Remove any non-numeric characters except + and space
    let cleanedValue = value.replace(/[^\d+\s]/g, '');
    
    // Extract digits only for processing
    const digitsOnly = cleanedValue.replace(/\D/g, '');
    
    // Format: +91 followed by space and 10 digits
    let formattedValue = '+91 ';
    
    // Add digits after +91 (limit to 10)
    if (digitsOnly.startsWith('91')) {
      formattedValue += digitsOnly.slice(2, 12); // Skip the 91 prefix, take next 10 digits
    } else if (digitsOnly.startsWith('1')) {
      formattedValue += digitsOnly.slice(1, 11); // Skip the 1, take next 10 digits
    } else {
      formattedValue += digitsOnly.slice(0, 10); // Take first 10 digits
    }
    
    // Limit to +91 + space + 10 digits = 14 characters
    if (formattedValue.length > 14) {
      formattedValue = formattedValue.slice(0, 14);
    }
    
    setMobileInput(formattedValue);
    
    // Validate: must be exactly +91 + space + 10 digits
    const digitsAfterSpace = formattedValue.slice(4); // Get digits after "+91 "
    if (formattedValue.length < 14) {
      setMobileError('');
    } else if (digitsAfterSpace.length !== 10) {
      setMobileError('Mobile number must be exactly 10 digits');
    } else if (!/^\d{10}$/.test(digitsAfterSpace)) {
      setMobileError('Mobile number must contain only digits');
    } else {
      setMobileError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Validate mobile number before submission
    const mobileDigits = mobileInput.slice(4); // Get digits after "+91 "
    if (mobileInput.length !== 14 || !/^\+91 \d{10}$/.test(mobileInput)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      setIsSubmitting(false);
      return;
    }

    // Get form data
    const formData = {
      name: e.target.name.value,
      institution: e.target.institution.value,
      email: e.target.email.value,
      mobile: mobileInput, // Use the state value instead of form value
      designation: e.target.designation.value,
      location: locationInput
    };

    // EmailJS specific format
    const emailData = {
      from_name: formData.name,
      institution_name: formData.institution,
      email: formData.email,
      mobile: formData.mobile,
      designation: formData.designation,
      location: formData.location,
      to_email: 'your-email@example.com' // You can change this to your receiving email
    };

    try {
      // Parallel execution: Send to both EmailJS and Google Sheets
      const promises = [];

      // 1. Send email to admin using EmailJS
      const adminEmailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailData,
        EMAILJS_PUBLIC_KEY
      ).then(() => {
        console.log('✅ Admin email sent successfully');
        return { service: 'admin_email', success: true };
      }).catch((error) => {
        console.error('❌ Admin email send failed:', error);
        return { service: 'admin_email', success: false, error };
      });
      
      promises.push(adminEmailPromise);

      // 2. Send confirmation email to user
      const userEmailData = {
        to_name: formData.name,
        to_email: formData.email,
        user_name: formData.name,
        institution_name: formData.institution,
        email: formData.email,
        mobile: formData.mobile,
        designation: formData.designation,
        location: formData.location
      };

      const userEmailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        userEmailData,
        EMAILJS_PUBLIC_KEY
      ).then(() => {
        console.log('✅ User confirmation email sent successfully');
        return { service: 'user_email', success: true };
      }).catch((error) => {
        console.error('❌ User email send failed:', error);
        return { service: 'user_email', success: false, error };
      });
      
      promises.push(userEmailPromise);

      // 3. Send to Google Sheets (if URL is configured)
      if (GOOGLE_SHEETS_URL) {
        const sheetsPromise = fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors', // Important for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }).then(() => {
          console.log('✅ Data saved to Google Sheets');
          return { service: 'sheets', success: true };
        }).catch((error) => {
          console.error('❌ Google Sheets save failed:', error);
          return { service: 'sheets', success: false, error };
        });
        
        promises.push(sheetsPromise);
      }

      // Wait for all promises to complete
      const results = await Promise.all(promises);
      
      // Check results
      const adminEmailSuccess = results.find(r => r.service === 'admin_email')?.success;
      const userEmailSuccess = results.find(r => r.service === 'user_email')?.success;
      const sheetsSuccess = results.find(r => r.service === 'sheets')?.success;
      
      // Determine success message
      let successMessage = 'Thank you! Your demo request has been submitted successfully. A confirmation email has been sent to your email address. We will contact you soon.';
      
      if (adminEmailSuccess && userEmailSuccess && sheetsSuccess) {
        successMessage = '✅ Success! Your request has been sent and a confirmation email has been delivered to your inbox.';
      } else if (adminEmailSuccess && userEmailSuccess && !GOOGLE_SHEETS_URL) {
        successMessage = '✅ Success! Your request has been sent and a confirmation email has been delivered to your inbox.';
      } else if (adminEmailSuccess && userEmailSuccess && !sheetsSuccess) {
        successMessage = '✅ Your request has been sent and a confirmation email has been delivered. (Note: Record saving had an issue, but your request was received.)';
      } else if (adminEmailSuccess && !userEmailSuccess) {
        successMessage = '✅ Your request has been submitted successfully. (Note: Confirmation email could not be sent, but your request was received.)';
      } else if (adminEmailSuccess) {
        successMessage = '✅ Success! Your request has been sent via email.';
      }
      
      // Show success if at least admin email worked
      if (adminEmailSuccess) {
        setSubmitStatus({
          type: 'success',
          message: successMessage
        });
        
        // Reset form
        e.target.reset();
        setLocationInput('');
        setMobileInput('');
        setMobileError('');
        
        // Call custom onSubmit if provided
        if (onSubmit) {
          onSubmit(e);
        }
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit the form. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`backdrop-blur-[10px] backdrop-filter bg-white ${hideHeader ? '' : 'border-4 border-[rgba(29,152,131,0.17)] border-solid rounded-[12px] shadow-[0px_8px_8px_0px_rgba(0,0,0,0.05),0px_4px_4px_0px_rgba(0,0,0,0.05),0px_1px_0px_0px_rgba(0,0,0,0.03)]'} ${hideHeader ? 'p-0' : 'p-[20px] md:p-[28px]'} ${className} ${hideHeader ? '' : 'max-h-[600px] lg:max-h-[650px] flex flex-col'}`}>
      {!hideHeader && (
      <div className="mb-[24px] md:mb-[36px] flex-shrink-0">
        <h2 className="text-[#0f1729] text-[20px] md:text-[25.276px] font-bold leading-[normal] tracking-[-0.6319px] mb-[16px] md:mb-[22px]">
          Book a Free Demo
        </h2>
        <p className="text-[#515151] text-[16px] md:text-[20px] font-normal leading-[24px] md:leading-[30px] tracking-[-0.4492px]">
          Transform Your Accreditation Journey
        </p>
      </div>
      )}
      
      <form className="flex flex-col flex-1 min-h-0" onSubmit={handleSubmit}>
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar-minimal pr-1 pl-1 mb-4 min-h-0">
          {/* Success/Error Message */}
          {submitStatus.message && (
            <div className={`p-4 rounded-lg mb-4 ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <p className="text-[14px] md:text-[16px]">{submitStatus.message}</p>
            </div>
          )}

          {/* All form fields in single container with consistent spacing */}
          <div className="space-y-[16px] md:space-y-[20px]">
            <div className="space-y-[8px]">
              <label className="text-[14px] md:text-[16px] font-medium text-neutral-950 leading-[20px] md:leading-[24px] tracking-[-0.3125px]">
                Name <span className="text-[#e7000b]">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your full name"
                className="w-full h-[40px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] focus:ring-offset-0 transition-all text-[14px] md:text-[16px]" 
                required 
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-[8px]">
              <label className="text-[14px] md:text-[16px] font-medium text-neutral-950 leading-[20px] md:leading-[24px] tracking-[-0.3125px]">
                Institution Name <span className="text-[#e7000b]">*</span>
              </label>
              <input 
                type="text" 
                name="institution"
                placeholder="Enter your Institution name"
                className="w-full h-[40px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] focus:ring-offset-0 transition-all text-[14px] md:text-[16px]" 
                required 
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-[8px]">
              <label className="text-[14px] md:text-[16px] font-medium text-neutral-950 leading-[20px] md:leading-[24px] tracking-[-0.3125px]">
                Official Email Address <span className="text-[#e7000b]">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                placeholder="name@institution.edu"
                className="w-full h-[40px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] focus:ring-offset-0 transition-all text-[14px] md:text-[16px]" 
                required 
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-[8px]">
              <label className="text-[14px] md:text-[16px] font-medium text-neutral-950 leading-[20px] md:leading-[24px] tracking-[-0.3125px]">
                Mobile Number <span className="text-[#e7000b]">*</span>
              </label>
              <input 
                type="tel" 
                name="mobile"
                placeholder="+91 XXXXXXXXXX"
                value={mobileInput}
                onChange={handleMobileChange}
                className={`w-full h-[40px] md:h-[42px] border rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] focus:ring-offset-0 transition-all text-[14px] md:text-[16px] ${
                  mobileError 
                    ? 'border-[#e7000b] focus:ring-[#e7000b]' 
                    : 'border-[#d1d5dc]'
                }`}
                required 
                disabled={isSubmitting}
                maxLength={14}
              />
              {mobileError && (
                <p className="text-[12px] md:text-[14px] text-[#e7000b] mt-1">
                  {mobileError}
                </p>
              )}
              {!mobileError && mobileInput && mobileInput.length === 14 && (
                <p className="text-[12px] md:text-[14px] text-[#1d9883] mt-1">
                  ✓ Valid mobile number
                </p>
              )}
            </div>
            
            <div className="space-y-[8px]">
              <label className="text-[14px] md:text-[16px] font-medium text-neutral-950 leading-[20px] md:leading-[24px] tracking-[-0.3125px]">
                Designation / Role <span className="text-[#e7000b]">*</span>
              </label>
              <select 
                name="designation"
                className="w-full h-[40px] md:h-[42px] border border-[#d1d5dc] rounded pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1d9883] focus:ring-offset-0 transition-all bg-white text-[14px] md:text-[16px]" 
                required
                defaultValue=""
                disabled={isSubmitting}
              >
                <option value="" disabled hidden>Select Designation</option>
                {DESIGNATIONS.map((designation, index) => (
                  <option key={index} value={designation}>{designation}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-[8px] relative">
              <label className="text-[14px] md:text-[16px] font-medium text-neutral-950 leading-[20px] md:leading-[24px] tracking-[-0.3125px]">
                Location <span className="text-[#e7000b]">*</span>
              </label>
              <input 
                type="text" 
                name="location"
                placeholder="City, State"
                value={locationInput}
                onChange={handleLocationChange}
                onFocus={() => locationInput.trim() && filteredLocations.length > 0 && setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                className="w-full h-[40px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] focus:ring-offset-0 transition-all text-[14px] md:text-[16px]" 
                required 
                autoComplete="off"
                disabled={isSubmitting}
              />
              {showLocationSuggestions && (
                <div className="absolute z-10 w-full bg-white border border-[#d1d5dc] rounded-md shadow-lg max-h-[200px] overflow-y-auto mt-1">
                  {filteredLocations.map((location, index) => (
                    <div
                      key={index}
                      onClick={() => selectLocation(location)}
                      className="px-3 py-2 hover:bg-[#f0f9f8] cursor-pointer text-[14px] md:text-[16px] text-[#0f1729]"
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Fixed submit button at bottom */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#1d9883] h-[48px] md:h-[52px] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] text-white text-[14px] md:text-[16px] font-bold leading-[20px] md:leading-[24px] hover:bg-[#098a74] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

