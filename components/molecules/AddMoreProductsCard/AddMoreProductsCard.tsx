import AddCircle from 'components/atoms/AddCircle';
import Link from 'next/link';
import React from 'react';

export interface AddMoreProductsCardProps {
  title: string;
  empty?: boolean;
  emptyTitle?: string;
  subtitle?: string;
  href: string;
}

const AddMoreProductsCard: React.FC<AddMoreProductsCardProps> = ({
  title,
  empty,
  emptyTitle,
  subtitle,
  href,
}) => (
  <Link href={href}>
    <a>
      <div className="rounded-2xl border border-dashed border-accent px-10 py-8">
        <div className="flex items-center gap-10">
          <AddCircle className="my-4" />
          <div className="flex flex-col gap-2">
            <div className="font-headings text-sm font-semibold text-primary">
              {empty ? emptyTitle ?? title : title}
            </div>
            {subtitle && <div className="text-2xs text-body">{subtitle}</div>}
          </div>
        </div>
      </div>
    </a>
  </Link>
);

export default AddMoreProductsCard;
