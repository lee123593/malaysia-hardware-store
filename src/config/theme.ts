// ============================================================
// 全局主题配置 — 克莱因蓝 (Klein Blue / #002FA7)
// ============================================================

export const theme = {
  // 主色：克莱因蓝
  colors: {
    primary: '#002FA7',
    primaryLight: '#2959C0',
    primaryDark: '#001D6B',
    primaryGlow: '#E8EDFA',

    // 辅助色
    white: '#FFFFFF',
    lightGray: '#F5F5F7',
    gray: '#E8E8ED',
    darkGray: '#86868B',
    softBlack: '#1D1D1F',
    black: '#000000',

    // 强调色
    accentGlow: '#E8EDFA',
    accentSilver: '#D1D1D6',

    // 功能色
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
  },

  // 圆角系统
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },

  // 间距系统
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    section: '64px',
    sectionSm: '32px',
  },

  // 动效时长
  duration: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
  },

  // 阴影系统
  shadow: {
    card: '0 2px 12px rgba(0, 0, 0, 0.06)',
    cardHover: '0 8px 30px rgba(0, 47, 167, 0.12)',
    nav: '0 1px 8px rgba(0, 0, 0, 0.04)',
    button: '0 4px 14px rgba(0, 47, 167, 0.25)',
  },

  // 响应式断点
  breakpoints: {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },

  // 字体
  font: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif',
  },
} as const;

export type Theme = typeof theme;
