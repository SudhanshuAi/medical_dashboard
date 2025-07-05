import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Dialog, DialogTitle, DialogContent, Grid, Card, CardActions, CardContent, Typography, Chip, Button } from '@mui/material';
import { ServiceVisitForm } from '../components/ServiceVisitForm';
import { addServiceVisit, updateServiceVisit, deleteServiceVisit } from '../features/serviceVisitsSlice';
import type { RootState } from '../store';
import type { NewServiceVisit, ServiceVisit } from '../components/ServiceVisitForm';

const ServiceVisitPage = () => {
    const dispatch = useDispatch();
    const { visits } = useSelector((state: RootState) => state.serviceVisits);
    const [open, setOpen] = useState(false);
    const [editingVisit, setEditingVisit] = useState<ServiceVisit | null>(null);

    const handleOpenForm = () => {
        setEditingVisit(null);
        setOpen(true);
    };

    const handleCloseForm = () => {
        setOpen(false);
        setEditingVisit(null);
    };

    const handleEdit = (visit: ServiceVisit) => {
        setEditingVisit(visit);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this service visit?')) {
            dispatch(deleteServiceVisit(id));
        }
    };

    const handleSubmit = (visitData: NewServiceVisit | ServiceVisit) => {
        if ('id' in visitData) {
            dispatch(updateServiceVisit({ ...visitData, attachments: visitData.attachments || [] } as ServiceVisit));
        } else {
            dispatch(addServiceVisit({ ...visitData, attachments: visitData.attachments || [] } as NewServiceVisit));
        }
        handleCloseForm();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Service Visits
                </Typography>
                <Button variant="contained" onClick={handleOpenForm}>
                    Log Visit
                </Button>
            </Box>

            <Dialog open={open} onClose={handleCloseForm}>
                <DialogTitle>{editingVisit ? 'Edit Service Visit' : 'Log New Service Visit'}</DialogTitle>
                <DialogContent>
                    <ServiceVisitForm onSubmit={handleSubmit} initialData={editingVisit} />
                </DialogContent>
            </Dialog>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                {visits.map((visit: ServiceVisit) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={visit.id}>
                        <Card className="device-card">
                            <CardContent>
                                <Typography variant="h6">Device ID: {visit.deviceId}</Typography>
                                <Typography color="textSecondary">Visited On: {visit.visitDate}</Typography>
                                <Chip label={visit.purpose} color={visit.purpose === 'Breakdown' ? 'error' : 'info'} size="small" sx={{ my: 1 }} />
                                <Typography variant="body2">Notes: {visit.notes}</Typography>
                                {visit.attachments.length > 0 && (
                                    <Typography variant="caption">Attachments: {visit.attachments.length}</Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleEdit(visit)}>Edit</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(visit.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ServiceVisitPage;

