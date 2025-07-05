import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppRoutes } from './routes/AppRoutes';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes toggleTheme={toggleTheme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
