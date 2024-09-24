import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log('User role:', role); // Add this line to log the user role
    if (role === 'brand') {
      router.push('/overview');
    } else if (role === 'ds') {
      router.push('/ds-view');
    } else {
      router.push('/login');
    }
  }, [router])

  return <div>Loading...</div>; // Change this line to show a loading message
}