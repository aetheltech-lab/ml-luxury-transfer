import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import DispatchPortal from './components/DispatchPortal';
import FloatingContact from './components/FloatingContact';

// Premium Holographic Card Wrapper with Animated Silver Border
const HolographicCard = ({ children, className = "", padding = "p-8" }) => (
  <div className={`relative overflow-hidden rounded-spatial p-[2px] group ${className}`}>
    {/* Spinning Silver Beam Layer */}
    <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_75%,rgba(255,255,255,0.8)_100%)] opacity-70"></div>
    {/* Inner Liquid Glass Layer */}
    <div className={`relative h-full w-full bg-black/40 backdrop-blur-xl rounded-spatial border border-white/10 ${padding}`}>
      {children}
    </div>
  </div>
);

// Portal Login Placeholders for Admin, Partner, and Driver
const PortalLoginView = ({ portalName }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (portalName === 'Admin') {
      navigate('/dispatch');
    } else {
      alert(`${portalName} Portal Authentication coming online via Firebase v11.`);
    }
  };

  return (
    <div className="min-h-screen bg-spatial-primary flex flex-col items-center justify-center p-4">
      <HolographicCard className="w-full max-w-md" padding="p-8">
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">{portalName} Portal</h2>
        <p className="text-white/70 text-sm mb-6">Enter your authorized credentials to access your console.</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-white/80">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mltransfer.gr"
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-white/80">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 border border-white/20 rounded-spatial bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-white text-spatial-primary font-bold py-3 rounded-spatial hover:bg-white/90 transition-colors uppercase tracking-widest text-sm mt-4 shadow-lg"
          >
            Sign In to {portalName}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-white/70 hover:text-white underline tracking-wider">← Return to Main Page</a>
        </div>
      </HolographicCard>
    </div>
  );
};

const PassengerUI = () => {
  return (
    <div className="min-h-screen bg-spatial-background flex flex-col font-sans overflow-x-hidden text-spatial-primary">
      
      {/* Global Floating Contact Action Button */}
      <FloatingContact />
      
      {/* Top Header with Contact Info, Socials, Logo & Portal Tabs */}
      <header className="absolute top-0 left-0 w-full z-50 bg-spatial-primary/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4 text-white">
        <div className="flex items-center gap-6">
          <a href="#home">
            <img 
              src="/ml-logo.459cc42b0bb81512342c.png" 
              alt="ML Luxury Transfer Logo" 
              className="h-16 w-auto object-contain drop-shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            />
          </a>
          <div className="hidden xl:flex flex-col text-xs text-white/80 gap-0.5">
            <a href="tel:+306946042020" className="hover:text-white font-medium">📞 +30-6946042020</a>
            <a href="mailto:mltransfer@yahoo.com" className="hover:text-white font-medium">✉️ mltransfer@yahoo.com</a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a 
            href="https://api.whatsapp.com/send/?phone=306946042020&text&type=phone_number&app_absent=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded-spatial flex items-center gap-1.5 shadow-md transition-colors uppercase tracking-wider"
          >
            <span>💬 WhatsApp</span>
          </a>
          <a 
            href="https://www.instagram.com/ml__luxury_transfer?igsh=MWpsZjVkYWZjeXc0eQ%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold py-2 px-3 rounded-spatial flex items-center gap-1.5 shadow-md transition-colors uppercase tracking-wider"
          >
            <span>📸 Instagram</span>
          </a>

          <div className="h-6 w-[1px] bg-white/20 mx-1 hidden md:block"></div>

          <a href="/admin-login" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold py-2 px-3 rounded-spatial transition-colors uppercase tracking-wider">Admin</a>
          <a href="/partner-login" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold py-2 px-3 rounded-spatial transition-colors uppercase tracking-wider">Partner</a>
          <a href="/driver-login" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold py-2 px-3 rounded-spatial transition-colors uppercase tracking-wider">Driver</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative w-full h-[100svh] min-h-[900px] flex items-center justify-center px-4 pt-24">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/ml-vito-1.541191ddb0bd2557b514.jpg")' }}></div>
        <div className="absolute inset-0 bg-spatial-primary/60 z-10"></div>
        
        <HolographicCard className="relative z-20 max-w-2xl w-full text-center text-white" padding="p-8 md:p-12">
          <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded uppercase tracking-widest border border-white/20 mb-4 inline-block">
            ML Luxury Transfer
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
            Rental Car Services & Transportation With Minivan
          </h1>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 drop-shadow-sm font-medium">
            Experience seamless Mykonos transfers and exclusive private tours. Book in seconds and travel with comfort, safety, and style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking-engine" className="bg-white text-spatial-primary font-bold py-4 px-8 rounded-spatial hover:bg-white/90 transition-colors shadow-lg tracking-widest text-sm uppercase">
              Make Booking
            </a>
            <a href="tel:+306946042020" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-4 px-8 rounded-spatial transition-colors shadow-lg tracking-widest text-sm uppercase backdrop-blur-sm">
              Call Us Now
            </a>
          </div>
        </HolographicCard>
      </section>

      {/* Why Choose Us & About Section (Mykonos Background) */}
      <div className="relative w-full border-t border-white/10">
        <div className="absolute inset-0 bg-cover bg-center z-0 bg-fixed" style={{ backgroundImage: 'url("/mykonos-bg.jpg")' }}></div>
        <div className="absolute inset-0 bg-spatial-primary/80 z-10"></div>

        <div className="relative z-20">
          <section className="py-24 px-6 md:px-24">
            <div className="max-w-6xl mx-auto text-center mb-16 text-white">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 drop-shadow-md">Why Choose ML Luxury Transfer?</h2>
              <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base drop-shadow-sm">
                Experience the difference with Mykonos' leading transfer company. From airport pickups to city tours, we deliver exceptional comfort, reliability, and value—every time you travel.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                { title: "Fixed Rates", desc: "Enjoy transparent, upfront pricing for all transfers—no hidden fees, ever." },
                { title: "Reliable Transfers", desc: "Travel with confidence! Our professional drivers and modern vehicles ensure safety and punctuality." },
                { title: "No Booking Fees", desc: "Book direct and save—no extra charges, just exceptional value for your journey." },
                { title: "Booking Flexibility", desc: "Plans changed? No problem. Modify your transfer booking anytime, hassle-free." },
                { title: "Free Cancellation", desc: "Cancel up to THREE hours before your scheduled transfer—no penalties, no worries." },
                { title: "24/7 Customer Service", desc: "Our support team is always available to assist you, day or night." },
                { title: "Award-Winning Service", desc: "Voted the most reliable transfer provider—trusted by thousands of happy travelers." },
                { title: "Luxury Vehicles", desc: "Relax in style with our fleet of pristine, comfortable vehicles for every transfer." }
              ].map((item, index) => (
                <HolographicCard key={index} padding="p-8">
                  <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </HolographicCard>
              ))}
            </div>
          </section>

          <section id="about" className="py-24 px-6 md:px-24 border-t border-white/10">
            <div className="max-w-4xl mx-auto text-center mb-16 text-white">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 drop-shadow-md">About Us</h2>
              <p className="text-white/80 text-base leading-relaxed mb-6">
                We are a leading rental service provider in Mykonos and Athens, offering a fleet of well-maintained minivans for your transportation needs. Whether you are exploring the enchanting streets of Mykonos or touring the archaeological sites of Athens, our reliable vehicles and excellent service ensure an unforgettable and convenient trip for every traveler.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                We are located in Athens and Mykonos and upon agreement we can transport people to and from any other part of Greece.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <HolographicCard padding="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 text-center text-white">Our Philosophy</h3>
                <blockquote className="text-center italic text-white/80 mb-6 font-medium">
                  "When the journey itself becomes our destination, our mission is the safety, comfort and smile of our passengers."
                </blockquote>
                <p className="text-white/70 text-sm leading-relaxed mb-4 text-center">
                  We do not simply transfer our customers. We travel together… Our main concern is that your trip, small or big, becomes a beautiful memory and an unforgettable experience.
                </p>
                <p className="text-white/70 text-sm leading-relaxed text-center">
                  Our highly trained and experienced drivers, who are constantly reassessed and certified in conjunction with our exclusive minivans, guarantee that every move will be a safe and quality experience for you. You, all you have to do is enjoy your commute. ML luxury transfer promises you a comfortable, pleasant and relaxing journey.
                </p>
              </HolographicCard>
            </div>
          </section>
        </div>
      </div>

      {/* Our Cars Section (ml-vito-3 Background) */}
      <section id="fleet" className="relative py-24 px-6 md:px-24 border-t border-white/10">
        <div className="absolute inset-0 bg-cover bg-center z-0 bg-fixed" style={{ backgroundImage: 'url("/ml-vito-3.6b92977a17fdb53f5ab6.jpg")' }}></div>
        <div className="absolute inset-0 bg-spatial-primary/80 z-10"></div>
        
        <div className="relative z-20 max-w-6xl mx-auto text-center mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 drop-shadow-md">Our Cars</h2>
          <p className="text-white/80 text-sm drop-shadow-sm">Pristine fleet maintained to the highest safety and luxury standards.</p>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HolographicCard padding="p-0" className="flex flex-col">
            <img src="/ml-vito-1.541191ddb0bd2557b514.jpg" alt="Mercedes V Class" className="h-48 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-lg font-bold mb-2">Mercedes V Class</h3>
                <p className="text-white/70 text-xs">Ultimate executive comfort for VIP groups and corporate transfers.</p>
              </div>
            </div>
          </HolographicCard>
          
          <HolographicCard padding="p-0" className="flex flex-col">
            <img src="/ml-vito-3.6b92977a17fdb53f5ab6.jpg" alt="Mercedes Vito" className="h-48 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-lg font-bold mb-2">Mercedes Vito</h3>
                <p className="text-white/70 text-xs">Spacious minivan (up to 8 pax) for all routes and tours.</p>
              </div>
            </div>
          </HolographicCard>
          
          <HolographicCard padding="p-0" className="flex flex-col">
            <img src="/ml-vito-2.f974dd2749ba47f14526.jpg" alt="Mercedes Vito Premium" className="h-48 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between text-white">
              <div>
                <h3 className="text-lg font-bold mb-2">Mercedes Vito VIP</h3>
                <p className="text-white/70 text-xs">Custom luxury configuration for discerning travelers.</p>
              </div>
            </div>
          </HolographicCard>
          
          <HolographicCard padding="p-0" className="flex flex-col items-center justify-center text-center">
            <div className="p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Skoda Citigo</h3>
              <p className="text-white/70 text-xs mb-4">Compact city car available for flexible convenience.</p>
              <span className="text-xs font-bold bg-white text-spatial-primary px-3 py-1.5 rounded uppercase tracking-wider">Available</span>
            </div>
          </HolographicCard>
        </div>
      </section>

      {/* Main Booking Engine Section */}
      <section id="booking-engine" className="relative py-24 px-4 flex items-center justify-center border-t border-white/10">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url("/ml-vito-2.f974dd2749ba47f14526.jpg")' }}></div>
        <div className="absolute inset-0 bg-spatial-primary/70 z-10"></div>
        
        <HolographicCard className="relative z-20 w-full max-w-xl text-white" padding="p-8">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Book Your Transfer</h2>
          <p className="text-white/70 text-sm mb-6 border-b border-white/20 pb-4">
            Select your route, vehicle, and preferences below.
          </p>
          
          <BookingForm />

        </HolographicCard>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-spatial-primary text-white py-16 px-6 md:px-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wider uppercase text-white/90">About ML Luxury Transfer</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              ML Luxury Transfer delivers exclusive private transfers and luxury sightseeing tours across Mykonos and Athens. Travel in style with our professional English-speaking chauffeurs and our fleet of well-maintained minivans.
            </p>
            <p className="text-white/60 text-sm">
              Business or leisure, day or night, we guarantee safe, punctual, and comfortable journeys—24/7, all year round.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wider uppercase text-white/90">Contact</h3>
            <ul className="text-white/60 text-sm space-y-2">
              <li>📍 Mykonos, South Aegean, Greece</li>
              <li>📞 <a href="tel:+306946042020" className="hover:text-white transition-colors">+30-6946042020</a></li>
              <li>✉️ <a href="mailto:mltransfer@yahoo.com" className="hover:text-white transition-colors">mltransfer@yahoo.com</a></li>
              <li>🕒 24/7 Support Available</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wider uppercase text-white/90">Quick Links</h3>
            <ul className="text-white/60 text-sm space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Philosophy</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Our Cars</a></li>
              <li><a href="#booking-engine" className="hover:text-white transition-colors">Contact & Booking</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <span className="uppercase tracking-widest">ml luxury transfer</span>
          <span>Copyright © 2026 All rights reserved</span>
        </div>
      </footer>

    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PassengerUI />} />
        <Route path="/admin-login" element={<PortalLoginView portalName="Admin" />} />
        <Route path="/partner-login" element={<PortalLoginView portalName="Partner" />} />
        <Route path="/driver-login" element={<PortalLoginView portalName="Driver" />} />
        <Route path="/dispatch" element={<DispatchPortal />} />
      </Routes>
    </Router>
  );
}

export default App;