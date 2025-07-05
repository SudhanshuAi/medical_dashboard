import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import type { Device } from '../features/inventory/inventorySlice';
import { useInventorySync } from '../hooks/useInventorySync';

const TrackerPage = () => {
    const { devices, getSyncStatus } = useInventorySync();

    const getStatus = (endDate?: string) => {
        if (!endDate) return <Typography color="text.secondary">N/A</Typography>;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);

        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return <Chip label="Expired" color="error" size="small" />;
        } else if (diffDays <= 30) {
            return <Chip label={`Expiring Soon (${diffDays} days)`} color="warning" size="small" />;
        } else {
            return <Chip label="Active" color="success" size="small" />;
        }
    };

    const getStatusForExport = (endDate?: string): string => {
        if (!endDate) return "N/A";
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return "Expired";
        } else if (diffDays <= 30) {
            return `Expiring Soon (${diffDays} days)`;
        } else {
            return "Active";
        }
    };

    const handleExport = () => {
        const headers = ["Device ID", "Type", "Facility", "Contract", "Start Date", "End Date", "Status"];
        const rows = devices
            .filter(d => d.contract)
            .map(device => [
                `"${device.id}"`,
                `"${device.type}"`,
                `"${device.facility}"`,
                `"${device.contract}"`,
                `"${device.amcStartDate || 'N/A'}"`,
                `"${device.amcEndDate || 'N/A'}"`,
                `"${getStatusForExport(device.amcEndDate)}"`
            ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "amc_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const syncStatus = getSyncStatus();

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Tracker
                </Typography>
                <Button variant="contained" onClick={handleExport}>Export to CSV</Button>
            </Box>

            {/* Summary Cards */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Paper sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                    <Typography variant="h6" color="success.main">{syncStatus.activeContracts}</Typography>
                    <Typography variant="body2">Active Contracts</Typography>
                </Paper>
                <Paper sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                    <Typography variant="h6" color="warning.main">{syncStatus.expiringSoon}</Typography>
                    <Typography variant="body2">Expiring Soon</Typography>
                </Paper>
                <Paper sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                    <Typography variant="h6" color="error">{syncStatus.expiredContracts}</Typography>
                    <Typography variant="body2">Expired</Typography>
                </Paper>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Device ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Facility</TableCell>
                            <TableCell>Contract</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.filter(d => d.contract).map((device: Device) => (
                            <TableRow key={device.id}>
                                <TableCell>{device.id}</TableCell>
                                <TableCell>{device.type}</TableCell>
                                <TableCell>{device.facility}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={device.contract} 
                                        color={device.contract === 'AMC' ? 'primary' : 'secondary'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{device.amcStartDate || 'N/A'}</TableCell>
                                <TableCell>{device.amcEndDate || 'N/A'}</TableCell>
                                <TableCell>{getStatus(device.amcEndDate)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TrackerPage;
