import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css'; // Ensure this import is here
import type { AppProps } from 'next/app';
import { FilterProvider } from '../context/FilterContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check user role from localStorage or any other storage
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  useEffect(() => {
    // Redirect to login if no role is found
    if (!userRole && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [userRole, router]);

  if (!userRole && router.pathname !== '/login') {
    return null; // or a loading spinner
  }

  return (
    <FilterProvider>
      <Component {...pageProps} />
    </FilterProvider>
  );
}

export default MyApp;