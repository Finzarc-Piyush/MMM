import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DSView = () => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'ds') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to the Data Scientist View</h1>
    </div>
  );
};

export default DSView;
