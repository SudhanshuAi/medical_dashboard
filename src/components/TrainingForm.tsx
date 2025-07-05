import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export interface TrainingLog {
    id: string;
    installationId: string;
    traineeName: string;
    trainingDate: string;
    feedback: string;
}

export type NewTrainingLog = Omit<TrainingLog, 'id'>;

interface Props {
    onSubmit: (trainingLog: Omit<NewTrainingLog, 'installationId'>) => void;
}

export const TrainingForm = ({ onSubmit }: Props) => {
    const [formData, setFormData] = useState({
        traineeName: '',
        trainingDate: '',
        feedback: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
                name="traineeName"
                label="Trainee Name"
                value={formData.traineeName}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                name="trainingDate"
                type="date"
                label="Training Date"
                value={formData.trainingDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField
                name="feedback"
                label="Feedback / Notes"
                value={formData.feedback}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Training Log
            </Button>
        </Box>
    );
};
