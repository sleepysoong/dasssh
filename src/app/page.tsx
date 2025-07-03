'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import StatusCard from '@/components/dashboard/StatusCard';
import CpuUsageChart from '@/components/dashboard/CpuUsageChart';
import RamUsageChart from '@/components/dashboard/RamUsageChart';
import PlayerCountChart from '@/components/dashboard/PlayerCountChart';

interface ServerStatus {
  cpuUsage: number;
  cpuChange: number;
  ramUsage: number;
  ramChange: number;
  onlinePlayers: number;
  onlinePlayersChange: number;
  maxPlayers: number;
  cpuUsageOverTime: { time: string; value: number }[];
  ramUsageOverTime: { time: string; value: number }[];
  playerCountOverTime: { time: string; value: number }[];
}

export default function HomePage() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) {
          throw new Error('Failed to fetch server status');
        }
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchStatus();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!status) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
      <Header title="Server Status" showSettingsButton />
      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          <StatusCard label="CPU Usage" value={`${status.cpuUsage}%`} change={status.cpuChange} />
          <StatusCard label="RAM Usage" value={`${status.ramUsage}%`} change={status.ramChange} />
        </div>
        <div className="py-6">
          <CpuUsageChart data={status.cpuUsageOverTime} currentUsage={status.cpuUsage} usageChange={status.cpuChange} />
        </div>
        <div className="py-6">
          <RamUsageChart data={status.ramUsageOverTime} currentUsage={status.ramUsage} usageChange={status.ramChange} />
        </div>
        <div className="flex flex-wrap gap-4">
            <StatusCard label="Online Players" value={`${status.onlinePlayers}`} change={status.onlinePlayersChange} />
            <StatusCard label="Max Players" value={`${status.maxPlayers}`} change={0} />
        </div>
        <div className="py-6">
          <PlayerCountChart data={status.playerCountOverTime} currentCount={status.onlinePlayers} countChange={status.onlinePlayersChange} />
        </div>
      </div>
    </div>
  );
}