import { useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';

export const ServiceLogForm = () => {
  const [engineer, setEngineer] = useState('');
  const [purpose, setPurpose] = useState('Preventive');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const log = { engineer, purpose, notes, date };
    console.log('Service Log:', log);
    alert('Service Log Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Engineer Name" value={engineer} onChange={(e) => setEngineer(e.target.value)} fullWidth required />
      <TextField select label="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} fullWidth>
        <MenuItem value="Preventive">Preventive</MenuItem>
        <MenuItem value="Breakdown">Breakdown</MenuItem>
      </TextField>
      <TextField label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} fullWidth multiline rows={3} />
      <TextField type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Log Visit</Button>
    </form>
  );
};
