import { Suspense } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/2hourbuilder/Header';
import Hero from '@/components/2hourbuilder/Hero';
import DailyRecommend from '@/components/2hourbuilder/DailyRecommend';
import ActionPreview from '@/components/2hourbuilder/ActionPreview';
import ToolList from '@/components/2hourbuilder/ToolList';
import BlogSection from '@/components/2hourbuilder/BlogSection';
import Footer from '@/components/2hourbuilder/Footer';

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { local } = await params;
  const t = await getTranslations('Metadata');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${siteUrl}/${local}`,
      languages: {
        'zh-CN': `${siteUrl}/zh`,
        'en-US': `${siteUrl}/en`,
      },
    },
  };
}

interface HomeProps {
  params: Promise<{ local: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { local } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Header />
      <main>
        <Hero />
        <DailyRecommend />
        <ActionPreview />
        <Suspense fallback={<div className="py-16 text-center text-slate-500">加载工具列表...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <ToolList locale={local} />
        </Suspense>
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
