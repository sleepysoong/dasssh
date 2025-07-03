interface StatusCardProps {
  label: string;
  value: string;
  change: number;
}

export default function StatusCard({ label, value, change }: StatusCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-brand-green' : 'text-brand-red';
  const changePrefix = isPositive ? '+' : '';

  return (
    <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-brand-gray-light">
      <p className="text-brand-dark text-base font-medium leading-normal">{label}</p>
      <p className="text-brand-dark tracking-light text-2xl font-bold leading-tight">{value}</p>
      <p className={`${changeColor} text-base font-medium leading-normal`}>
        {changePrefix}{change}%
      </p>
    </div>
  );
}
