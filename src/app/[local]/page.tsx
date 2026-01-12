import Header from '@/components/2hourbuilder/Header';
import Hero from '@/components/2hourbuilder/Hero';
import DailyRecommend from '@/components/2hourbuilder/DailyRecommend';
import ActionPreview from '@/components/2hourbuilder/ActionPreview';
import ToolList from '@/components/2hourbuilder/ToolList';
import Footer from '@/components/2hourbuilder/Footer';

export const metadata = {
  title: '2 Hour Builder - 你现在有2小时，交付一个真实输出',
  description: '不是学习，不是收藏，是 2 小时后你能发出去的东西。技术人每天 2 小时，用 AI 工具完成一个可发布的输出。',
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Header />
      <main>
        <Hero />
        <DailyRecommend />
        <ActionPreview />
        <ToolList />
      </main>
      <Footer />
    </div>
  );
}
