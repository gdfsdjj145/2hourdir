import { blogSource } from '@/../source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '../mdx-components';
import Link from 'next/link';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo';



export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();


  const MDX = page.data.body;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const slug = params.slug?.join('/') || '';
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const data = page.data as Record<string, any>;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <BreadcrumbJsonLd items={[
        { name: '首页', url: siteUrl },
        { name: '博客', url: `${siteUrl}/blog` },
        { name: page.data.title, url: pageUrl },
      ]} />
      <ArticleJsonLd
        title={page.data.title}
        description={page.data.description || ''}
        url={pageUrl}
        image={data.coverImage ? (data.coverImage.startsWith('http') ? data.coverImage : `${siteUrl}${data.coverImage}`) : undefined}
        datePublished={data.date ? new Date(data.date).toISOString() : new Date().toISOString()}
        author={{ name: data.authorName || '2 Hour Builder' }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground mb-4 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"/>
        </svg>
        返回博客列表
      </Link>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
 
export async function generateStaticParams() {
  return blogSource.generateParams();
}
 
export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const slug = params.slug?.join('/') || '';
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const data = page.data as Record<string, any>;

  return {
    title: page.data.title,
    description: page.data.description,
    keywords: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags,
    openGraph: {
      type: 'article',
      locale: 'zh_CN',
      siteName: '2 Hour Builder',
      title: page.data.title,
      description: page.data.description,
      url: pageUrl,
      ...(data.date && { publishedTime: new Date(data.date).toISOString() }),
      ...(data.coverImage && {
        images: [{
          url: data.coverImage.startsWith('http') ? data.coverImage : `${siteUrl}${data.coverImage}`,
          alt: page.data.title,
        }],
      }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}