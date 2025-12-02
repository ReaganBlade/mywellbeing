import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import ActiveCard from "./components/ActiveCard";

type ActiveWindow = {
  owner: string | null;
  title: string | null;
  pid: number | null;
  platform: string;
  timestamp: number;
};

function App() {
  const [active, setActive] = useState<ActiveWindow | null>(null);

  useEffect(() => {
    const unsubscribe = window.electronAPI?.onActiveWindow(
      (payload: ActiveWindow) => {
        console.log("active-window", payload);
        setActive(payload);
      }
    );

    return () => {
      try {
        if (typeof unsubscribe === "function") unsubscribe();
      } catch {}
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">MyWellbeing — Active App</h1>

      <ActiveCard active={active} />

      <div className="mt-6 flex justify-center">
        <Button className="mr-3">Rescan</Button>
        <Button variant="ghost">Settings</Button>
      </div>
    </div>
  );
}

export default App;
