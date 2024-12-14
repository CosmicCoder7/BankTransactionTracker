import React from 'react';
import { Download, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onExport: () => void;
}

export default function Header({ darkMode, onDarkModeToggle, onExport }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold dark:text-white">
        Bank Account Transaction Tracker
      </h1>
      <div className="flex gap-4">
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="text-white" /> : <Moon />}
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>
    </div>
  );
}