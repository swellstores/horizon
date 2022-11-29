import React from 'react';
import InformationCircle from 'assets/icons/information-circle.svg';

interface NoteProps {
  /**
   * Text displayed next to info icon
   */
  text: string;
  /**
   * Additional classes to be added to the container
   */
  containerClassName?: string;
}

const Note: React.FC<NoteProps> = ({ text, containerClassName }) => {
  return (
    <div
      className={[
        'flex gap-x-[10px] lg:max-w-[463px]',
        containerClassName,
      ].join(' ')}>
      <span>
        <InformationCircle className="w-[15.6px] lg:w-[19.5px]" />
      </span>
      <p className="text-xs text-body lg:text-sm">{text}</p>
    </div>
  );
};

export default Note;
