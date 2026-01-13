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



export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) notFound();


  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
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
 
  return {
    title: page.data.title,
    description: page.data.description,
  };
}