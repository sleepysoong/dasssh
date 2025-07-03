import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    cpuUsage: 65,
    cpuChange: 5,
    ramUsage: 78,
    ramChange: -2,
    onlinePlayers: 15,
    onlinePlayersChange: 2,
    maxPlayers: 20,
    cpuUsageOverTime: [
      { time: '12AM', value: 21 },
      { time: '6AM', value: 41 },
      { time: '12PM', value: 93 },
      { time: '6PM', value: 33 },
    ],
    ramUsageOverTime: [
        { time: '12AM', value: 50 },
        { time: '6AM', value: 20 },
        { time: '12PM', value: 40 },
        { time: '6PM', value: 70 },
    ],
    playerCountOverTime: [
        { time: '12AM', value: 80 },
        { time: '6AM', value: 20 },
        { time: '12PM', value: 30 },
        { time: '6PM', value: 80 },
    ]
  });
}
