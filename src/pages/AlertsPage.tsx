import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, List, ListItem, ListItemText, Paper, Chip, Typography } from '@mui/material';

import { generateAlerts, selectAlerts } from '../features/alertsSlice';
import type { RootState } from '../store';

const AlertsPage = () => {
    const dispatch = useDispatch();
    const alerts = useSelector(selectAlerts);
    const devices = useSelector((state: RootState) => state.inventory.devices);

    useEffect(() => {
        dispatch(generateAlerts(devices));
    }, [devices, dispatch]);

    const getChipColor = (severity: 'error' | 'warning' | 'info') => {
        return severity;
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                System Alerts
            </Typography>
            {alerts.length > 0 ? (
                <Paper elevation={3}>
                    <List>
                        {alerts.map(alert => (
                            <ListItem key={alert.id} divider>
                                <ListItemText 
                                    primary={alert.message} 
                                    secondary={<Chip label={alert.severity.toUpperCase()} color={getChipColor(alert.severity)} size="small" sx={{ mt: 1 }} />} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Typography>No system alerts at the moment.</Typography>
            )}
        </Box>
    );
};

export default AlertsPage;
