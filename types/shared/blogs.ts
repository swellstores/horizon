import type { BlogPreviewCardProps } from 'components/molecules/BlogPreviewCard';
import type { PageSection } from 'lib/editor/sections';
import type { MandatoryImageProps } from 'types/global';

export interface Blog {
  id: string;
  slug: string;
  headerLabel: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  image: MandatoryImageProps;
  date: string;
  tag: string;
  pageSections: PageSection[];
  recommendedBlogs: BlogPreviewCardProps[];
}
