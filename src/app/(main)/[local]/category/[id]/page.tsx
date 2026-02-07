import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/2hourbuilder/Header';
import Footer from '@/components/2hourbuilder/Footer';
import { getCategory, getOutputsByCategory, categories } from '@/components/2hourbuilder/data';
import { LuLayout, LuCode2, LuTerminal, LuPenTool, LuBox, LuStar, LuClock, LuArrowRight } from 'react-icons/lu';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  LuLayout,
  LuCode2,
  LuTerminal,
  LuPenTool,
  LuBox,
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; local: string }> }) {
  const { id, local } = await params;
  const category = getCategory(id);
  if (!category) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const pageUrl = `${siteUrl}/${local}/category/${id}`;

  return {
    title: `${category.title} - 2 Hour Builder`,
    description: category.description,
    keywords: `${category.title}, ${category.scenarios?.join(', ') || ''}, 2 Hour Builder, 开发工具`,
    openGraph: {
      type: 'website',
      locale: local === 'en' ? 'en_US' : 'zh_CN',
      siteName: '2 Hour Builder',
      title: `${category.title} - 2 Hour Builder`,
      description: category.description,
      url: pageUrl,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategory(id);

  if (!category) {
    notFound();
  }

  const outputs = getOutputsByCategory(id);
  const IconComponent = iconMap[category.icon] || LuLayout;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                首页
              </Link>
              <span>/</span>
              <span className="text-gray-300">{category.title}</span>
            </div>

            {/* Category Header */}
            <div className="flex items-start gap-6 mb-12">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shrink-0`}>
                <IconComponent className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {category.title}
                </h1>
                <p className="text-gray-400 mb-4">{category.subtitle}</p>
                <p className="text-gray-500 max-w-2xl">{category.description}</p>
              </div>
            </div>

            {/* Scenarios */}
            <div className="mb-12">
              <h2 className="text-lg font-semibold text-white mb-4">适用场景</h2>
              <div className="flex flex-wrap gap-3">
                {category.scenarios.map((scenario) => (
                  <span
                    key={scenario}
                    className="px-4 py-2 text-sm text-gray-300 bg-white/5 rounded-full border border-white/10"
                  >
                    {scenario}
                  </span>
                ))}
              </div>
            </div>

            {/* Default Tool */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 inline-block mb-12">
              <span className="text-sm text-gray-400">默认推荐工具：</span>
              <span className="text-sm text-purple-300 font-medium ml-2">{category.defaultTool}</span>
            </div>
          </div>
        </section>

        {/* Outputs List */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold text-white mb-8">可行动的输出</h2>

            <div className="grid gap-6">
              {outputs.map((output) => (
                <Link
                  key={output.id}
                  href={`/output/${output.id}`}
                  className="group block"
                >
                  <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {output.title}
                        </h3>
                        <p className="text-gray-500 mb-4">{output.description}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4">
                          {/* Difficulty */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500">难度:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <LuStar
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < output.difficulty
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Time */}
                          <div className="flex items-center gap-1 text-gray-500">
                            <LuClock className="w-4 h-4" />
                            <span className="text-sm">2 小时</span>
                          </div>

                          {/* Output */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500">输出:</span>
                            <span className="text-sm text-purple-300">{output.output}</span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center">
                        <LuArrowRight className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {outputs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500">暂无内容，敬请期待</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
