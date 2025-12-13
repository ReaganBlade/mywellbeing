import ActiveCard from "@/components/ActiveCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type ActiveWindow = {
  owner: string | null;
  title: string | null;
  pid: number | null;
  platform: string;
  timestamp: number;
};

const Home = () => {
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
      } catch (err) {
        console.log("Error:", err);
      }
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">MyWellbeing — Active App</h1>

      <ActiveCard active={active} />

      <div className="mt-6 flex justify-center">
        <Button className="mr-3">Rescan</Button>
        <Button variant="ghost">Settings</Button>
      </div>
    </div>
  );
};

export default Home;
