'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

export default function TopBar() {
  const [tab, setTab] = useState(0);

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#fff', color: '#333', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ minHeight: '48px !important', px: 2, gap: 2 }}>
        {/* T-Mobile logo */}
        <Box
          sx={{
            bgcolor: '#E20074',
            color: '#fff',
            borderRadius: '50%',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          T
        </Box>
        <Typography variant="caption" fontWeight={600} color="#555" sx={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
          MBfD Assistant
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            minHeight: 48,
            '& .MuiTab-root': { minHeight: 48, fontSize: '0.8rem', textTransform: 'none', py: 0 },
            '& .MuiTabs-indicator': { bgcolor: '#E20074', height: 3 },
            '& .Mui-selected': { color: '#E20074 !important' },
          }}
        >
          <Tab label="StartMail" />
          <Tab label="Concept Document" />
        </Tabs>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton size="small">
          <SettingsIcon sx={{ fontSize: 18, color: '#666' }} />
        </IconButton>
        <Avatar sx={{ width: 28, height: 28, bgcolor: '#E20074', fontSize: '0.75rem' }}>JD</Avatar>
      </Toolbar>
    </AppBar>
  );
}
