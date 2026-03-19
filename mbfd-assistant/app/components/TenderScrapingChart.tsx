'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData: Record<string, { date: string; value: number }[]> = {
  total: [
    { date: '2 Aug', value: 12 },
    { date: '8 Aug', value: 28 },
    { date: '14 Aug', value: 22 },
    { date: '20 Aug', value: 35 },
    { date: '26 Aug', value: 30 },
    { date: '1 Sep', value: 45 },
    { date: '7 Sep', value: 40 },
    { date: '13 Sep', value: 55 },
    { date: '19 Sep', value: 50 },
    { date: '25 Sep', value: 70 },
  ],
  allTenders: [
    { date: '2 Aug', value: 20 },
    { date: '8 Aug', value: 34 },
    { date: '14 Aug', value: 30 },
    { date: '20 Aug', value: 48 },
    { date: '26 Aug', value: 42 },
    { date: '1 Sep', value: 58 },
    { date: '7 Sep', value: 52 },
    { date: '13 Sep', value: 66 },
    { date: '19 Sep', value: 60 },
    { date: '25 Sep', value: 80 },
  ],
  fetched: [
    { date: '2 Aug', value: 10 },
    { date: '8 Aug', value: 20 },
    { date: '14 Aug', value: 18 },
    { date: '20 Aug', value: 28 },
    { date: '26 Aug', value: 25 },
    { date: '1 Sep', value: 36 },
    { date: '7 Sep', value: 32 },
    { date: '13 Sep', value: 44 },
    { date: '19 Sep', value: 40 },
    { date: '25 Sep', value: 55 },
  ],
  uncertain: [
    { date: '2 Aug', value: 4 },
    { date: '8 Aug', value: 8 },
    { date: '14 Aug', value: 6 },
    { date: '20 Aug', value: 10 },
    { date: '26 Aug', value: 9 },
    { date: '1 Sep', value: 13 },
    { date: '7 Sep', value: 11 },
    { date: '13 Sep', value: 16 },
    { date: '19 Sep', value: 14 },
    { date: '25 Sep', value: 20 },
  ],
  failed: [
    { date: '2 Aug', value: 2 },
    { date: '8 Aug', value: 3 },
    { date: '14 Aug', value: 4 },
    { date: '20 Aug', value: 5 },
    { date: '26 Aug', value: 4 },
    { date: '1 Sep', value: 6 },
    { date: '7 Sep', value: 5 },
    { date: '13 Sep', value: 7 },
    { date: '19 Sep', value: 6 },
    { date: '25 Sep', value: 8 },
  ],
};

const selectSx = {
  fontSize: '0.75rem',
  height: 28,
  bgcolor: '#fff',
  '& .MuiSelect-select': { py: '4px', px: '8px' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
};

export default function TenderScrapingChart() {
  const [category, setCategory] = useState('total');
  const [period, setPeriod] = useState('recents');

  const data = chartData[category] ?? chartData.total;

  return (
    <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <ShowChartIcon sx={{ fontSize: 16, color: '#666' }} />
          <Typography variant="subtitle2" fontWeight={600} fontSize="0.8rem">
            Tender Scraping Summary
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            sx={selectSx}
          >
            <MenuItem value="total" sx={{ fontSize: '0.75rem' }}>Total</MenuItem>
            <MenuItem value="allTenders" sx={{ fontSize: '0.75rem' }}>All Tenders</MenuItem>
            <MenuItem value="fetched" sx={{ fontSize: '0.75rem' }}>Fetched</MenuItem>
            <MenuItem value="uncertain" sx={{ fontSize: '0.75rem' }}>Uncertain</MenuItem>
            <MenuItem value="failed" sx={{ fontSize: '0.75rem' }}>Failed</MenuItem>
          </Select>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            size="small"
            sx={selectSx}
          >
            <MenuItem value="recents" sx={{ fontSize: '0.75rem' }}>Recents</MenuItem>
            <MenuItem value="week" sx={{ fontSize: '0.75rem' }}>Last Week</MenuItem>
            <MenuItem value="month" sx={{ fontSize: '0.75rem' }}>Last Month</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E20074" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#E20074" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#999' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#999' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, padding: '4px 8px', borderRadius: 4 }}
              itemStyle={{ color: '#E20074' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#E20074"
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#E20074' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
