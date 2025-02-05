'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { ReactNode } from 'react';

// Augment the palette to include new colors
declare module '@mui/material/styles' {
  interface Palette {
    secondary: Palette['primary'];
    primary: Palette['primary'];
  }

  interface PaletteOptions {
    secondary?: PaletteOptions['primary'];
    primary?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include new options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondary: true;
    primary: true;
  }
}

const customThemes = createTheme({
  palette: {
    primary: {
      main: '#fb923c',
      light: '#fdba74',
      dark: '#f97316',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#312e81',
      light: '#3730a3',
      dark: '#1e1b4b',
      contrastText: '#FFF',
    },
  },
});

interface IButton {
  children: ReactNode;
  type: 'button' | 'submit'
  theme: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type,
  theme,
  disabled = false,
  onClick
}: IButton) {
  return (
    <ThemeProvider theme={customThemes}>
      <MuiButton
        variant="contained"
        type={type}
        color={theme}
        disabled={disabled}
        onClick={() => onClick && onClick()}
        disableElevation
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  );
}
