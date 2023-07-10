"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // config
    fetch("/api/config")
      .catch(err => {
        console.log(err)
      })

    // sign up  
    router.push("/profile/signup")
  }, [router]);

  return (
    <main>
      <h1>First page</h1>
    </main>
  )
}
