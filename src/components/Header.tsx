import { Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface HeaderProps {
    title: string;
    toggleTheme: () => void;
    onAdd?: () => void;
    addButtonLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, toggleTheme, onAdd, addButtonLabel = 'Add New' }) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" component="h1" noWrap>
                {title}
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {onAdd && (
                    <Button variant="contained" onClick={onAdd} sx={{ mr: 1 }}>
                        {addButtonLabel}
                    </Button>
                )}
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>
        </Box>
    );
};
