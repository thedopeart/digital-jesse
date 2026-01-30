export interface ProfileElement {
  id: string;
  type: 'profile';
  name: string;
  bio: string;
  photoUrl: string;
  photoShape: 'circle' | 'square' | 'rounded';
}

export interface LinkElement {
  id: string;
  type: 'link';
  text: string;
  url: string;
  icon: string; // icon key from link-icons
  highlight: boolean;
}

export interface SocialIconsElement {
  id: string;
  type: 'socialIcons';
  links: { platform: string; handle: string }[];
  iconStyle: 'filled' | 'outline' | 'minimal';
  size: number;
}

export interface HeaderElement {
  id: string;
  type: 'header';
  text: string;
}

export interface TextBlockElement {
  id: string;
  type: 'textBlock';
  text: string;
}

export type PageElement =
  | ProfileElement
  | LinkElement
  | SocialIconsElement
  | HeaderElement
  | TextBlockElement;

export interface BackgroundStyle {
  type: 'solid' | 'gradient' | 'image';
  color1: string;
  color2: string;
  imageUrl: string;
}

export interface ButtonStyle {
  color: string;
  textColor: string;
  style: 'square' | 'rounded' | 'pill';
  fill: 'filled' | 'outline' | 'soft';
  shadow: 'none' | 'small' | 'medium' | 'large';
}

export interface TextStyle {
  font: string;
  nameColor: string;
  nameSize: number;
  bioColor: string;
}

export interface LayoutStyle {
  maxWidth: number;
  spacing: number;
  buttonWidth: 'full' | 'auto';
}

export interface StyleConfig {
  background: BackgroundStyle;
  button: ButtonStyle;
  text: TextStyle;
  layout: LayoutStyle;
  iconColor: string;
  socialIconColor: string;
}

export interface AnalyticsConfig {
  googleAnalyticsId: string;
  customScript: string;
}

export interface PageData {
  meta: {
    title: string;
    description: string;
  };
  style: StyleConfig;
  elements: PageElement[];
  analytics: AnalyticsConfig;
}
