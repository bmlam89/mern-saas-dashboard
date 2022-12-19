import { CssBaseline, ThemeProvider } from '@mui/core-downloads-tracker';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <h1>
          Hello
        </h1>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
