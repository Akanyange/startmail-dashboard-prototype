import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface CardProps {
  title: string;
  value: number;
  subtitle: string;
  footerLink?: string;
  icon?: React.ReactNode;
}

function MetricCard({ title, value, subtitle, footerLink, icon }: CardProps) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 1.5,
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.25,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500} lineHeight={1.4} fontSize="0.7rem">
          {title}
        </Typography>
        <Box sx={{ color: '#bbb', mt: 0.25 }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h5" fontWeight={700} lineHeight={1.2} sx={{ mt: 0.25 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary" fontSize="0.65rem">
        {subtitle}
      </Typography>
      {footerLink && (
        <Link href="#" underline="hover" sx={{ fontSize: '0.65rem', color: '#E20074', mt: 0.5 }}>
          {footerLink}
        </Link>
      )}
    </Paper>
  );
}

export default function AnalyticsCards() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
      <Box sx={{ display: 'flex', gap: 1.5, flex: 1 }}>
        <MetricCard
          title="Total Tenders"
          value={70}
          subtitle="increase since last month"
          icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
        />
        <MetricCard
          title="Total Screened Tenders"
          value={64}
          subtitle="increase since last month"
          icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5, flex: 1 }}>
        <MetricCard
          title="Total Sent E-mails"
          value={50}
          subtitle="increase since last month"
          icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
        />
        <MetricCard
          title="Drafts"
          value={14}
          subtitle="increase since last month"
          footerLink="Pick up where you left off"
          icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
        />
      </Box>
    </Box>
  );
}
