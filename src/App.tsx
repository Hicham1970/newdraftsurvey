import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Infos from './pages/Infos';
import DraftSurveyReport from './pages/DraftSurveyReport';
import ValeursInitial from './pages/ValeursInitial';
import ValeursFinal from './pages/ValeursFinal';
import Caracteristiques from './pages/Caracteristiques';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#0a1929',
      paper: '#1a2027',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
      color: '#90caf9',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Infos />} />
                <Route path="/caracteristics" element={<Caracteristiques />} />
                <Route path="/initial-values" element={<ValeursInitial />} />
                <Route path="/final-values" element={<ValeursFinal />} />
                <Route path="/calculation" element={<DraftSurveyReport />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;