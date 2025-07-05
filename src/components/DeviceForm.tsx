import { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Device } from '../features/inventory/inventorySlice';

interface Props {
    initialValues?: Device | null;
    onSubmit: (device: Device) => void;
    isEdit?: boolean;
}

export const DeviceForm = ({ initialValues, onSubmit, isEdit = false }: Props) => {
    const [device, setDevice] = useState<Device>(() => {
        if (initialValues) return initialValues;
        return {
            id: '',
            type: '',
            facility: '',
            status: 'Online',
            battery: 100,
            lastServiceDate: '',
            contract: 'AMC',
            amcStatus: 'Inactive',
            amcStartDate: '',
            amcEndDate: '',
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setDevice(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setDevice(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(device);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField name="id" label="Device ID" value={device.id} onChange={handleChange} fullWidth required disabled={isEdit} />
            <TextField name="type" label="Device Type" value={device.type} onChange={handleChange} fullWidth required />
            <TextField name="facility" label="Facility" value={device.facility} onChange={handleChange} fullWidth required />

            <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={device.status} label="Status" onChange={handleSelectChange}>
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                </Select>
            </FormControl>

            <TextField name="battery" type="number" label="Battery (%)" value={device.battery} onChange={handleChange} fullWidth required InputProps={{ inputProps: { min: 0, max: 100 } }} />
            <TextField name="lastServiceDate" type="date" label="Last Service Date" value={device.lastServiceDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />

            <FormControl fullWidth required>
                <InputLabel>AMC/CMC Status</InputLabel>
                <Select name="amcStatus" value={device.amcStatus} label="AMC/CMC Status" onChange={handleSelectChange}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Expired">Expired</MenuItem>
                </Select>
            </FormControl>

            <TextField name="amcStartDate" type="date" label="AMC Start Date" value={device.amcStartDate || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
            <TextField name="amcEndDate" type="date" label="AMC End Date" value={device.amcEndDate || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />

            <FormControl fullWidth required>
                <InputLabel>Contract</InputLabel>
                <Select name="contract" value={device.contract || ''} label="Contract" onChange={handleSelectChange} required>
                    <MenuItem value="AMC">AMC</MenuItem>
                    <MenuItem value="CMC">CMC</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {isEdit ? 'Update Device' : 'Add Device'}
            </Button>
        </Box>
    );
};
