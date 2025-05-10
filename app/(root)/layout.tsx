
import Navbar from '@/components/navbar/Navbar'
import LeftSideBar from '@/components/sidebar/LeftSideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <LeftSideBar />
        <main className="flex-1 relative">
          <Navbar />
          <div className="mx-auto max-w-3xl mt-5">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default RootLayout
