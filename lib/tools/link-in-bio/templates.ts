import { StyleConfig } from './types';

export interface Template {
  key: string;
  label: string;
  style: StyleConfig;
}

export const templates: Template[] = [
  {
    key: 'clean',
    label: 'Clean',
    style: {
      background: { type: 'solid', color1: '#ffffff', color2: '#ffffff', imageUrl: '' },
      button: { color: '#111111', textColor: '#ffffff', style: 'rounded', fill: 'filled', shadow: 'none' },
      text: { font: 'Inter', nameColor: '#111111', nameSize: 28, bioColor: '#555555' },
      layout: { maxWidth: 480, spacing: 12, buttonWidth: 'full' },
      iconColor: '#ffffff',
      socialIconColor: '#555555',
    },
  },
  {
    key: 'bold',
    label: 'Bold',
    style: {
      background: { type: 'solid', color1: '#111111', color2: '#111111', imageUrl: '' },
      button: { color: '#ffffff', textColor: '#111111', style: 'square', fill: 'filled', shadow: 'none' },
      text: { font: 'Space Grotesk', nameColor: '#ffffff', nameSize: 32, bioColor: '#aaaaaa' },
      layout: { maxWidth: 480, spacing: 14, buttonWidth: 'full' },
      iconColor: '#ffffff',
      socialIconColor: '#ffffff',
    },
  },
  {
    key: 'soft',
    label: 'Soft',
    style: {
      background: { type: 'solid', color1: '#faf5f0', color2: '#faf5f0', imageUrl: '' },
      button: { color: '#c9a87c', textColor: '#ffffff', style: 'pill', fill: 'filled', shadow: 'small' },
      text: { font: 'DM Sans', nameColor: '#3d2e1e', nameSize: 26, bioColor: '#7a6b5d' },
      layout: { maxWidth: 460, spacing: 12, buttonWidth: 'full' },
      iconColor: '#ffffff',
      socialIconColor: '#7a6b5d',
    },
  },
  {
    key: 'dark',
    label: 'Dark',
    style: {
      background: { type: 'solid', color1: '#0a0a0a', color2: '#0a0a0a', imageUrl: '' },
      button: { color: '#1a1a1a', textColor: '#e0e0e0', style: 'rounded', fill: 'filled', shadow: 'small' },
      text: { font: 'Inter', nameColor: '#f5f5f5', nameSize: 28, bioColor: '#888888' },
      layout: { maxWidth: 480, spacing: 12, buttonWidth: 'full' },
      iconColor: '#e0e0e0',
      socialIconColor: '#e0e0e0',
    },
  },
  {
    key: 'minimal',
    label: 'Minimal',
    style: {
      background: { type: 'solid', color1: '#f8f8f8', color2: '#f8f8f8', imageUrl: '' },
      button: { color: '#333333', textColor: '#333333', style: 'rounded', fill: 'outline', shadow: 'none' },
      text: { font: 'Inter', nameColor: '#222222', nameSize: 24, bioColor: '#777777' },
      layout: { maxWidth: 440, spacing: 10, buttonWidth: 'full' },
      iconColor: '#333333',
      socialIconColor: '#777777',
    },
  },
  {
    key: 'gradient',
    label: 'Gradient',
    style: {
      background: { type: 'gradient', color1: '#667eea', color2: '#764ba2', imageUrl: '' },
      button: { color: 'rgba(255,255,255,0.2)', textColor: '#ffffff', style: 'pill', fill: 'filled', shadow: 'none' },
      text: { font: 'Poppins', nameColor: '#ffffff', nameSize: 28, bioColor: 'rgba(255,255,255,0.8)' },
      layout: { maxWidth: 480, spacing: 12, buttonWidth: 'full' },
      iconColor: '#ffffff',
      socialIconColor: '#ffffff',
    },
  },
  {
    key: 'neon',
    label: 'Neon',
    style: {
      background: { type: 'solid', color1: '#0d0d0d', color2: '#0d0d0d', imageUrl: '' },
      button: { color: '#00ff88', textColor: '#0d0d0d', style: 'rounded', fill: 'filled', shadow: 'medium' },
      text: { font: 'Space Grotesk', nameColor: '#00ff88', nameSize: 28, bioColor: '#66ffbb' },
      layout: { maxWidth: 480, spacing: 14, buttonWidth: 'full' },
      iconColor: '#00ff88',
      socialIconColor: '#00ff88',
    },
  },
  {
    key: 'warm',
    label: 'Warm',
    style: {
      background: { type: 'gradient', color1: '#ff9a9e', color2: '#fad0c4', imageUrl: '' },
      button: { color: '#ffffff', textColor: '#d4526e', style: 'pill', fill: 'filled', shadow: 'small' },
      text: { font: 'DM Sans', nameColor: '#ffffff', nameSize: 28, bioColor: 'rgba(255,255,255,0.85)' },
      layout: { maxWidth: 460, spacing: 12, buttonWidth: 'full' },
      iconColor: '#ffffff',
      socialIconColor: '#ffffff',
    },
  },
  {
    key: 'ocean',
    label: 'Ocean',
    style: {
      background: { type: 'gradient', color1: '#0f2027', color2: '#2c5364', imageUrl: '' },
      button: { color: 'rgba(255,255,255,0.15)', textColor: '#e0f0ff', style: 'rounded', fill: 'filled', shadow: 'none' },
      text: { font: 'Inter', nameColor: '#e0f0ff', nameSize: 28, bioColor: 'rgba(224,240,255,0.7)' },
      layout: { maxWidth: 480, spacing: 12, buttonWidth: 'full' },
      iconColor: '#e0f0ff',
      socialIconColor: '#e0f0ff',
    },
  },
  {
    key: 'elegant',
    label: 'Elegant',
    style: {
      background: { type: 'solid', color1: '#1a1a2e', color2: '#1a1a2e', imageUrl: '' },
      button: { color: '#d4a847', textColor: '#1a1a2e', style: 'pill', fill: 'filled', shadow: 'small' },
      text: { font: 'Playfair Display', nameColor: '#d4a847', nameSize: 30, bioColor: '#b0a090' },
      layout: { maxWidth: 460, spacing: 14, buttonWidth: 'full' },
      iconColor: '#d4a847',
      socialIconColor: '#d4a847',
    },
  },
];
