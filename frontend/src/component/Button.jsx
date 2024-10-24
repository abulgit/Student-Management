import { Button, Switch } from '@headlessui/react'
import { useState, useEffect } from 'react';
export const LogoutButton = ()=> {
  return (
    <Button className="rounded bg-red-600 py-2 px-4 text-sm text-white data-[hover]:bg-red-500 data-[active]:bg-black">
      LogOut
    </Button>
  )
}

//Toggle button
export const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(false);

  // On mount, check for stored mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setEnabled(true);
    }
  }, []);

  // Handle theme change and store preference in localStorage
  const toggleDarkMode = () => {
    setEnabled(!enabled);
    if (!enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={toggleDarkMode}
      className={`${
        enabled ? 'bg-gray-800' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable Dark Mode</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};
