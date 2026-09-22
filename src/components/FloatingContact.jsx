import { useState } from 'react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse items-end gap-3">
      
      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 bg-white text-spatial-primary rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300 z-10 group"
      >
        {/* Animated pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-75"></div>
        
        {/* Icon toggle (X when open, Chat bubble when closed) */}
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Expandable Menu Items */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* Phone Button */}
        <a 
          href="tel:+306946042020"
          className="flex items-center gap-3 pr-2 group"
        >
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-spatial border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Us
          </span>
          <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg border border-white/20 hover:bg-blue-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </div>
        </a>

        {/* WhatsApp Button */}
        <a 
          href="https://api.whatsapp.com/send/?phone=306946042020&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 pr-2 group"
        >
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-spatial border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp
          </span>
          <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-full shadow-lg border border-white/20 hover:bg-green-500 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        </a>

        {/* Instagram Button */}
        <a 
          href="https://www.instagram.com/ml__luxury_transfer?igsh=MWpsZjVkYWZjeXc0eQ%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 pr-2 group"
        >
          <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-spatial border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Instagram
          </span>
          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full shadow-lg border border-white/20 hover:opacity-90 transition-opacity">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FloatingContact;