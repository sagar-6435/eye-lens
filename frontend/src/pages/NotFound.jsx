import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0f] min-h-[85vh] flex items-center justify-center p-4 overflow-hidden w-full absolute inset-0 z-50">
      
      {/* main 404 card – exactly the same structure, but enhanced with extra animations */}
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] w-full w-full px-4 text-center overflow-visible">

        {/* Decorative blurred background shapes — more dynamic, extra layers */}
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[#6c5ce7]/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob-1"></div>
        <div className="absolute top-[20%] right-[8%] w-80 h-80 bg-[#f9a8d4]/25 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob-2"></div>
        <div className="absolute bottom-[10%] left-[20%] w-72 h-72 bg-[#818cf8]/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob-3"></div>
        <div className="absolute bottom-[25%] right-[15%] w-64 h-64 bg-[#a78bfa]/20 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob-1 animation-delay-2000"></div>

        {/* 404 Text — with pulse ring and glow */}
        <div className="relative group cursor-default mt-4">
          <div className="absolute -inset-6 bg-gradient-to-r from-[#6c5ce7] to-[#f9a8d4] rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition duration-700 pulse-ring"></div>
          <div className="absolute -inset-12 bg-[#6c5ce7]/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <h1 className="relative text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#f9a8d4] to-[#a78bfa] background-animate mb-2 tracking-tight text-glow">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="z-10 mt-6 flex flex-col items-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#f1f1f7] mb-4 tracking-tight drop-shadow-lg">
            Lost in sight?
          </h2>
          <p className="text-[#a8a8c0] text-base md:text-lg max-w-md mb-8 leading-relaxed px-4">
            The page you're looking for doesn't seem to exist. It might have been moved, or maybe it's just out of focus.
          </p>

          {/* Glowing home button — with animated border and shine */}
          <button 
            onClick={() => navigate('/')}
            className="relative inline-flex h-14 w-48 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#6c5ce7] focus:ring-offset-2 focus:ring-offset-[#0a0a0f] active:scale-[0.97] transition-all group home-btn-glow"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#6c5ce7_40%,#f9a8d4_70%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#6c5ce7] group-hover:bg-[#5a4bd1] px-8 py-3 text-sm font-bold text-white transition-colors relative z-10 btn-shimmer">
              Take Me Home
            </span>
          </button>

          {/* subtle floating dots (extra charm) */}
          <div className="flex gap-3 mt-10 opacity-40">
            <span className="w-2 h-2 rounded-full bg-[#6c5ce7] animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-[#f9a8d4] animate-pulse animation-delay-2000"></span>
            <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse animation-delay-4000"></span>
          </div>
        </div>

        {/* Global Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }

          /* extra spin for the conic gradient (faster) */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* ensure pulse-ring works */
          .pulse-ring {
            animation: pulse-soft 3s ease-in-out infinite;
          }
          @keyframes pulse-soft {
            0% { opacity: 0.2; transform: scale(0.96); }
            50% { opacity: 0.5; transform: scale(1.04); }
            100% { opacity: 0.2; transform: scale(0.96); }
          }

          /* enhanced blob animations */
          @keyframes float-blob-1 {
            0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            33% { transform: translate(40px, -60px) scale(1.15) rotate(3deg); }
            66% { transform: translate(-30px, 30px) scale(0.85) rotate(-2deg); }
            100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          }
          @keyframes float-blob-2 {
            0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            33% { transform: translate(-50px, 40px) scale(1.2) rotate(-4deg); }
            66% { transform: translate(30px, -20px) scale(0.8) rotate(3deg); }
            100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          }
          @keyframes float-blob-3 {
            0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            33% { transform: translate(20px, 50px) scale(0.9) rotate(2deg); }
            66% { transform: translate(-40px, -30px) scale(1.1) rotate(-3deg); }
            100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          }
          .animate-blob-1 {
            animation: float-blob-1 9s infinite ease-in-out;
          }
          .animate-blob-2 {
            animation: float-blob-2 11s infinite ease-in-out;
          }
          .animate-blob-3 {
            animation: float-blob-3 13s infinite ease-in-out;
          }

          /* fade-up overrides for smoothness */
          @keyframes fade-up-float {
            0% { opacity: 0; transform: translateY(28px) scale(0.94); }
            60% { opacity: 1; transform: translateY(-4px) scale(1.01); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-fade-in-up {
            animation: fade-up-float 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* background-animate (gradient-x) */
          .background-animate {
            background-size: 300% 300%;
            animation: shimmer-gradient 5s ease-in-out infinite;
          }
          @keyframes shimmer-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* button shimmer + glow */
          .btn-shimmer {
            background: linear-gradient(135deg, #6c5ce7, #a78bfa, #6c5ce7);
            background-size: 200% 200%;
            animation: shimmer-gradient 3s ease-in-out infinite;
          }
          .btn-shimmer:hover {
            animation-duration: 1.5s;
          }

          /* extra sparkle for home button */
          .home-btn-glow {
            box-shadow: 0 0 30px rgba(108, 92, 231, 0.2);
            transition: box-shadow 0.3s, transform 0.2s;
          }
          .home-btn-glow:hover {
            box-shadow: 0 0 50px rgba(108, 92, 231, 0.5);
            transform: scale(1.02);
          }

          /* subtle text shadow */
          .text-glow {
            text-shadow: 0 0 40px rgba(108, 92, 231, 0.15);
          }
        `}} />
      </div>
    </div>
  );
}

export default NotFound;
