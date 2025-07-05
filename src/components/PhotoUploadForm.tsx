import { useState, useEffect } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

export interface PhotoLog {
    id: string;
    facilityId: string;
    caption: string;
    imageUrl: string;
    uploadDate: string;
}

export type NewPhotoLog = Omit<PhotoLog, 'id' | 'imageUrl' | 'uploadDate'> & { image: File };

interface Props {
    facilities?: { id: string; name: string }[];
    onSubmit: (data: NewPhotoLog | { id: string; caption: string }) => void;
    initialData?: PhotoLog | null;
}

export const PhotoUploadForm = ({ facilities = [], onSubmit, initialData = null }: Props) => {
        const [facilityId, setFacilityId] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (initialData) {
            setCaption(initialData.caption);
            setFacilityId(initialData.facilityId);
        }
    }, [initialData]);

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFacilityId(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSubmit({ id: initialData.id, caption });
        } else if (facilityId && image) {
            onSubmit({ facilityId, caption, image });
        }
    };

        if (initialData) {
        return (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                <TextField name="caption" label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} fullWidth autoFocus />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Caption
                </Button>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth required>
                <InputLabel>Facility</InputLabel>
                <Select name="facilityId" value={facilityId} label="Facility" onChange={handleSelectChange}>
                    {facilities.map(f => (
                        <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField name="caption" label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} fullWidth />
            <Button variant="contained" component="label">
                Choose Image
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {image && <Typography variant="body2">Selected: {image.name}</Typography>}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!facilityId || !image}>
                Upload Photo
            </Button>
        </Box>
    );
};
