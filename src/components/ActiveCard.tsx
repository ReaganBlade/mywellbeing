import React from "react";
import { Button } from "../components/ui/button";

type ActiveWindow = {
  owner: string | null;
  title: string | null;
  pid: number | null;
  platform: string;
  timestamp: number;
};

const ActiveCard: React.FC<{ active: ActiveWindow | null }> = ({ active }) => {
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-xl shadow-lg">
      {!active ? (
        <div className="text-center py-8">
          <div className="text-6xl">🖥️</div>
          <h2 className="text-xl font-semibold mt-4">No active window detected</h2>
          <p className="text-sm text-gray-300 mt-2">When an active app is detected it will appear here.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Button>Rescan</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-900 flex items-center justify-center text-3xl">
            {active.platform === "win32" ? "🪟" : active.platform === "darwin" ? "🍎" : "🖥️"}
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold truncate">{active.owner ?? "—"}</h3>
            <p className="text-sm text-gray-300 truncate">{active.title ?? "—"}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">PID</div>
              <div className="font-mono">{active.pid ?? "—"}</div>

              <div className="text-gray-400">Platform</div>
              <div className="capitalize">{active.platform}</div>

              <div className="text-gray-400">Last seen</div>
              <div>{new Date(active.timestamp).toLocaleString()}</div>
            </div>

            <div className="mt-5 flex gap-3">
              <Button>Focus</Button>
              <Button variant="ghost">Ignore</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCard;
