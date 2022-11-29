import { layoutFillConfig } from 'lib/utils/image';
import {
  HORIZONTAL_ALIGNMENT,
  OBJECT_FIT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import {
  ALIGN_CLASS_MAP,
  BACKGROUND_POSITION_MAP,
  JUSTIFY_CLASS_MAP,
  OBJECT_FIT_CLASS_MAP,
} from 'utils/classMappings';
import AnchorButton from 'components/atoms/AnchorButton';
import Button from 'components/atoms/Button';
import RichText from 'components/atoms/RichText';
import Image from 'components/atoms/SafeImage';
import type { PanelTextProps } from './Panel';
import { SPACING } from 'lib/globals/sizings';

const HORIZONTAL_PADDING_MAP = {
  [SPACING.NONE]: 'lg:px-0',
  [SPACING.SMALL]: 'px-2 lg:px-6',
  [SPACING.MEDIUM]: 'px-4 lg:px-12',
  [SPACING.LARGE]: 'px-6 lg:px-18',
  [SPACING.EXTRA_LARGE]: 'px-8 lg:px-24',
};

const VERTICAL_PADDING_MAP = {
  [SPACING.NONE]: 'py-0',
  [SPACING.SMALL]: 'py-6',
  [SPACING.MEDIUM]: 'py-12',
  [SPACING.LARGE]: 'py-18',
  [SPACING.EXTRA_LARGE]: 'py-24',
};

const CONTENT_GAP_MAP = {
  [SPACING.NONE]: 'gap-y-0',
  [SPACING.SMALL]: 'gap-y-6',
  [SPACING.MEDIUM]: 'gap-y-12',
  [SPACING.LARGE]: 'gap-y-18',
  [SPACING.EXTRA_LARGE]: 'gap-y-24',
};

const TextPanel: React.FC<PanelTextProps> = ({
  title,
  description,
  links,
  background_color,
  background_image,
  image_scaling = OBJECT_FIT.FILL,
  horizontalAlignment = HORIZONTAL_ALIGNMENT.CENTER,
  verticalAlignment = VERTICAL_ALIGNMENT.CENTER,
  horizontal_background_alignment = HORIZONTAL_ALIGNMENT.CENTER,
  vertical_background_alignment = VERTICAL_ALIGNMENT.CENTER,
  overlay_opacity = 50,
  horizontal_spacing = SPACING.SMALL,
  vertical_spacing = SPACING.SMALL,
  content_gap = SPACING.SMALL,
}) => (
  <div className="relative h-full w-full">
    {background_image?.src && (
      <Image
        className={`absolute inset-0 
            ${OBJECT_FIT_CLASS_MAP[image_scaling]}
            ${BACKGROUND_POSITION_MAP[vertical_background_alignment][horizontal_background_alignment]}
        `}
        {...background_image}
        {...layoutFillConfig}
        alt={background_image.alt}
      />
    )}
    {background_color && (
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: background_color,
          opacity: `${overlay_opacity}%`,
        }}
      />
    )}

    <div
      className={`relative flex h-full w-full flex-col
        ${HORIZONTAL_PADDING_MAP[horizontal_spacing]}
        ${VERTICAL_PADDING_MAP[vertical_spacing]}
        ${ALIGN_CLASS_MAP[horizontalAlignment]}
        ${JUSTIFY_CLASS_MAP[verticalAlignment]}
     `}>
      {title && (
        <RichText
          className="font-headings text-5xl text-primary"
          content={title}
        />
      )}
      <div className={`flex flex-col ${CONTENT_GAP_MAP[content_gap]}`}>
        {description && (
          <RichText className="mt-6 text-xl text-body" content={description} />
        )}
        <ul className="relative flex flex-col gap-4">
          {links &&
            links.map((cta) =>
              cta.style === BUTTON_STYLE.ANCHOR ? (
                <AnchorButton
                  key={cta.id}
                  elType={BUTTON_TYPE.LINK}
                  href={cta.link}
                  label={cta.label}
                  className="mt-8 w-full text-center lg:mt-0 lg:w-auto"
                />
              ) : (
                <Button
                  key={cta.id}
                  elType={BUTTON_TYPE.LINK}
                  href={cta.link}
                  buttonStyle={cta.style}
                  className="mt-8 w-full text-center lg:mt-0 lg:w-auto"
                  dangerouslySetInnerHTML={{ __html: cta.label }}
                />
              ),
            )}
        </ul>
      </div>
    </div>
  </div>
);

export default TextPanel;
