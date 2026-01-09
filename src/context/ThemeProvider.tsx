import { useEffect, ReactNode } from 'react';
import { useWeddingData } from './WeddingDataContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { data } = useWeddingData();

  useEffect(() => {
    // Apply theme colors as CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', data.theme.primaryColor);
    root.style.setProperty('--color-secondary', data.theme.secondaryColor);
    root.style.setProperty('--color-accent', data.theme.accentColor);
    
    // Generate lighter/darker variants
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const primary = hexToRgb(data.theme.primaryColor);
    const secondary = hexToRgb(data.theme.secondaryColor);
    const accent = hexToRgb(data.theme.accentColor);

    // Set RGB values for opacity usage
    root.style.setProperty('--color-primary-rgb', `${primary.r}, ${primary.g}, ${primary.b}`);
    root.style.setProperty('--color-secondary-rgb', `${secondary.r}, ${secondary.g}, ${secondary.b}`);
    root.style.setProperty('--color-accent-rgb', `${accent.r}, ${accent.g}, ${accent.b}`);
  }, [data.theme]);

  return <>{children}</>;
}
