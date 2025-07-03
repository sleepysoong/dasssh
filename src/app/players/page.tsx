'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/shared/SearchBar';
import PlayerList from '@/components/players/PlayerList';

interface Player {
  id: number;
  name: string;
  onlineTime: string;
  avatarUrl: string;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch('/api/players');
        if (!res.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await res.json();
        setPlayers(data);
        setFilteredPlayers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const results = players.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(results);
  }, [searchTerm, players]);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Header title="Online Players" showBackButton />
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search players"
      />
      <PlayerList players={filteredPlayers} />
    </div>
  );
}
