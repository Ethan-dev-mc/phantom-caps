import Sidebar from '@/components/admin/Sidebar'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-vx-black">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-6 lg:p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  )
}
