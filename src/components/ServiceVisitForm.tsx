import { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export interface ServiceVisit {
    id: string;
    deviceId: string;
    visitDate: string;
    purpose: 'Preventive' | 'Breakdown';
    notes: string;
    attachments: File[];
}

export type NewServiceVisit = Omit<ServiceVisit, 'id'>;

interface Props {
    onSubmit: (visit: NewServiceVisit | ServiceVisit) => void;
    initialData?: ServiceVisit | null;
}

export const ServiceVisitForm = ({ onSubmit, initialData }: Props) => {
    const [formData, setFormData] = useState<NewServiceVisit>({
        deviceId: '',
        visitDate: '',
        purpose: 'Preventive',
        notes: '',
        attachments: [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                deviceId: initialData.deviceId,
                visitDate: initialData.visitDate,
                purpose: initialData.purpose,
                notes: initialData.notes,
                attachments: [], // Attachments are not editable in this form
            });
        } else {
            // Reset form for new entry
            setFormData({
                deviceId: '',
                visitDate: '',
                purpose: 'Preventive',
                notes: '',
                attachments: [],
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData(prev => ({ ...prev, purpose: e.target.value as 'Preventive' | 'Breakdown' }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files || []) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            // When updating, we pass the full visit object back, including the ID.
            // Ensure attachments is always an array.
            onSubmit({ ...formData, id: initialData.id, attachments: initialData.attachments || [] });
        } else {
            onSubmit(formData);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField name="deviceId" label="Device ID" value={formData.deviceId} onChange={handleChange} fullWidth required />
            <TextField name="visitDate" type="date" label="Visit Date" value={formData.visitDate} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required />
            <FormControl fullWidth required>
                <InputLabel>Purpose</InputLabel>
                <Select name="purpose" value={formData.purpose} label="Purpose" onChange={handleSelectChange}>
                    <MenuItem value="Preventive">Preventive</MenuItem>
                    <MenuItem value="Breakdown">Breakdown</MenuItem>
                </Select>
            </FormControl>
            <TextField name="notes" label="Notes" value={formData.notes} onChange={handleChange} fullWidth multiline rows={4} />
            <Button variant="contained" component="label">
                Upload Attachments
                <input type="file" hidden multiple onChange={handleFileChange} />
            </Button>
            {formData.attachments.length > 0 && (
                <Box>{formData.attachments.map(f => f.name).join(', ')}</Box>
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {initialData ? 'Update Visit' : 'Log Service Visit'}
            </Button>
        </Box>
    );
};
