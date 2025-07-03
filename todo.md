# PocketMine-MP 대시보드 - 개발 계획

## 1. 프로젝트 개요

제공된 UI 디자인(서버 상태, 온라인 플레이어)을 기반으로 PocketMine-MP 서버의 상태를 모니터링하고 관리할 수 있는 웹 대시보드를 구축합니다.

- **주요 기능:**
    - 서버의 실시간 CPU, RAM 사용량 확인
    - 시간대별 CPU, RAM, 플레이어 수 변화 차트 시각화
    - 현재 접속 중인 플레이어 목록 확인 및 검색
    - (향후 확장) 플레이어 Kick/Ban 기능

## 2. 기술 스택

- **프레임워크:** Next.js (v14+)
- **언어:** TypeScript
- **스타일링:** Tailwind CSS
- **데이터 페칭:** SWR 또는 React Query (클라이언트 사이드), `fetch` (서버 사이드)
- **아이콘:** 커스텀 SVG 컴포넌트

## 3. 프로젝트 구조

```
/
├── components/
│   ├── dashboard/
│   │   ├── StatusCard.tsx
│   │   ├── CpuUsageChart.tsx
│   │   └── ...
│   ├── players/
│   │   ├── PlayerList.tsx
│   │   └── PlayerListItem.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── BottomNav.tsx
│   └── shared/
│       ├── Icon.tsx
│       └── SearchBar.tsx
├── pages/
│   ├── api/
│   │   ├── status.ts       # 서버 상태 Mock API
│   │   └── players.ts      # 플레이어 목록 Mock API
│   ├── _app.tsx
│   ├── index.tsx           # 서버 상태 페이지 (1.png)
│   └── players.tsx         # 온라인 플레이어 페이지 (2.png)
├── lib/
│   └── pocketmine.ts       # (주석 처리된) 실제 서버 연동 로직
├── public/
│   └── ...
├── styles/
│   └── globals.css
└── tailwind.config.ts
```

## 4. 디자인 계획

- **폰트:** `Space Grotesk`와 `Noto Sans`를 `_app.tsx`에 전역으로 적용합니다.
- **색상:** `tailwind.config.ts`에 디자인에 사용된 주요 색상을 등록하여 일관성을 유지합니다.

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-dark': '#101519',
        'brand-gray': {
          DEFAULT: '#57788e',
          light: '#e9eef1',
          border: '#d3dde4',
        },
        'brand-green': '#078838',
        'brand-red': '#e73508',
      },
    },
  },
  // ...
};
```

- **레이아웃:**
    - `flexbox`와 `grid`를 사용하여 반응형 레이아웃을 구성합니다.
    - 하단 네비게이션은 `position: fixed`를 사용하여 화면 하단에 고정합니다.

## 5. 개발 작업 목록

- [ ] **1. 프로젝트 초기화**
    - `npx create-next-app`으로 TypeScript, Tailwind CSS 포함 프로젝트 생성
    - `tailwind.config.ts`에 커스텀 색상 및 폰트 설정 추가

- [ ] **2. 모의(Mock) API 엔드포인트 생성**
    - `pages/api/status.ts` 작성:
        ```typescript
        // pages/api/status.ts
        import type { NextApiRequest, NextApiResponse } from 'next';

        export default function handler(req: NextApiRequest, res: NextApiResponse) {
          res.status(200).json({
            cpuUsage: 65,
            cpuChange: 5,
            ramUsage: 78,
            ramChange: -2,
            onlinePlayers: 15,
            onlinePlayersChange: 2,
            maxPlayers: 20,
            // ... chart data
          });
        }
        ```
    - `pages/api/players.ts` 작성:
        ```typescript
        // pages/api/players.ts
        import type { NextApiRequest, NextApiResponse } from 'next';

        export default function handler(req: NextApiRequest, res: NextApiResponse) {
          res.status(200).json([
            { id: 1, name: 'Alex', onlineTime: '2h 30m', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6eDnZzRN9jJx0aaEPEcBd8tD5vIgoAf5my01_dLLNK4qJUKkFyivfFxiV1KIBP9wGoXy625bDGwbnZJQDsHc5VuQces2rRwEW0S9y17cByFr-C0N1SyiuRPTVRfMSdR99xBNwLRsYrGbmmvQU6QCp4vR-Z6VvxxQEa5dl91d7Mva_KNRCf7Bs1YpCJsOBG6c3t5CBEcMGgJrFROrALc0H7x3yaL_fHLcQZ8rpUD96q1j1RjhUUcvvH1cc1KPHhsk-hXWqD-qpw9o' },
            { id: 2, name: 'Sophia', onlineTime: '1h 15m', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Wp1rN5lnNC3pokplSFQ9QsY0xZ9X1wUOdgwiUixo-0Iyu4Db_9-S8VYBsvcUAjRl_JaJMEQRaXxdvtTyjNGXT9J0c5mnQcGxg-KsNmUH52UVEmtDIsJzXLnzk--2rQEqGq4mTIiONM-I0_wAKPfVyHaInXh5f2NetaIYKQxV550RQLzia4XS4x5xwJCDC-lGXB4TGi2lavKGkVdWIq7RJYpRgBVTt7DqvzJFrmGKIO1Ttq6LqVzkPGwGUzGjIoarqFvBo_mB6K8' },
            { id: 3, name: 'Ethan', onlineTime: '3h 45m', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7L5xEtDKKAFCU-6b42Z37dEVGaat1ziXI2dLDVFXA6r7VHPf16sU-2oCx_bGKY3hnzkUaV_AuxKNZzGJi0xvZrA6BESqgjYUHzWZVfNKCf1Mr-tQ6cXjjlwtMi4r_DlC6zgy8ORI6pxQKX6unl63dcz7lkQl7GF_aF2ei1zlri1YESOZuJmMwTqXPLK06uLgOhJTGmNqAtjrIF-jQDPoxgVSKa3FuOCNUdQ2-O-z_RK0dzJbD9CIhyMK9vsYeaK6eieE0-vb_kX0' },
            { id: 4, name: 'Olivia', onlineTime: '4h 20m', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLESQN26qPsdSPJ2FxxQnEpNxCqYr69wX3WjzD0orNw6cz3SILQx96tRduPn2ihN1VpJxxu4UHyx30kp8oZ5v1Fb9Jwm8bvEVYuHvN7nHtYY9Er8r2XRCbkuH3Paosf7Ekki_6bMSY9EhAzstKxvHbxejKYQ8OGGysU-TaWPS8-rWju_N2WEIpZs3xv81NDrpYdSnvtU0etnIKwq6FXn2AnJoh-J8rzl5TC_uISsDpEeAyWXtHHq9OTIkWmJjSDv1eIBqflgMb9uc' },
            { id: 5, name: 'Liam', onlineTime: '2h 55m', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnDCQi5nZAEEMuBb2S6cpvOQT1s8mnks96wHiOts0EJmUqG1NzBYjcRoQx4inWHaj31fXAgkQp-YILsucvRh8ZItDhvEDU-yxxf2ZiOLFGiOqXCWiFCFS1syhD6qsc3pdGJ09VN4Dgiu8UcBRm9eT_TrdQ76PViC8g3ujU6iq2ra4zKJYPAijZOntZvpg2tCL97e-WfBPAt3QVIqcGbvGSMGNvbTz6hJGwk4kxpeVXGTmkkG95_9jRMMbKokDy_JlKJZn779XgT9U' },
          ]);
        }
        ```

- [ ] **3. 실제 서버 연동 로직 구현 (주석 처리)**
    - `lib/pocketmine.ts` 파일 생성
    - PocketMine 서버 쿼리 로직을 담은 함수 작성 (예: `fetchServerStatus`, `fetchPlayers`)
        ```typescript
        // lib/pocketmine.ts

        /*
        const SERVER_IP = '127.0.0.1';
        const SERVER_PORT = 19132;

        export async function fetchServerStatus() {
          // In a real scenario, you would use a library like 'gamedig'
          // or a custom UDP protocol implementation to query the server.
          // const status = await SomeQueryLibrary.query({
          //   type: 'pocketmine',
          //   host: SERVER_IP,
          //   port: SERVER_PORT
          // });
          // return { cpu: ..., ram: ..., ... };
          throw new Error('Not implemented');
        }
        */
        ```

- [ ] **4. UI 컴포넌트 개발**
    - [ ] `BottomNav.tsx` (하단 네비게이션)
    - [ ] `StatusCard.tsx` (CPU/RAM 카드)
    - [ ] `CpuUsageChart.tsx` (CPU 사용량 라인 차트 - SVG)
    - [ ] `RamUsageChart.tsx` (RAM 사용량 바 차트 - div)
    - [ ] `PlayerCountChart.tsx` (플레이어 수 바 차트 - div)
    - [ ] `PlayerListItem.tsx` (플레이어 목록 아이템)
    - [ ] `SearchBar.tsx` (검색창)

- [ ] **5. 페이지 구현**
    - [ ] `pages/index.tsx` (서버 상태 페이지)
        - `useSWR` 또는 `useEffect` + `fetch`로 `/api/status` 데이터 호출
        - 불러온 데이터와 컴포넌트를 조합하여 UI 완성
    - [ ] `pages/players.tsx` (온라인 플레이어 페이지)
        - `/api/players` 데이터 호출
        - 검색 기능 구현 (클라이언트 사이드 필터링)
        - UI 완성

- [ ] **6. 최종 작업**
    - [ ] `README.md` 작성 (프로젝트 설명, 실행 방법)
    - [ ] 코드 포맷팅 및 주석 정리
