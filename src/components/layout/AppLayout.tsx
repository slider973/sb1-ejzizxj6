import { Outlet } from 'react-router-dom'
import { Sidebar } from "./Sidebar"

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[280px]">
          <div className="max-w-[1200px] mx-auto px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}