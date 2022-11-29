export enum SOCIALS {
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  PINTEREST = 'pinterest',
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
  WHATSAPP = 'whatsapp',
}

export interface SocialLink {
  show: boolean;
  url: string;
}

export type SocialLinks = {
  [key in SOCIALS]: SocialLink;
};
