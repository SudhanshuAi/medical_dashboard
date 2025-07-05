import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import type { NewInstallation } from '../features/installationsSlice';

export interface Installation {
    id: string;
    deviceId: string;
    facility: string;
    installationDate: string;
    unboxingPhotoUrl: string; 
}

interface Props {
    onSubmit: (installation: NewInstallation | Installation) => void;
    initialData?: Installation | null;
}

export const InstallationForm = ({ onSubmit, initialData }: Props) => {
    const [formData, setFormData] = useState({
        deviceId: '',
        facility: '',
        installationDate: '',
        unboxingPhoto: null as File | null,
    });
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [photoDeleted, setPhotoDeleted] = useState(false);
    const [photoBase64, setPhotoBase64] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                deviceId: initialData.deviceId,
                facility: initialData.facility,
                installationDate: initialData.installationDate,
                unboxingPhoto: null,
            });
            setPhotoPreview(initialData.unboxingPhotoUrl || null);
            setPhotoBase64(initialData.unboxingPhotoUrl || null);
            setPhotoDeleted(false);
        } else {
            setFormData({
                deviceId: '',
                facility: '',
                installationDate: '',
                unboxingPhoto: null,
            });
            setPhotoPreview(null);
            setPhotoBase64(null);
            setPhotoDeleted(false);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, unboxingPhoto: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
                setPhotoBase64(reader.result as string);
                setPhotoDeleted(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePhoto = () => {
        setFormData(prev => ({ ...prev, unboxingPhoto: null }));
        setPhotoPreview(null);
        setPhotoBase64(null);
        setPhotoDeleted(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            const { unboxingPhoto, ...rest } = formData;
            let unboxingPhotoUrl = initialData.unboxingPhotoUrl;
            if (photoDeleted) {
                unboxingPhotoUrl = '';
            } else if (photoBase64) {
                unboxingPhotoUrl = photoBase64;
            }
            onSubmit({ ...rest, id: initialData.id, unboxingPhotoUrl });
        } else {
            onSubmit({ ...formData, unboxingPhotoUrl: photoBase64 || '' });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
                name="deviceId"
                label="Device ID"
                value={formData.deviceId}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                name="facility"
                label="Facility"
                value={formData.facility}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                name="installationDate"
                type="date"
                label="Installation Date"
                value={formData.installationDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
            />
            {photoPreview && (
                <Box sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
                    <img src={photoPreview} alt="Unboxing Preview" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8 }} />
                    <Button color="error" onClick={handleDeletePhoto} sx={{ mt: 1 }}>
                        Delete Photo
                    </Button>
                </Box>
            )}
            <Button
                variant="contained"
                component="label"
                sx={{ mb: 1 }}
            >
                {photoPreview ? 'Replace Unboxing Photo' : 'Upload Unboxing Photo'}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {initialData ? 'Update Installation' : 'Submit Installation'}
            </Button>
        </Box>
    );
};
