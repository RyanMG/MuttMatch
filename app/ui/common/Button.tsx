'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiButton, {ButtonProps} from '@mui/material/Button';
import { ReactNode } from 'react';

// Augment the palette to include new colors
declare module '@mui/material/styles' {
  interface Palette {
    secondary: Palette['primary'];
    primary: Palette['primary'];
    destroy: Palette['primary'];
  }

  interface PaletteOptions {
    secondary?: PaletteOptions['primary'];
    primary?: PaletteOptions['primary'];
    destroy?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include new options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondary: true;
    primary: true;
    destroy: true;
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
    destroy: {
      main: '#701a75',
      light: '#a21caf',
      dark: '#4a044e',
      contrastText: '#FFF',
    },
  },
});

interface IButton extends ButtonProps {
  children: ReactNode;
  type: 'button' | 'submit'
  theme: 'primary' | 'secondary' | 'destroy';
  onClick?: () => void;
}

export default function Button({
  children,
  type,
  theme,
  disabled = false,
  onClick,
  fullWidth = false,
  size = "medium"
}: IButton) {
  return (
    <ThemeProvider theme={customThemes}>
      <MuiButton
        variant="contained"
        type={type}
        color={theme}
        disabled={disabled}
        size={size}
        onClick={() => onClick && onClick()}
        disableElevation
        fullWidth={fullWidth}
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  );
}
