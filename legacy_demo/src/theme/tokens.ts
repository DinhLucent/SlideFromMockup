import type { CSSProperties } from "react";
import type { SlideTheme } from "../content/schema";

export const slideDimensions = {
  width: 1600,
  height: 900
} as const;

export const tokens = {
  colors: {
    bgPaper: "#FBF7F0",
    surface: "#FFFCF7",
    title: "#1F3A6D",
    body: "#334155",
    muted: "#64748B",
    stroke: "rgba(31, 58, 109, 0.12)",
    accentYellow: "#F6C64E",
    accentPeach: "#F7B28B",
    accentCoral: "#E9878D",
    accentLavender: "#A786D8",
    accentGreen: "#97C77A",
    accentSky: "#DDEFFD"
  },
  radius: {
    card: 28,
    panel: 34,
    pill: 999
  },
  shadows: {
    soft: "0 20px 60px rgba(31, 58, 109, 0.08)",
    card: "0 8px 30px rgba(31, 58, 109, 0.06)",
    deck: "0 32px 80px rgba(31, 58, 109, 0.12)"
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
    xxl: 96
  },
  safeArea: {
    top: 60,
    inline: 72,
    bottom: 54
  },
  maxWidth: {
    title: 760,
    body: 600,
    quote: 680,
    citation: 760
  },
  imageScale: {
    base: 1,
    hero: 1.08
  },
  footerOpacity: 0.72,
  typography: {
    heading: "'Plus Jakarta Sans', 'Nunito', 'Segoe UI', sans-serif",
    headingPlayful: "'Baloo 2', 'Nunito', 'Segoe UI', sans-serif",
    body: "'Nunito', 'Segoe UI', sans-serif",
    accent: "'Caveat', 'Brush Script MT', cursive"
  }
} as const;

const slideThemes: Record<
  SlideTheme,
  {
    bg:
      | string
      | undefined;
    panelBg: string;
    textureOpacity: number;
    headingFont: string;
    accent: string;
  }
> = {
  "warm-paper": {
    bg:
      "radial-gradient(circle at 12% 16%, rgba(255,255,255,0.82), transparent 28%), radial-gradient(circle at 88% 22%, rgba(247,178,139,0.24), transparent 24%), linear-gradient(180deg, rgba(255,251,245,0.98), rgba(251,247,240,0.98))",
    panelBg:
      "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,249,241,0.94))",
    textureOpacity: 0.24,
    headingFont: tokens.typography.heading,
    accent: tokens.colors.accentCoral
  },
  "playful-watercolor": {
    bg:
      "radial-gradient(circle at 16% 12%, rgba(255,255,255,0.86), transparent 30%), radial-gradient(circle at 88% 16%, rgba(221,239,253,0.72), transparent 28%), radial-gradient(circle at 78% 84%, rgba(247,178,139,0.26), transparent 24%), linear-gradient(180deg, rgba(255,250,244,0.98), rgba(248,245,239,0.98))",
    panelBg:
      "linear-gradient(160deg, rgba(255,255,255,0.94), rgba(243,248,255,0.88) 42%, rgba(255,244,236,0.92))",
    textureOpacity: 0.28,
    headingFont: tokens.typography.headingPlayful,
    accent: tokens.colors.accentLavender
  },
  "sky-wash": {
    bg:
      "radial-gradient(circle at 14% 12%, rgba(255,255,255,0.88), transparent 30%), radial-gradient(circle at 88% 14%, rgba(221,239,253,0.9), transparent 28%), linear-gradient(180deg, rgba(252,253,255,0.98), rgba(248,250,255,0.98))",
    panelBg:
      "linear-gradient(160deg, rgba(255,255,255,0.96), rgba(238,246,255,0.9) 46%, rgba(255,247,241,0.9))",
    textureOpacity: 0.2,
    headingFont: tokens.typography.heading,
    accent: tokens.colors.accentLavender
  },
  "golden-hour": {
    bg:
      "radial-gradient(circle at 12% 14%, rgba(255,255,255,0.86), transparent 30%), radial-gradient(circle at 84% 18%, rgba(246,198,78,0.18), transparent 20%), radial-gradient(circle at 78% 82%, rgba(247,178,139,0.26), transparent 24%), linear-gradient(180deg, rgba(255,251,244,0.98), rgba(255,247,238,0.98))",
    panelBg:
      "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,248,236,0.92) 48%, rgba(255,240,229,0.9))",
    textureOpacity: 0.24,
    headingFont: tokens.typography.heading,
    accent: tokens.colors.accentCoral
  },
  "quiet-reference": {
    bg:
      "linear-gradient(180deg, rgba(255,252,247,0.99), rgba(251,247,240,0.99))",
    panelBg:
      "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(251,247,240,0.92))",
    textureOpacity: 0.14,
    headingFont: tokens.typography.heading,
    accent: tokens.colors.accentLavender
  }
};

export function themeVars(): CSSProperties {
  return {
    "--slide-width": `${slideDimensions.width}px`,
    "--slide-height": `${slideDimensions.height}px`,
    "--bg-paper": tokens.colors.bgPaper,
    "--surface": tokens.colors.surface,
    "--text-title": tokens.colors.title,
    "--text-body": tokens.colors.body,
    "--text-muted": tokens.colors.muted,
    "--stroke": tokens.colors.stroke,
    "--accent-yellow": tokens.colors.accentYellow,
    "--accent-peach": tokens.colors.accentPeach,
    "--accent-coral": tokens.colors.accentCoral,
    "--accent-lavender": tokens.colors.accentLavender,
    "--accent-green": tokens.colors.accentGreen,
    "--accent-sky": tokens.colors.accentSky,
    "--radius-card": `${tokens.radius.card}px`,
    "--radius-panel": `${tokens.radius.panel}px`,
    "--radius-pill": `${tokens.radius.pill}px`,
    "--shadow-soft": tokens.shadows.soft,
    "--shadow-card": tokens.shadows.card,
    "--shadow-deck": tokens.shadows.deck,
    "--space-xs": `${tokens.spacing.xs}px`,
    "--space-sm": `${tokens.spacing.sm}px`,
    "--space-md": `${tokens.spacing.md}px`,
    "--space-lg": `${tokens.spacing.lg}px`,
    "--space-xl": `${tokens.spacing.xl}px`,
    "--space-2xl": `${tokens.spacing.xxl}px`,
    "--safe-top": `${tokens.safeArea.top}px`,
    "--safe-inline": `${tokens.safeArea.inline}px`,
    "--safe-bottom": `${tokens.safeArea.bottom}px`,
    "--max-title-width": `${tokens.maxWidth.title}px`,
    "--max-body-width": `${tokens.maxWidth.body}px`,
    "--max-quote-width": `${tokens.maxWidth.quote}px`,
    "--max-citation-width": `${tokens.maxWidth.citation}px`,
    "--image-scale-base": String(tokens.imageScale.base),
    "--image-scale-hero": String(tokens.imageScale.hero),
    "--footer-opacity": String(tokens.footerOpacity),
    "--font-heading": tokens.typography.heading,
    "--font-heading-playful": tokens.typography.headingPlayful,
    "--font-body": tokens.typography.body,
    "--font-accent": tokens.typography.accent
  } as CSSProperties;
}

export function slideThemeVars(theme: SlideTheme, footerOpacity?: number): CSSProperties {
  const preset = slideThemes[theme];

  return {
    "--slide-bg": preset.bg,
    "--slide-panel-bg": preset.panelBg,
    "--slide-heading-font": preset.headingFont,
    "--slide-accent": preset.accent,
    "--slide-texture-opacity": String(preset.textureOpacity),
    "--slide-footer-opacity": String(footerOpacity ?? tokens.footerOpacity)
  } as CSSProperties;
}
