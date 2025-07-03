interface ChartDataPoint {
  time: string;
  value: number;
}

interface PlayerCountChartProps {
  data: ChartDataPoint[];
  currentCount: number;
  countChange: number;
}

export default function PlayerCountChart({ data, currentCount, countChange }: PlayerCountChartProps) {
  const isPositive = countChange >= 0;

  return (
    <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-brand-gray-border p-6">
      <p className="text-brand-dark text-base font-medium leading-normal">Player Count Over Time</p>
      <p className="text-brand-dark tracking-light text-[32px] font-bold leading-tight truncate">{currentCount}</p>
      <div className="flex gap-1">
        <p className="text-brand-gray text-base font-normal leading-normal">Last 24 Hours</p>
        <p className={`${isPositive ? 'text-brand-green' : 'text-brand-red'} text-base font-medium leading-normal`}>
          {isPositive ? '+' : ''}{countChange}
        </p>
      </div>
      <div className="grid min-h-[180px] gap-x-4 gap-y-6 grid-cols-[auto_1fr] items-center py-3">
        {data.map(item => (
          <>
            <p className="text-brand-gray text-[13px] font-bold leading-normal tracking-[0.015em]">{item.time}</p>
            <div className="h-full flex-1">
              <div className="border-brand-gray bg-brand-gray-light border-r-2 h-full" style={{ width: `${item.value}%` }}></div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
