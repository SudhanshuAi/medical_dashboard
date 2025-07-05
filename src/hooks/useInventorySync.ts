import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useInventorySync = () => {
    const devices = useSelector((state: RootState) => state.inventory.devices);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
    const [isSynced, setIsSynced] = useState(true);

    useEffect(() => {
        setLastUpdate(new Date());
        setIsSynced(true);
        
        // Reset sync status after a brief delay
        const timer = setTimeout(() => {
            setIsSynced(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [devices]);

    const getSyncStatus = () => {
        const devicesWithContracts = devices.filter(d => d.contract);
        const activeContracts = devicesWithContracts.filter(d => {
            if (!d.amcEndDate) return false;
            const now = new Date();
            const end = new Date(d.amcEndDate);
            return end > now;
        });
        const expiringSoon = activeContracts.filter(d => {
            if (!d.amcEndDate) return false;
            const now = new Date();
            const end = new Date(d.amcEndDate);
            const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            return diffDays <= 30;
        });
        const expiredContracts = devicesWithContracts.filter(d => {
            if (!d.amcEndDate) return false;
            const now = new Date();
            const end = new Date(d.amcEndDate);
            return end <= now;
        });

        return {
            totalDevices: devices.length,
            devicesWithContracts: devicesWithContracts.length,
            activeContracts: activeContracts.length,
            expiringSoon: expiringSoon.length,
            expiredContracts: expiredContracts.length,
            lastUpdate,
            isSynced
        };
    };

    return {
        devices,
        getSyncStatus,
        lastUpdate,
        isSynced
    };
}; 