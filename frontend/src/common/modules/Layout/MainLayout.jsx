import React from 'react';
import { Header } from '@common/modules/Header';
import { Sidebar } from '@common/modules/Sidebar';

function MainLayout({ children, darkMode, toggleDarkMode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          <div className="mdx-content w-full flex flex-col px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

