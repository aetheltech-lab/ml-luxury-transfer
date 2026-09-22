import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const LOCATIONS = [
  "Select Location...",
  "🏨 George Hotel",
  "✈️ Mykonos Airport",
  "🚢 Mykonos Port",
  "🏛️ Mykonos Town (Chora)",
  "🏙️ Mykonos City/Hotels",
  "🏖️ Scorpio",
  "🏖️ Alemagkou",
  "🏖️ Principote",
  "🏖️ Spilia",
  "📍 Other Location"
];

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

const BookingForm = () => {
  const [bookingType, setBookingType] = useState('transfer'); // 'transfer' | 'hourly'
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Refs for Google Maps Autocomplete inputs
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

  const [formData, setFormData] = useState({
    pickupLocationSelect: '',
    pickupLocationOther: '',
    dropoffLocationSelect: '',
    dropoffLocationOther: '',
    duration: '2',
    
    pickupDate: '',
    pickupHour: '12',
    pickupMinute: '00',
    
    returnDate: '',
    returnHour: '12',
    returnMinute: '00',

    passengers: 1,
    luggage: 0,
    vehicleClass: 'Standard',
    paymentMethod: 'Credit Card',
    
    fullName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Google Maps Places Autocomplete Initialization
  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    const autocompleteOptions = {
      componentRestrictions: { country: "gr" },
      fields: ["formatted_address", "name"],
      types: ["establishment", "geocode"]
    };

    let pickupAutocomplete;
    let dropoffAutocomplete;

    if (pickupInputRef.current) {
      pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current, autocompleteOptions);
      pickupAutocomplete.addListener("place_changed", () => {
        const place = pickupAutocomplete.getPlace();
        const address = place.formatted_address || place.name || '';
        setFormData(prev => ({ ...prev, pickupLocationOther: address }));
      });
    }

    if (dropoffInputRef.current) {
      dropoffAutocomplete = new window.google.maps.places.Autocomplete(dropoffInputRef.current, autocompleteOptions);
      dropoffAutocomplete.addListener("place_changed", () => {
        const place = dropoffAutocomplete.getPlace();
        const address = place.formatted_address || place.name || '';
        setFormData(prev => ({ ...prev, dropoffLocationOther: address }));
      });
    }
  }, [formData.pickupLocationSelect, formData.dropoffLocationSelect]);

  // Pricing Engine Algorithm
  const calculatePrice = () => {
    let basePrice = 50; // Minimum transfer fee
    let distanceKm = 15; // Placeholder distance until Distance Matrix is fully wired
    let perKmRate = 2.5;

    if (bookingType === 'hourly') {
      basePrice = parseInt(formData.duration) * 80; // €80/hr base
      distanceKm = 0;
    } else {
      basePrice = basePrice + (distanceKm * perKmRate);
    }

    // Vehicle Multipliers
    if (formData.vehicleClass === 'Minivan') basePrice *= 1.3;
    if (formData.vehicleClass === 'VIP') basePrice *= 1.8;

    // Night Tariff Logic (22:00 to 06:00)
    let isNight = false;
    const hour = parseInt(formData.pickupHour);
    if (hour >= 22 || hour <= 6) {
      isNight = true;
      basePrice *= 1.2; // 20% surcharge
    }

    // Double price if return trip is selected
    if (isReturnTrip && bookingType === 'transfer') {
      basePrice *= 2;
    }

    return {
      price: Math.round(basePrice),
      distance: distanceKm,
      isNight: isNight
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Resolve final locations
    const finalPickup = formData.pickupLocationSelect === "📍 Other Location" 
      ? formData.pickupLocationOther 
      : formData.pickupLocationSelect;
      
    const finalDropoff = formData.dropoffLocationSelect === "📍 Other Location" 
      ? formData.dropoffLocationOther 
      : formData.dropoffLocationSelect;

    const pricing = calculatePrice();

    // Map strictly to Firestore schema
    const bookingDocument = {
      bookingId: `ML-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      createdAt: serverTimestamp(),
      passengerDetails: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      routeDetails: {
        pickupLocation: finalPickup,
        dropoffLocation: bookingType === 'hourly' ? 'Hourly Directed' : finalDropoff,
        pickupDate: formData.pickupDate,
        pickupTime: `${formData.pickupHour}:${formData.pickupMinute}`,
        flightNumber: '', // Can be added to UI later if Makis requests it
        isReturnTrip: isReturnTrip,
        returnDate: isReturnTrip ? formData.returnDate : null,
        returnTime: isReturnTrip ? `${formData.returnHour}:${formData.returnMinute}` : null,
      },
      requirements: {
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        vehicleClass: formData.vehicleClass
      },
      financials: {
        calculatedDistance: pricing.distance,
        estimatedDuration: bookingType === 'hourly' ? parseInt(formData.duration) * 60 : 30, // placeholder mins
        basePrice: pricing.price,
        nightMultiplierApplied: pricing.isNight,
        totalPrice: pricing.price, // Final calculated price
        paymentMethod: formData.paymentMethod
      },
      status: 'Pending',
      assignedDriverId: null
    };

    try {
      // Push to Firestore
      const docRef = await addDoc(collection(db, "bookings"), bookingDocument);
      console.log("Booking written with ID: ", docRef.id);
      setSubmitStatus('success');
      // Reset form on success (optional, but good UX)
      setTimeout(() => setSubmitStatus(null), 5000); 
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 text-left max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar pb-4">
        
        {/* Dual-Tab Selector - Glass UI */}
        <div className="flex w-full mb-1 border border-white/20 rounded-spatial overflow-hidden shadow-sm backdrop-blur-md shrink-0">
          <button
            type="button"
            onClick={() => setBookingType('transfer')}
            className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
              bookingType === 'transfer' 
                ? 'bg-white text-spatial-primary' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            Transfer
          </button>
          <button
            type="button"
            onClick={() => {
              setBookingType('hourly');
              setIsReturnTrip(false); // Disable return trips for hourly
            }}
            className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
              bookingType === 'hourly' 
                ? 'bg-white text-spatial-primary' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            Hourly
          </button>
        </div>

        {/* Route Details */}
        <div className="flex flex-col gap-4">
          {/* Pickup Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
              Pickup Location
            </label>
            <select 
              name="pickupLocationSelect"
              required
              value={formData.pickupLocationSelect}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
            >
              {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            {formData.pickupLocationSelect === "📍 Other Location" && (
              <input 
                type="text" 
                required
                ref={pickupInputRef}
                name="pickupLocationOther"
                placeholder="Enter exact pickup address..."
                value={formData.pickupLocationOther}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm"
              />
            )}
          </div>

          {/* Dropoff Location OR Duration */}
          {bookingType === 'transfer' ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
                Dropoff Location
              </label>
              <select 
                name="dropoffLocationSelect"
                required
                value={formData.dropoffLocationSelect}
                onChange={handleChange}
                className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
              >
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              {formData.dropoffLocationSelect === "📍 Other Location" && (
                <input 
                  type="text" 
                  required
                  ref={dropoffInputRef}
                  name="dropoffLocationOther"
                  placeholder="Enter exact dropoff address..."
                  value={formData.dropoffLocationOther}
                  onChange={handleChange}
                  className="w-full p-3 mt-1 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
                Duration (Hours)
              </label>
              <select 
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24].map(num => (
                  <option key={num} value={num}>{num} Hours</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Primary Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
              Pickup Date
            </label>
            <input 
              type="date" 
              required
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm [color-scheme:dark]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
              Pickup Time
            </label>
            <div className="flex items-center gap-2">
              <select name="pickupHour" value={formData.pickupHour} onChange={handleChange} className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary">
                {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <span className="text-white font-bold">:</span>
              <select name="pickupMinute" value={formData.pickupMinute} onChange={handleChange} className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary">
                {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Return Trip Toggle (Transfers Only) */}
        {bookingType === 'transfer' && (
          <div className="flex flex-col gap-3 border-t border-white/10 pt-4 mt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6 border-2 border-white/50 rounded bg-white/5 group-hover:border-white transition-colors">
                <input 
                  type="checkbox" 
                  className="opacity-0 absolute inset-0 cursor-pointer"
                  checked={isReturnTrip}
                  onChange={(e) => setIsReturnTrip(e.target.checked)}
                />
                {isReturnTrip && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-bold text-white tracking-wide">Book Return Trip</span>
            </label>

            {/* Conditional Return Trip Date/Time */}
            {isReturnTrip && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
                    Return Date
                  </label>
                  <input 
                    type="date"
                    required={isReturnTrip}
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm [color-scheme:dark]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
                    Return Time
                  </label>
                  <div className="flex items-center gap-2">
                    <select name="returnHour" value={formData.returnHour} onChange={handleChange} className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary">
                      {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <span className="text-white font-bold">:</span>
                    <select name="returnMinute" value={formData.returnMinute} onChange={handleChange} className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary">
                      {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Logistics Grid */}
        <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm truncate">
              People
            </label>
            <select 
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm truncate">
              Luggage
            </label>
            <select 
              name="luggage"
              value={formData.luggage}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm truncate">
              Class
            </label>
            <select 
              name="vehicleClass"
              value={formData.vehicleClass}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
            >
              <option value="Standard">Standard</option>
              <option value="Minivan">Minivan</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-1.5 border-t border-white/10 pt-5 mt-2">
          <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
            Payment Method
          </label>
          <select 
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white focus:ring-2 focus:ring-white/50 outline-none transition-all backdrop-blur-sm [&>option]:bg-spatial-primary [&>option]:text-white"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash to Driver</option>
          </select>
        </div>

        {/* Passenger Details Section */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
              Full Name
            </label>
            <input 
              type="text" 
              required
              name="fullName"
              placeholder="Passenger Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
              Email Address
            </label>
            <input 
              type="email" 
              required
              name="email"
              placeholder="passenger@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">
              WhatsApp Phone
            </label>
            <input 
              type="tel" 
              required
              name="phone"
              placeholder="+30 690 000 0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all backdrop-blur-sm"
            />
          </div>
        </div>
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-spatial text-sm text-center font-bold mt-2">
            Booking Request Received! We will contact you shortly.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-spatial text-sm text-center font-bold mt-2">
            Error submitting booking. Please try again or contact us directly.
          </div>
        )}

      </form>
      
      {/* Submit CTA (Moved outside the scrolling form area so it's always visible) */}
      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-white hover:bg-white/90 text-spatial-primary font-bold py-4 px-4 rounded-spatial transition-colors mt-4 shadow-lg tracking-widest text-sm uppercase disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-spatial-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          "Start / Continue"
        )}
      </button>
    </>
  );
};

export default BookingForm;