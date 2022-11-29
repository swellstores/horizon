import React, { CSSProperties } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarCSSProperties extends CSSProperties {
  /**
   * CSS variable used for the color of the track fill
   */
  '--progress-bar-value': string;
  /**
   * CSS variable used for the color of the track background
   */
  '--progress-bar-background': string;
}

const ProgressBar = React.forwardRef<
  HTMLProgressElement,
  React.ProgressHTMLAttributes<HTMLProgressElement>
>(({ value }) => {
  return (
    <progress
      value={value}
      max={100}
      style={
        {
          '--progress-bar-value': '#1D0A43',
          '--progress-bar-background': 'transparent',
        } as ProgressBarCSSProperties
      }
      className={`${styles['progress-bar']} h-[5px] w-full appearance-none`}
    />
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
