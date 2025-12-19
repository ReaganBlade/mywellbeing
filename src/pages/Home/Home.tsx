import ActiveCard from "@/components/ActiveCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUsageStore } from "@/store/usageStore";

type ActiveWindow = {
  owner: string | null;
  title: string | null;
  pid: number | null;
  platform: string;
  timestamp: number;
};

const Home = () => {
  const [active, setActive] = useState<ActiveWindow | null>(null);
  const {isLoading, setIsLoading} = useUsageStore();

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
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Today</h2>
        <button className="rounded bg-muted px-3 py-1 text-sm text-white" onClick={() => setIsLoading(!isLoading)
        }>
          Toggle Loading
        </button>

        <p className="text-muted-foreground">
          Loading State: {isLoading ? "True" : "False"}
        </p>
      </div>
    </div>
  );
};

export default Home;
