import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 flex flex-col font-sans">
      <header className="h-14 border-b border-dark-700 bg-dark-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-code text-white text-sm"></i>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">CodeMind</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Explore</a>
            <a href="#" className="text-white">Problems</a>
            <a href="#" className="hover:text-white transition-colors">Contest</a>
            <a href="#" className="hover:text-white transition-colors">Discuss</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
            <div className="text-sm text-yellow-500 font-medium">
                <i className="fa-solid fa-gem mr-1"></i> Premium
            </div>
            <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center cursor-pointer hover:bg-dark-500">
                <i className="fa-regular fa-bell text-gray-300"></i>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer">
                JS
            </div>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;