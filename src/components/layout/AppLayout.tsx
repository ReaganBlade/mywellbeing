import SideBar from "./SideBar";

const AppLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-auto p-6">
            { children }
        </main>
    </div>
  )
}

export default AppLayout;