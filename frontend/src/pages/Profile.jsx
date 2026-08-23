import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="pt-6 pb-24 px-4 w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-2">Profile</h1>
        <p className="text-text-secondary">Manage your account and preferences.</p>
      </div>

      <div className="bg-background-secondary rounded-2xl p-6 border border-border-primary mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary text-background rounded-full flex items-center justify-center text-2xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">John Doe</h2>
            <p className="text-text-secondary">john.doe@example.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full flex justify-between items-center p-4 bg-background rounded-xl border border-border-primary hover:border-primary transition-colors">
            <span className="font-medium text-text-primary">Order History</span>
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          <button className="w-full flex justify-between items-center p-4 bg-background rounded-xl border border-border-primary hover:border-primary transition-colors">
            <span className="font-medium text-text-primary">Saved Addresses</span>
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          <button className="w-full flex justify-between items-center p-4 bg-background rounded-xl border border-border-primary hover:border-primary transition-colors">
            <span className="font-medium text-text-primary">Payment Methods</span>
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => {
          localStorage.removeItem('userInfo');
          window.location.href = '/signin';
        }}
        className="block w-full py-4 text-center text-red-500 font-bold bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
