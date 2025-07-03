import PlayerListItem from './PlayerListItem';

interface Player {
  id: number;
  name: string;
  onlineTime: string;
  avatarUrl: string;
}

interface PlayerListProps {
  players: Player[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div>
      {players.map(player => (
        <PlayerListItem key={player.id} {...player} />
      ))}
      <div className="flex justify-stretch mt-4">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-brand-gray-light text-brand-dark text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Kick</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-brand-gray-light text-brand-dark text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Ban</span>
          </button>
        </div>
      </div>
    </div>
  );
}
