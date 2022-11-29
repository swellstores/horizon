import React from 'react';
import RichText from 'components/atoms/RichText';

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  url?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ content }) => (
  <div className="bg-primary p-2 text-center">
    <RichText
      content={content}
      rootEl="p"
      className="text-sm font-medium text-background-primary"
    />
  </div>
);

export default AnnouncementBar;
