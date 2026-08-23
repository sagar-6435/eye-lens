import React, { createContext, useContext, useState, useEffect } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);

  const showPopup = (message, type = 'success') => {
    setPopup({ message, type });
  };

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {/* The Popup UI */}
      {popup && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-fade-in-up">
          <div className={`px-6 py-3 rounded-full shadow-xl flex items-center gap-3 backdrop-blur-md font-medium text-sm border
            ${popup.type === 'error' 
              ? 'bg-red-500/90 text-white border-red-400' 
              : 'bg-primary/90 text-white border-primary/50'
            }`}
          >
            {popup.type === 'error' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            )}
            {popup.message}
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};
