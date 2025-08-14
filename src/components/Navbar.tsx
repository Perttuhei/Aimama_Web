import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Switch,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import { lightTheme, darkTheme, type AppColors, applyTheme } from '../values/appColors.tsx'; 
import { useLanguage } from '../utils/LangProvider.tsx';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentTheme, setCurrentTheme] = useState<AppColors>(darkTheme);
  const { translations, setLanguage, lang } = useLanguage();

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeSwitch = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  const handleLanguageSwitch = () => {
    setLanguage(lang === 'fi' ? 'en' : 'fi');
  };

  const isDarkMode = currentTheme === darkTheme;

  return (
    <>
      <AppBar position="static" 
      elevation={0}
      className='navbar-app-bar'
      sx={{
        background: "none",
        boxShadow: 'none',
      }}>
        <Toolbar className="navbar-toolbar">
            <Typography 
            variant='h4'
            sx={{ 
                whiteSpace: 'nowrap',
                color: currentTheme.primaryColor, 
                '&:hover': { color: currentTheme.primaryLight }}}
                >{translations.navbar.aiAssistant}</Typography>

            
            {!isMobile && (
            <Box className="navbar-buttons-box">
              <Button 
                className="navbar-button"
                sx={{ 
                whiteSpace: 'nowrap',
                color: currentTheme.textPrimary,
                '&:hover': { color: currentTheme.primaryColor }}} onClick={() => navigate('/')}>{translations.navbar.home}</Button>

              <Button 
                className="navbar-button"
                sx={{ 
                whiteSpace: 'nowrap',
                color: currentTheme.textPrimary,
                '&:hover': { color: currentTheme.primaryColor }}} onClick={() => navigate('/chat')}>{translations.navbar.chat}</Button>

              <Switch checked={!isDarkMode} onChange={handleThemeSwitch} />
              <Button 
                className="navbar-button"
                sx={{ 
                whiteSpace: 'nowrap',
                color: currentTheme.textPrimary,
                '&:hover': { color: currentTheme.primaryColor }}}
                onClick={handleLanguageSwitch}>
                {lang === 'fi' ? ' 🌎 FI' : '🌎 EN'}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
