import React, { useState, useCallback, ComponentType } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ActionInput from 'components/molecules/ActionInput';
import LinksAccordion from 'components/atoms/LinksAccordion';
import { SECTION_MARGIN_MAP, SPACING } from 'lib/globals/sizings';
import type { MandatoryImageProps } from 'types/global';
import type { MenuItem } from 'components/organisms/Header';
import type { SocialLinks, SOCIALS } from 'types/shared/socials';
import type { EditorArray } from 'types/editor';

type ReactSVGComponent = ComponentType<React.SVGProps<SVGSVGElement>>;

const TwitterIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/twitter.svg'),
);
const FacebookIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/facebook.svg'),
);
const InstagramIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/instagram.svg'),
);
const TiktokIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/tiktok.svg'),
);
const PinterestIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/pinterest.svg'),
);
const YoutubeIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/youtube.svg'),
);
const VimeoIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/vimeo.svg'),
);
const WhatsappIcon: ReactSVGComponent = dynamic(
  () => import('assets/icons/whatsapp.svg'),
);

export interface FooterLink {
  href: string;
  title: string;
}

export interface PaymentMethod {
  name: string;
  icon: MandatoryImageProps;
}

export interface Column {
  heading?: string;
  items: MenuItem[];
}

const PROMO_TEXT = 'Powered by Swell';

const SOCIAL_ICONS_MAP = {
  twitter: <TwitterIcon height={20} width={20} />,
  facebook: <FacebookIcon height={20} width={20} />,
  instagram: <InstagramIcon height={20} width={20} />,
  tiktok: <TiktokIcon height={20} width={20} />,
  pinterest: <PinterestIcon height={20} width={20} />,
  youtube: <YoutubeIcon height={20} width={20} />,
  vimeo: <VimeoIcon height={20} width={20} />,
  whatsapp: <WhatsappIcon height={20} width={20} />,
};

export interface FooterProps {
  menu?: Column[];
  secondaryMenu?: EditorArray<MenuItem>;
  showSocials?: boolean;
  socialLinks?: SocialLinks;
  showPayments?: boolean;
  copyrightText?: string;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  horizontalPadding?: SPACING;
  paymentMethods?: PaymentMethod[];
}

const Footer: React.FC<FooterProps> = ({
  menu,
  secondaryMenu,
  showSocials = true,
  socialLinks,
  copyrightText,
  showNewsletter = true,
  newsletterTitle,
  newsletterPlaceholder,
  horizontalPadding,
}) => {
  const [newsLetterError, setNewsLetterError] = useState('');

  const onChange = useCallback(() => setNewsLetterError(''), []);
  const onAction = useCallback((value: string) => {
    if (!value) {
      setNewsLetterError('Please enter your email');
      return;
    }

    // Validate if email is valid
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setNewsLetterError('Please enter a valid email address');
      return;
    }
    // TODO: Handle submit (email: string) => void;
    console.log(value);
  }, []);

  return (
    <footer
      className={`${
        SECTION_MARGIN_MAP[horizontalPadding ?? SPACING.MEDIUM]
      } bg-background-primary pb-6 pt-14`}>
      {/* Footer main content */}
      {(!!menu?.length || showNewsletter) && (
        <div className="lg:flex lg:justify-between">
          {/* Footer links columns */}
          <MobileColumns columns={menu} />
          <DesktopColumns columns={menu} />
          {/* Newsletter */}
          {showNewsletter && (
            <div className="mt-8 lg:mt-0 lg:max-w-lg">
              <h3
                className="font-headings text-5xl font-semibold text-primary"
                dangerouslySetInnerHTML={{
                  __html: newsletterTitle ?? "Let's keep in touch",
                }}></h3>

              <div className="mt-4">
                <ActionInput
                  id="email-newsletter"
                  type="email"
                  name="email"
                  aria-label={newsletterPlaceholder}
                  placeholder={newsletterPlaceholder}
                  onChange={onChange}
                  errorLabel={newsLetterError}
                  onAction={onAction}
                  noValidate
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Second footer section */}
      <div className="mt-10 flex flex-col items-center gap-6 lg:mt-18 lg:flex-row lg:justify-end lg:gap-0">
        {/* Payment methods, temporarily disabled */}
        {/* {false && !!paymentMethods?.length && (
          <div className="flex gap-2 lg:gap-4">
            {paymentMethods.map((paymentMethod) => (
              <Image
                key={paymentMethod.name}
                title={paymentMethod.name}
                {...paymentMethod.icon}
                alt={paymentMethod.icon.alt}
              />
            ))}
          </div>
        )} */}

        {/* Social links */}
        {showSocials && typeof socialLinks === 'object' && (
          <div className="flex gap-4">
            {Object.entries(socialLinks).map(
              ([key, value]) =>
                value.show &&
                !!value.url && (
                  <Link key={key} href={value.url}>
                    <a className="leading-none text-primary">
                      {SOCIAL_ICONS_MAP[key as SOCIALS]}
                    </a>
                  </Link>
                ),
            )}
          </div>
        )}
      </div>

      {/* Third footer section */}
      <div className="mt-6 lg:flex lg:flex-row-reverse lg:justify-between">
        {!!secondaryMenu?.length && (
          <div className="flex justify-between lg:justify-start lg:gap-8">
            {secondaryMenu.map((item) => (
              <Link key={item.id} href={item.link}>
                <a className="whitespace-nowrap text-center text-2xs text-primary lg:text-sm">
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        )}

        {!!copyrightText && (
          <div
            className="mt-6 text-center text-2xs text-primary lg:mt-0 lg:text-sm"
            dangerouslySetInnerHTML={{
              __html: `${copyrightText} ${PROMO_TEXT}`,
            }}></div>
        )}
      </div>
    </footer>
  );
};

const MobileColumns: React.FC<{ columns?: Column[] }> = ({ columns }) => (
  <div className="flex flex-col gap-4 lg:hidden">
    {columns?.map((column, i) => (
      <LinksAccordion
        key={column.heading ?? `column-${i}`}
        title={column.heading ?? `Column ${i + 1}`}
        items={column.items.map((item) => ({
          href: item.link,
          title: item.label,
        }))}
        className="border-b border-dividers pb-4"
      />
    ))}
  </div>
);

const DesktopColumns: React.FC<{ columns?: Column[] }> = ({ columns }) =>
  columns?.length ? (
    <div className="hidden flex-row gap-[88px] lg:flex">
      {columns.map((column, i) => (
        <div
          key={column.heading ?? `column-${i}`}
          className="flex flex-col border-b border-dividers pb-4 lg:border-b-0 lg:p-0">
          <h3 className="font-headings text-sm font-semibold uppercase text-primary">
            {column.heading}
          </h3>
          <ul className="mt-6 flex flex-col gap-2">
            {column.items.map((item) => (
              <li key={item.label}>
                <Link href={item.link}>
                  <a className="text-sm text-primary">{item.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ) : null;

export default Footer;
