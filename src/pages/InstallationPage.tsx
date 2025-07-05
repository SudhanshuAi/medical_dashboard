import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Dialog, DialogTitle, DialogContent, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';

import { InstallationForm } from '../components/InstallationForm';
import { TrainingForm } from '../components/TrainingForm';
import { addInstallation, updateInstallation, deleteInstallation } from '../features/installationsSlice';
import { addTrainingLog } from '../features/trainingSlice';
import type { RootState } from '../store';
import type { NewInstallation } from '../features/installationsSlice';
import type { Installation } from '../components/InstallationForm';
import type { NewTrainingLog } from '../components/TrainingForm';

const InstallationPage = () => {
    const dispatch = useDispatch();
        const { installations } = useSelector((state: RootState) => state.installations);
    const { logs: trainingLogs } = useSelector((state: RootState) => state.training);

    const [installationFormOpen, setInstallationFormOpen] = useState(false);
    const [trainingFormOpen, setTrainingFormOpen] = useState(false);
    const [selectedInstallationId, setSelectedInstallationId] = useState<string | null>(null);
    const [editingInstallation, setEditingInstallation] = useState<Installation | null>(null);

        const handleOpenInstallationForm = () => {
        setEditingInstallation(null);
        setInstallationFormOpen(true);
    };

        const handleCloseForms = () => {
        setInstallationFormOpen(false);
        setTrainingFormOpen(false);
        setSelectedInstallationId(null);
        setEditingInstallation(null);
    };

        const handleInstallationSubmit = (installationData: NewInstallation | Installation) => {
        if ('id' in installationData && editingInstallation) {
            dispatch(updateInstallation(installationData as Installation));
        } else {
            dispatch(addInstallation(installationData as NewInstallation));
        }
        handleCloseForms();
    };

    const handleEdit = (installation: Installation) => {
        setEditingInstallation(installation);
        setInstallationFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this installation log?')) {
            dispatch(deleteInstallation(id));
        }
    };

    const handleOpenTrainingForm = (installationId: string) => {
        setSelectedInstallationId(installationId);
        setTrainingFormOpen(true);
    };

    const handleTrainingSubmit = (trainingLog: Omit<NewTrainingLog, 'installationId'>) => {
        if (selectedInstallationId) {
            dispatch(addTrainingLog(trainingLog, selectedInstallationId));
            handleCloseForms();
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Installations
                </Typography>
                <Button variant="contained" onClick={handleOpenInstallationForm}>
                    Log Installation
                </Button>
            </Box>
            {/* Installation Form Dialog */}
            <Dialog open={installationFormOpen} onClose={handleCloseForms}>
                <DialogTitle>{editingInstallation ? 'Edit Installation' : 'Log New Installation'}</DialogTitle>
                <DialogContent>
                    <InstallationForm onSubmit={handleInstallationSubmit} initialData={editingInstallation} />
                </DialogContent>
            </Dialog>

            {/* Training Form Dialog */}
            <Dialog open={trainingFormOpen} onClose={handleCloseForms}>
                <DialogTitle>Log Training Session</DialogTitle>
                <DialogContent>
                    <TrainingForm onSubmit={handleTrainingSubmit} />
                </DialogContent>
            </Dialog>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {installations.map((inst) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={inst.id}>
                                                <Card className="device-card">
                            <CardContent>
                                <Typography variant="h6">Device ID: {inst.deviceId}</Typography>
                                <Typography color="textSecondary">Facility: {inst.facility}</Typography>
                                <Typography>Installed On: {inst.installationDate}</Typography>
                                {inst.unboxingPhotoUrl && (
                                    <Box sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
                                        <img src={inst.unboxingPhotoUrl} alt="Unboxing" style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8 }} />
                                    </Box>
                                )}
                                {trainingLogs.filter(log => log.installationId === inst.id).map(log => (
                                    <Box key={log.id} sx={{ mt: 1, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                                        <Typography variant="caption">Training: {log.traineeName} on {log.trainingDate}</Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleEdit(inst)}>Edit</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(inst.id)}>Delete</Button>
                                <Button size="small" onClick={() => handleOpenTrainingForm(inst.id)}>Log Training</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default InstallationPage;

