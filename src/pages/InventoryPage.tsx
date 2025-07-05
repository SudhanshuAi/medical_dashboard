import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { useState } from 'react';
import {
    type Device,
    addDevice,
    updateDevice,
    deleteDevice
} from '../features/inventory/inventorySlice';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Chip,
    Button
} from '@mui/material';

import { Box } from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import { DeviceForm } from '../components/DeviceForm';
import '../styles/InventoryPage.scss';

const InventoryPage = () => {
    const dispatch = useDispatch();
    const devices = useSelector((state: RootState) => state.inventory.devices);
    const [editingDevice, setEditingDevice] = useState<Device | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAdd = (device: Device) => {
        dispatch(addDevice(device));
        setShowForm(false);
    };

    const handleUpdate = (device: Device) => {
        dispatch(updateDevice(device));
        setEditingDevice(null);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteDevice(id));
    };

    const handleOpenForm = () => {
        setEditingDevice(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingDevice(null);
    };

    const handleEdit = (device: Device) => {
        setEditingDevice(device);
        setShowForm(true);
    };

    const handleSubmit = (device: Device) => {
        if (editingDevice) {
            handleUpdate(device);
        } else {
            handleAdd(device);
        }
        handleCloseForm();
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Device Inventory
                </Typography>
                <Button variant="contained" onClick={handleOpenForm}>
                    Add New Device
                </Button>
            </Box>
            
            <Dialog open={showForm} onClose={handleCloseForm}>
                <DialogTitle>{editingDevice ? 'Edit Device' : 'Add New Device'}</DialogTitle>
                <DialogContent>
                    <DeviceForm
                        initialValues={editingDevice}
                        onSubmit={handleSubmit}
                        isEdit={!!editingDevice}
                    />
                </DialogContent>
            </Dialog>

            <Grid container spacing={3}>
                {devices.map((device) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={device.id}>
                        <Card className="device-card">
                            <CardContent>
                                <Typography variant="h6">{device.type}</Typography>
                                <Typography color="textSecondary" gutterBottom>ID: {device.id}</Typography>
                                <Typography variant="body2">Facility: {device.facility}</Typography>
                                <Typography variant="body2">Status: {device.status}</Typography>
                                <Typography variant="body2">Battery: {device.battery}%</Typography>
                                <Typography variant="body2">Last Service: {device.lastServiceDate}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                  <Typography variant="body2" sx={{ mr: 1 }}>AMC Status:</Typography>
                                  <Chip 
                                      label={device.amcStatus} 
                                      color={device.amcStatus === 'Active' ? 'success' : device.amcStatus === 'Expired' ? 'error' : 'default'} 
                                      size="small" 
                                  />
                                </Box>
                                {device.amcStartDate && (
                                    <Typography variant="caption" display="block" sx={{ mt: 1}}>
                                        Contract: {device.amcStartDate} to {device.amcEndDate}
                                    </Typography>
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <IconButton onClick={() => handleEdit(device)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(device.id)}>
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default InventoryPage;
