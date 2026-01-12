'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative z-50 py-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="2 Hour Builder"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-white font-bold text-xl md:text-2xl">2 Hour Builder</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
