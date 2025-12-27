'use client';

import React from 'react';

interface HeroVisualProps {
  variant?: 'tech' | 'mobile' | 'web';
}

const HeroVisual: React.FC<HeroVisualProps> = ({ variant = 'tech' }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-primary/30 rounded-full blur-3xl animate-pulse-glow" />

      {/* Rotating rings */}
      <div className="absolute w-[400px] h-[400px] border border-cyan-500/20 rounded-full animate-spin-slow" />
      <div className="absolute w-[340px] h-[340px] border border-primary/30 rounded-full animate-spin-reverse" />
      <div className="absolute w-[280px] h-[280px] border-2 border-dashed border-cyan-400/20 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />

      {/* Main visual container */}
      <div className="relative z-10">
        {variant === 'tech' && <TechVisual />}
        {variant === 'mobile' && <MobileVisual />}
        {variant === 'web' && <WebVisual />}
      </div>

      {/* Floating elements */}
      <FloatingElements />
    </div>
  );
};

const TechVisual = () => (
  <div className="relative">
    {/* Central device/screen */}
    <div className="w-72 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/20 overflow-hidden">
      {/* Screen header */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>

      {/* Code lines */}
      <div className="p-4 space-y-2">
        <div className="flex gap-2">
          <span className="text-purple-400 text-xs font-mono">const</span>
          <span className="text-cyan-400 text-xs font-mono">success</span>
          <span className="text-white/60 text-xs font-mono">=</span>
          <span className="text-green-400 text-xs font-mono">true</span>
        </div>
        <div className="flex gap-2">
          <span className="text-purple-400 text-xs font-mono">await</span>
          <span className="text-yellow-400 text-xs font-mono">buildDreams</span>
          <span className="text-white/60 text-xs font-mono">()</span>
        </div>
        <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent my-2" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-mono">Build successful</span>
        </div>
      </div>
    </div>

    {/* Floating cards */}
    <div className="absolute -top-8 -right-12 w-32 h-20 bg-gradient-to-br from-cyan-500/20 to-primary/20 backdrop-blur-sm rounded-xl border border-white/10 p-3 animate-float">
      <div className="text-cyan-400 text-lg font-bold">+150%</div>
      <div className="text-white/60 text-xs">Performance</div>
    </div>

    <div className="absolute -bottom-6 -left-10 w-28 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl border border-white/10 p-3 animate-float" style={{ animationDelay: '1s' }}>
      <div className="text-green-400 text-sm font-bold">Sécurisé</div>
      <div className="text-white/60 text-xs">100% safe</div>
    </div>
  </div>
);

const MobileVisual = () => (
  <div className="relative">
    {/* Phone frame */}
    <div className="w-48 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] border-4 border-gray-700 shadow-2xl shadow-cyan-500/20 overflow-hidden">
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />

      {/* Screen content */}
      <div className="mt-8 p-4 space-y-3">
        <div className="w-full h-24 bg-gradient-to-br from-cyan-500/30 to-primary/30 rounded-xl animate-pulse" />
        <div className="flex gap-2">
          <div className="flex-1 h-16 bg-white/5 rounded-lg" />
          <div className="flex-1 h-16 bg-white/5 rounded-lg" />
        </div>
        <div className="w-3/4 h-3 bg-white/10 rounded-full" />
        <div className="w-1/2 h-3 bg-white/10 rounded-full" />
        <div className="mt-4 w-full h-10 bg-gradient-to-r from-cyan-500 to-primary rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">Télécharger</span>
        </div>
      </div>
    </div>

    {/* Notification */}
    <div className="absolute -top-4 -right-8 w-36 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2 animate-float">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-primary flex items-center justify-center text-white text-xs">B</div>
        <div>
          <div className="text-white text-xs font-medium">Nouveau message</div>
          <div className="text-white/60 text-[10px]">Projet validé!</div>
        </div>
      </div>
    </div>
  </div>
);

const WebVisual = () => (
  <div className="relative">
    {/* Browser window */}
    <div className="w-80 h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 shadow-2xl shadow-cyan-500/20 overflow-hidden">
      {/* Browser header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-black/40 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 h-5 bg-white/5 rounded-md mx-2 flex items-center px-2">
          <span className="text-white/40 text-[10px]">bytecraft-technologies.com</span>
        </div>
      </div>

      {/* Website content */}
      <div className="p-3 space-y-2">
        <div className="flex justify-between items-center">
          <div className="w-16 h-4 bg-gradient-to-r from-cyan-500 to-primary rounded" />
          <div className="flex gap-2">
            <div className="w-8 h-2 bg-white/20 rounded" />
            <div className="w-8 h-2 bg-white/20 rounded" />
            <div className="w-8 h-2 bg-white/20 rounded" />
          </div>
        </div>
        <div className="h-20 bg-gradient-to-br from-cyan-500/10 to-primary/10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-2 bg-white/30 rounded mx-auto mb-2" />
            <div className="w-16 h-2 bg-white/20 rounded mx-auto" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 bg-white/5 rounded" />
          <div className="flex-1 h-8 bg-white/5 rounded" />
          <div className="flex-1 h-8 bg-white/5 rounded" />
        </div>
      </div>
    </div>

    {/* Analytics card */}
    <div className="absolute -bottom-6 -right-8 w-32 h-20 bg-gradient-to-br from-cyan-500/20 to-primary/20 backdrop-blur-sm rounded-xl border border-white/10 p-3 animate-float">
      <div className="flex items-end gap-1 h-8 mb-1">
        <div className="w-2 h-3 bg-cyan-400/60 rounded-sm" />
        <div className="w-2 h-5 bg-cyan-400/70 rounded-sm" />
        <div className="w-2 h-4 bg-cyan-400/60 rounded-sm" />
        <div className="w-2 h-7 bg-cyan-400 rounded-sm" />
        <div className="w-2 h-6 bg-cyan-400/80 rounded-sm" />
      </div>
      <div className="text-white/60 text-[10px]">Visiteurs +45%</div>
    </div>
  </div>
);

const FloatingElements = () => (
  <>
    {/* Floating icons/shapes */}
    <div className="absolute top-10 left-0 w-10 h-10 border border-cyan-500/30 rounded-lg rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
    <div className="absolute bottom-20 right-0 w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-primary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
    <div className="absolute top-1/4 right-10 w-6 h-6 border-2 border-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />

    {/* Dots */}
    <div className="absolute top-1/3 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
    <div className="absolute bottom-1/4 left-5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    <div className="absolute top-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
  </>
);

export default HeroVisual;