import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { Inventory, Build, Assessment, PhotoCamera, Notifications, Assignment } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Header } from './Header';

const drawerWidth = 240;

interface DashboardLayoutProps {
    children: React.ReactNode;
    toggleTheme: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, toggleTheme }) => {
    const navItems = [
        { text: 'Inventory', icon: <Inventory />, path: '/' },
        { text: 'Installations', icon: <Build />, path: '/installations' },
        { text: 'Service Visits', icon: <Assessment />, path: '/service-visits' },
        { text: 'Photo Logs', icon: <PhotoCamera />, path: '/photo-logs' },
        { text: 'Alerts', icon: <Notifications />, path: '/alerts' },
        { text: 'Tracker', icon: <Assignment />, path: '/tracker' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Header title="Management Dashboard" toggleTheme={toggleTheme} />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {navItems.slice(0, 2).map((item) => (
                            <ListItem key={item.text} disablePadding component={Link} to={item.path}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {navItems.slice(2).map((item) => (
                            <ListItem key={item.text} disablePadding component={Link} to={item.path}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};
