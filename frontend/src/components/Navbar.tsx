import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (value: string) => void; // 👈 new prop for communicating search input
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value); 
  };

  return (
    <div>
      <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ksv1CWA44KGCL-VxE7CMURl5VNN4gSN0aQ&s"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="font-semibold text-lg text-gray-800 hidden sm:inline">
            highway delite
          </span>
        </div>

        <div className="flex items-center space-x-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search experiences"
            value={search}
            onChange={handleChange} // 👈 use updated handler
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg px-4 py-2">
            Search
          </button>
        </div>
      </nav>
    </div>
  );
}
