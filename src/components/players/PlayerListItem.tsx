interface PlayerListItemProps {
  name: string;
  onlineTime: string;
  avatarUrl: string;
}

export default function PlayerListItem({ name, onlineTime, avatarUrl }: PlayerListItemProps) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      ></div>
      <div className="flex flex-col justify-center">
        <p className="text-brand-dark text-base font-medium leading-normal line-clamp-1">{name}</p>
        <p className="text-brand-gray text-sm font-normal leading-normal line-clamp-2">Online | {onlineTime}</p>
      </div>
    </div>
  );
}
