import React, { useMemo } from 'react';

export interface AyoTheme {
  colorPrimary?: string;
  colorPrimaryHover?: string;
  colorPrimaryActive?: string;
  colorPrimarySubtle?: string;
  colorSuccess?: string;
  colorWarning?: string;
  colorDanger?: string;
  colorInfo?: string;
  colorText?: string;
  colorTextMuted?: string;
  colorBorder?: string;
  colorSurface?: string;
  colorSurfaceRaised?: string;
  fontSans?: string;
  fontMono?: string;
  radiusSm?: string;
  radiusMd?: string;
  radiusLg?: string;
  radiusXl?: string;
}

export const TOKEN_MAP: Record<keyof AyoTheme, string> = {
  colorPrimary: '--ayo-color-primary',
  colorPrimaryHover: '--ayo-color-primary-hover',
  colorPrimaryActive: '--ayo-color-primary-active',
  colorPrimarySubtle: '--ayo-color-primary-subtle',
  colorSuccess: '--ayo-color-success',
  colorWarning: '--ayo-color-warning',
  colorDanger: '--ayo-color-danger',
  colorInfo: '--ayo-color-info',
  colorText: '--ayo-color-text',
  colorTextMuted: '--ayo-color-text-muted',
  colorBorder: '--ayo-color-border',
  colorSurface: '--ayo-color-surface',
  colorSurfaceRaised: '--ayo-color-surface-raised',
  fontSans: '--ayo-font-sans',
  fontMono: '--ayo-font-mono',
  radiusSm: '--ayo-radius-sm',
  radiusMd: '--ayo-radius-md',
  radiusLg: '--ayo-radius-lg',
  radiusXl: '--ayo-radius-xl',
};

interface ThemeProviderProps {
  theme?: AyoTheme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const cssVars = useMemo(() => {
    if (!theme) return {};
    return Object.entries(theme).reduce((acc, [key, value]) => {
      const cssVar = TOKEN_MAP[key as keyof AyoTheme];
      if (cssVar && value) {
        acc[cssVar] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  }, [theme]);

  return (
    <div style={cssVars as React.CSSProperties}>
      {children}
    </div>
  );
};
