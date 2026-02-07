import { ReactNode } from 'react';
import './blog-styles.css';
import { blogSource } from '../../../../source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '../layout.config';

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    title: {
      default: '博客 | 2 Hour Builder',
      template: '%s | 2 Hour Builder 博客',
    },
    description: '技术文章、产品更新和开发教程，帮助开发者用 2 小时完成真实产出',
    keywords: '技术博客, 开发教程, AI工具, 效率提升, 开发者, 2 Hour Builder',
    icons: {
      icon: '/favicons/icon_16x16.png',
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      siteName: '2 Hour Builder',
      title: '博客 | 2 Hour Builder',
      description: '技术文章、产品更新和开发教程，帮助开发者用 2 小时完成真实产出',
      url: `${siteUrl}/blog`,
    },
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    // @ts-ignore
    <DocsLayout
      tree={blogSource.pageTree}
      {...baseOptions}
      sidebar={{
        enabled: false
      }}
    >
      {children}
    </DocsLayout>
  );
}