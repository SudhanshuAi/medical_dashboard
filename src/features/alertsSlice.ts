import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Device } from './inventory/inventorySlice';

export interface Alert {
    id: string;
    severity: 'error' | 'warning' | 'info';
    message: string;
    deviceId: string;
}

interface AlertsState {
    alerts: Alert[];
}

const initialState: AlertsState = {
    alerts: [],
};

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        generateAlerts: (state, action: PayloadAction<Device[]>) => {
            const devices = action.payload;
            const newAlerts: Alert[] = [];

            devices.forEach(device => {
                // Low battery warning
                if (device.battery < 20) {
                    newAlerts.push({
                        id: `${device.id}-battery`,
                        deviceId: device.id,
                        severity: 'warning',
                        message: `Device ${device.id} (${device.type}) battery is at ${device.battery}%.`,
                    });
                }

                // Offline status error
                if (device.status === 'Offline') {
                    newAlerts.push({
                        id: `${device.id}-offline`,
                        deviceId: device.id,
                        severity: 'error',
                        message: `Device ${device.id} (${device.type}) is offline.`,
                    });
                }

                // Expired AMC contract info
                if (device.amcStatus === 'Expired') {
                    newAlerts.push({
                        id: `${device.id}-amc`,
                        deviceId: device.id,
                        severity: 'info',
                        message: `AMC/CMC contract for device ${device.id} (${device.type}) has expired.`,
                    });
                }
            });

            state.alerts = newAlerts;
        },
    },
});

export const { generateAlerts } = alertsSlice.actions;

export const selectAlerts = (state: RootState) => state.alerts.alerts;

export default alertsSlice.reducer;
