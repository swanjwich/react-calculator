import { useState } from 'react';
import DarkMode from './components/DarkMode';
import Calculator from './components/Calculator';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">Calculator</h1>
            <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />

          </div>
          <Calculator/>
        </div>
      </div>
    </div>
  );
}

export default App;
