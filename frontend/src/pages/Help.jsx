import React from 'react';

function Help() {
  return (
    <div className="pt-6 pb-24 px-4 w-full mx-auto animate-fade-in-up">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-2">Help & Contact</h1>
        <p className="text-text-secondary">We're here to assist you with all your eyewear needs.</p>
      </div>

      <div className="bg-background-secondary rounded-3xl p-6 md:p-8 border border-border-primary mb-8 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          Our Branches
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Branch 1 */}
          <div className="bg-background rounded-2xl p-5 border border-border-primary hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -z-10"></div>
            <h3 className="font-bold text-lg text-text-primary mb-3">EYE CARES - BHIMAVARAM</h3>
            <div className="flex items-start gap-3 text-text-secondary mb-3 text-sm">
              <svg className="w-5 h-5 shrink-0 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p>Undi Rd, near AJANTHA CANTEEN, Balusumoodi,<br/>Bhimavaram,<br/>West Godavari,Andhra Pradesh 534202</p>
            </div>
            <div className="flex items-center gap-3 text-text-secondary text-sm">
              <svg className="w-5 h-5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <a href="tel:+919505996994" className="hover:text-primary transition-colors font-medium"> 095059 96994</a>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="bg-background rounded-2xl p-5 border border-border-primary hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full -z-10"></div>
            <h3 className="font-bold text-lg text-text-primary mb-3">EYE CARES - PALAKOLLU</h3>
            <div className="flex items-start gap-3 text-text-secondary mb-3 text-sm">
              <svg className="w-5 h-5 shrink-0 text-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <p>Pedha gopuram, road mainroad,<br/>Palakollu,<br/>Andhra Pradesh,534260</p>
            </div>
            <div className="flex items-center gap-3 text-text-secondary text-sm">
              <svg className="w-5 h-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <a href="tel:+919505996994" className="hover:text-accent transition-colors font-medium">095059 96994</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-text-secondary text-sm">Need immediate assistance?</p>
        <button onClick={() => window.open('https://wa.me/919505996994', '_blank')} className="mt-4 bg-primary hover:bg-primary-hover text-background px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1">
          Chat with Support
        </button>
      </div>
    </div>
  );
}

export default Help;
