import { useState } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Get form data
    const formData = {
      name: e.target.name.value,
      institution: e.target.institution.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
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

      // 1. Send email using EmailJS
      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailData,
        EMAILJS_PUBLIC_KEY
      ).then(() => {
        console.log('✅ Email sent successfully');
        return { service: 'email', success: true };
      }).catch((error) => {
        console.error('❌ Email send failed:', error);
        return { service: 'email', success: false, error };
      });
      
      promises.push(emailPromise);

      // 2. Send to Google Sheets (if URL is configured)
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
      const emailSuccess = results.find(r => r.service === 'email')?.success;
      const sheetsSuccess = results.find(r => r.service === 'sheets')?.success;
      
      // Determine success message
      let successMessage = 'Thank you! Your demo request has been submitted successfully. We will contact you soon.';
      
      if (emailSuccess && sheetsSuccess) {
        successMessage = '✅ Success! Your request has been sent via email and saved to our records.';
      } else if (emailSuccess && !GOOGLE_SHEETS_URL) {
        successMessage = '✅ Success! Your request has been sent via email.';
      } else if (emailSuccess && !sheetsSuccess) {
        successMessage = '✅ Your request has been sent via email. (Note: Record saving had an issue, but your request was received.)';
      }
      
      // Show success if at least email worked
      if (emailSuccess) {
        setSubmitStatus({
          type: 'success',
          message: successMessage
        });
        
        // Reset form
        e.target.reset();
        setLocationInput('');
        
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
    <div className={`backdrop-blur-[10px] backdrop-filter bg-white ${hideHeader ? '' : 'border- border-[rgba(29,152,131,0.17)] border-solid rounded-[12px] shadow-[0px_8px_8px_0px_rgba(0,0,0,0.05),0px_4px_4px_0px_rgba(0,0,0,0.05),0px_1px_0px_0px_rgba(0,0,0,0.03)]'} ${hideHeader ? 'p-0' : 'p-[16px] md:p-[28px]'} ${className} ${hideHeader ? '' : 'max-h-[500px] md:max-h-[600px] lg:max-h-[700px] overflow-y-auto custom-scrollbar-minimal'}`}>
      {!hideHeader && (
      <div className="mb-[16px] md:mb-[36px]">
        <h2 className="text-[#0f1729] text-[18px] md:text-[25.276px] font-bold leading-[normal] tracking-[-0.6319px] mb-[8px] md:mb-[22px]">
          Book a Free Demo
        </h2>
        <p className="text-[#515151] text-[13px] md:text-[20px] font-normal leading-[18px] md:leading-[30px] tracking-[-0.4492px]">
          Transform Your Accreditation Journey
        </p>
      </div>
      )}
      
      <form className="space-y-[12px] md:space-y-[20px] pb-4" onSubmit={handleSubmit}>
        {/* Success/Error Message */}
            {submitStatus.message && (
          <div className={`p-3 md:p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <p className="text-[12px] md:text-[16px]">{submitStatus.message}</p>
          </div>
        )}

        <div className="space-y-[14px] md:space-y-[24px]">
          <div className="space-y-[6px] md:space-y-[8px]">
            <label className="text-[12px] md:text-[16px] font-medium text-neutral-950 leading-[16px] md:leading-[24px] tracking-[-0.3125px]">
              Name <span className="text-[#e7000b]">*</span>
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="Enter your full name"
              className="w-full h-[36px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] transition-all text-[13px] md:text-[16px]" 
              required 
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-[6px] md:space-y-[8px]">
            <label className="text-[12px] md:text-[16px] font-medium text-neutral-950 leading-[16px] md:leading-[24px] tracking-[-0.3125px]">
              Institution Name <span className="text-[#e7000b]">*</span>
            </label>
            <input 
              type="text" 
              name="institution"
              placeholder="Enter your Institution name"
              className="w-full h-[36px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] transition-all text-[13px] md:text-[16px]" 
              required 
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="space-y-[14px] md:space-y-[24px]">
          <div className="space-y-[6px] md:space-y-[8px]">
            <label className="text-[12px] md:text-[16px] font-medium text-neutral-950 leading-[16px] md:leading-[24px] tracking-[-0.3125px]">
              Official Email Address <span className="text-[#e7000b]">*</span>
            </label>
            <input 
              type="email" 
              name="email"
              placeholder="name@institution.edu"
              className="w-full h-[36px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] transition-all text-[13px] md:text-[16px]" 
              required 
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-[6px] md:space-y-[8px]">
            <label className="text-[12px] md:text-[16px] font-medium text-neutral-950 leading-[16px] md:leading-[24px] tracking-[-0.3125px]">
              Mobile Number <span className="text-[#e7000b]">*</span>
            </label>
            <input 
              type="tel" 
              name="mobile"
              placeholder="+91 XXXXXXXXXX"
              className="w-full h-[36px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] transition-all text-[13px] md:text-[16px]" 
              required 
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="space-y-[14px] md:space-y-[24px]">
          <div className="space-y-[6px] md:space-y-[8px]">
            <label className="text-[12px] md:text-[16px] font-medium text-neutral-950 leading-[16px] md:leading-[24px] tracking-[-0.3125px]">
              Designation / Role <span className="text-[#e7000b]">*</span>
            </label>
            <select 
              name="designation"
              className="w-full h-[36px] md:h-[42px] border border-[#d1d5dc] rounded pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1d9883] transition-all bg-white text-[13px] md:text-[16px]" 
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
          
          <div className="space-y-[6px] md:space-y-[8px] relative">
            <label className="text-[12px] md:text-[16px] font-medium text-neutral-950 leading-[16px] md:leading-[24px] tracking-[-0.3125px]">
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
              className="w-full h-[36px] md:h-[42px] border border-[#d1d5dc] rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#1d9883] transition-all text-[13px] md:text-[16px]" 
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
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#1d9883] h-[42px] md:h-[52px] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] text-white text-[13px] md:text-[16px] font-bold leading-[18px] md:leading-[24px] hover:bg-[#098a74] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

