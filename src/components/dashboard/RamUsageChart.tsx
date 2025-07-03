interface ChartDataPoint {
  time: string;
  value: number;
}

interface RamUsageChartProps {
  data: ChartDataPoint[];
  currentUsage: number;
  usageChange: number;
}

export default function RamUsageChart({ data, currentUsage, usageChange }: RamUsageChartProps) {
  const isPositive = usageChange >= 0;

  return (
    <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-brand-gray-border p-6">
      <p className="text-brand-dark text-base font-medium leading-normal">RAM Usage Over Time</p>
      <p className="text-brand-dark tracking-light text-[32px] font-bold leading-tight truncate">{currentUsage}%</p>
      <div className="flex gap-1">
        <p className="text-brand-gray text-base font-normal leading-normal">Last 24 Hours</p>
        <p className={`${isPositive ? 'text-brand-green' : 'text-brand-red'} text-base font-medium leading-normal`}>
          {isPositive ? '+' : ''}{usageChange}%
        </p>
      </div>
      <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
        {data.map(item => (
          <>
            <div className="border-brand-gray bg-brand-gray-light border-t-2 w-full" style={{ height: `${item.value}%` }}></div>
            <p className="text-brand-gray text-[13px] font-bold leading-normal tracking-[0.015em]">{item.time}</p>
          </>
        ))}
      </div>
    </div>
  );
}
