'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import UploadIcon from '@mui/icons-material/Upload';

interface Tender {
  name: string;
  answered: string;
  city: string;
  region: string;
  firma: string;
  status: 'Unprocessed' | 'Contacted' | 'Pending';
}

const tenders: Tender[] = [
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'FMC', status: 'Unprocessed' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'FMC', status: 'Contacted' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'TSG', status: 'Unprocessed' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'FMC', status: 'Pending' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'TSG', status: 'Unprocessed' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'FMC', status: 'Contacted' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'TSG', status: 'Contacted' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'FMC', status: 'Pending' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'TSG', status: 'Unprocessed' },
  { name: 'Fiber Optic Expansion - Munich', answered: 'June 3rd, 2025', city: 'Munich', region: 'North Region', firma: 'FMC', status: 'Contacted' },
];

const statusStyle: Record<Tender['status'], { bg: string; color: string }> = {
  Unprocessed: { bg: '#FFF3E0', color: '#E65100' },
  Contacted:   { bg: '#E8F5E9', color: '#2E7D32' },
  Pending:     { bg: '#E3F2FD', color: '#1565C0' },
};

const filterSelectSx = {
  fontSize: '0.75rem',
  height: 32,
  bgcolor: '#fff',
  '& .MuiSelect-select': { py: '5px', px: '10px', display: 'flex', alignItems: 'center', gap: '6px' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
};

export default function TenderTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('unprocessed');
  const [cityFilter, setCityFilter] = useState('all');
  const [portalFilter, setPortalFilter] = useState('all');

  const filtered = tenders.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper elevation={1} sx={{ mt: 2 }}>
      {/* Section header */}
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} fontSize="0.9rem">
          Ausschreibungsdaten
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<UploadIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: 'none',
            fontSize: '0.75rem',
            borderColor: '#E20074',
            color: '#E20074',
            '&:hover': { bgcolor: '#fce4ef', borderColor: '#E20074' },
          }}
        >
          Ausschreibungsdaten hochladen
        </Button>
      </Box>

      {/* Filters row */}
      <Box sx={{ px: 2, py: 1.25, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: '#bbb' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 200,
            '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.6 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
          }}
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={filterSelectSx}
        >
          <MenuItem value="unprocessed" sx={{ fontSize: '0.75rem' }}>Unprocessed</MenuItem>
          <MenuItem value="contacted" sx={{ fontSize: '0.75rem' }}>Contacted</MenuItem>
          <MenuItem value="pending" sx={{ fontSize: '0.75rem' }}>Pending</MenuItem>
          <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>All</MenuItem>
        </Select>

        <Select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          size="small"
          displayEmpty
          renderValue={(v) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FilterListIcon sx={{ fontSize: 14 }} />
              {v === 'all' ? 'Filter by City' : v}
            </Box>
          )}
          sx={filterSelectSx}
        >
          <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>All Cities</MenuItem>
          <MenuItem value="Munich" sx={{ fontSize: '0.75rem' }}>Munich</MenuItem>
          <MenuItem value="Berlin" sx={{ fontSize: '0.75rem' }}>Berlin</MenuItem>
        </Select>

        <Select
          value={portalFilter}
          onChange={(e) => setPortalFilter(e.target.value)}
          size="small"
          displayEmpty
          renderValue={(v) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FilterListIcon sx={{ fontSize: 14 }} />
              {v === 'all' ? 'Filter by Portal' : v}
            </Box>
          )}
          sx={filterSelectSx}
        >
          <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>All Portals</MenuItem>
          <MenuItem value="FMC" sx={{ fontSize: '0.75rem' }}>FMC</MenuItem>
          <MenuItem value="TSG" sx={{ fontSize: '0.75rem' }}>TSG</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: '#fafafa',
                '& th': {
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: '#555',
                  borderBottom: '1px solid #eee',
                  py: 1,
                },
              }}
            >
              <TableCell>Tender Name</TableCell>
              <TableCell>Answered</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Firma</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row, i) => (
              <TableRow
                key={i}
                hover
                sx={{
                  '& td': { fontSize: '0.75rem', py: 0.75, borderBottom: '1px solid #f5f5f5' },
                  '&:hover': { bgcolor: '#fafafa' },
                }}
              >
                <TableCell>
                  <Typography
                    component="span"
                    sx={{ color: '#1565C0', fontSize: '0.75rem', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: '#666' }}>{row.answered}</TableCell>
                <TableCell sx={{ color: '#333' }}>{row.city}</TableCell>
                <TableCell sx={{ color: '#333' }}>{row.region}</TableCell>
                <TableCell sx={{ color: '#333' }}>{row.firma}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: statusStyle[row.status].bg,
                      color: statusStyle[row.status].color,
                      fontSize: '0.65rem',
                      height: 20,
                      fontWeight: 500,
                      borderRadius: '4px',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      bgcolor: '#E20074',
                      fontSize: '0.65rem',
                      px: 1.25,
                      py: 0.25,
                      textTransform: 'none',
                      minWidth: 'unset',
                      borderRadius: '4px',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: '#C0005E', boxShadow: 'none' },
                    }}
                  >
                    Generate Mail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          10 row per page
        </Typography>
        <Typography variant="caption" color="text.secondary">
          1 - 10 of 335 &nbsp; &lt; &nbsp; &gt;
        </Typography>
      </Box>
    </Paper>
  );
}
