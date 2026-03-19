import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TenderScrapingChart from './components/TenderScrapingChart';
import AnalyticsCards from './components/AnalyticsCards';
import TenderTable from './components/TenderTable';

export default function Home() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        StartMail
      </Typography>

      {/* Top row: chart + analytics cards */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch' }}>
        <Box sx={{ flex: '0 0 55%', minWidth: 0 }}>
          <TenderScrapingChart />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <AnalyticsCards />
        </Box>
      </Box>

      {/* Table */}
      <TenderTable />
    </Box>
  );
}
