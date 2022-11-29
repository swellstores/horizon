import React from 'react';
import Image from 'components/atoms/SafeImage';
import MembershipCard from 'components/atoms/MembershipCard';
import { BACKGROUND_POSITION_MAP } from 'utils/classMappings';
import {
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
  SPACING,
} from 'lib/globals/sizings';
import {
  HORIZONTAL_ALIGNMENT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import { layoutFillConfig } from 'lib/utils/image';

import type { MembershipCardProps } from 'components/atoms/MembershipCard';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import type { MandatoryImageProps } from 'types/global';
import type { EditorArray } from 'types/editor';

export interface MembershipsProps extends Partial<PageSectionSpacing> {
  title?: string;
  description?: string;
  memberships?: EditorArray<MembershipCardProps>;
  background_color?: string;
  background_image?: MandatoryImageProps;
  horizontal_background_alignment?: HORIZONTAL_ALIGNMENT;
  vertical_background_alignment?: VERTICAL_ALIGNMENT;
  overlay_opacity?: number;
}

const Memberships: ContentBlockComponent<MembershipsProps> = ({
  title,
  description,
  memberships = [],
  horizontal_spacing = SPACING.SMALL,
  vertical_spacing = SPACING.SMALL,
  background_color,
  background_image,
  horizontal_background_alignment = HORIZONTAL_ALIGNMENT.CENTER,
  vertical_background_alignment = VERTICAL_ALIGNMENT.CENTER,
  overlay_opacity = 50,
}) => {
  return (
    <section
      className={`
        ${SECTION_PADDING_MAP[horizontal_spacing]}
        ${SECTION_VERTICAL_PADDING_MAP[vertical_spacing]}
        relative flex flex-col items-center gap-y-8 lg:gap-y-18
      `}>
      {background_image && (
        <Image
          className={`absolute inset-0 
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
      <div className="relative flex flex-col gap-4">
        <p className="text-center font-headings text-5xl font-semibold text-primary">
          {title}
        </p>
        <p className="text-center text-2xl text-body">{description}</p>
      </div>
      <div className="relative grid grid-cols-[minmax(100%,342px)] gap-y-10 lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-14">
        {memberships.map((membership) => (
          <MembershipCard
            key={membership.title}
            {...membership}
            className="self-stretch"
          />
        ))}
      </div>
    </section>
  );
};

Memberships.propMaps = {
  background_image: 'mapImage',
  memberships: 'memberships_mapMemberships',
};

export default Memberships;
