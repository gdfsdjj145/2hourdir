import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/2hourbuilder/Header';
import Footer from '@/components/2hourbuilder/Footer';
import { getOutput, getCategory, outputs } from '@/components/2hourbuilder/data';
import { LuStar, LuClock, LuTarget, LuPackage, LuCheckCircle, LuWrench, LuAlertTriangle, LuArrowRight, LuChevronRight } from 'react-icons/lu';

export async function generateStaticParams() {
  return outputs.map((output) => ({
    id: output.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const output = getOutput(id);
  if (!output) return {};

  return {
    title: `${output.title} - 2 Hour Builder`,
    description: output.description,
  };
}

export default async function OutputPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const output = getOutput(id);

  if (!output) {
    notFound();
  }

  const category = getCategory(output.categoryId);

  // 获取推荐的下一个输出
  const relatedOutputs = outputs
    .filter((o) => o.categoryId === output.categoryId && o.id !== output.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <Header />
      <main>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <LuChevronRight className="w-4 h-4" />
            <Link
              href={`/category/${output.categoryId}`}
              className="hover:text-white transition-colors"
            >
              {category?.title}
            </Link>
            <LuChevronRight className="w-4 h-4" />
            <span className="text-gray-300 truncate max-w-[200px]">{output.title}</span>
          </div>

          {/* 1. Output Overview */}
          <section className="mb-12">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#12122a] to-[#1a1a3a] border border-white/5">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {output.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                {/* Difficulty */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">难度:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <LuStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < output.difficulty
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-gray-400">
                  <LuClock className="w-4 h-4" />
                  <span className="text-sm">2 小时</span>
                </div>

                {/* Output */}
                <div className="flex items-center gap-2">
                  <LuPackage className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-purple-300">{output.output}</span>
                </div>
              </div>

              <p className="text-gray-400">{output.description}</p>
            </div>
          </section>

          {/* 2. Today's Goal */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <LuTarget className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">今日目标</h2>
            </div>
            <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5">
              <p className="text-gray-300 text-lg">{output.goal}</p>
            </div>
          </section>

          {/* 3. Deliverables & Done Definition */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <LuCheckCircle className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-bold text-white">最终交付物</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Deliverables */}
              <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-4">输出物定义</h3>
                <ul className="space-y-3">
                  {output.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Done Definition */}
              <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5">
                <h3 className="text-sm font-medium text-gray-400 mb-4">验收标准</h3>
                <ul className="space-y-3">
                  {output.doneDefinition.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <LuCheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Tool Stack */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <LuWrench className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white">工具组合</h2>
            </div>
            <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5">
              <div className="space-y-4">
                {output.tools.map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          tool.role === '首选'
                            ? 'bg-green-500/20 text-green-400'
                            : tool.role === '配合'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        {tool.role}
                      </span>
                      <span className="font-medium text-white">{tool.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{tool.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Time Allocation */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <LuClock className="w-5 h-5 text-orange-400" />
              <h2 className="text-xl font-bold text-white">时间分配</h2>
            </div>
            <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5">
              <div className="space-y-4">
                {output.timeAllocation.map((item, i) => {
                  // 计算进度条宽度（基于120分钟总时长）
                  const widthPercent = (item.duration / 120) * 100;
                  return (
                    <div key={i} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">{item.task}</span>
                        <span className="text-sm text-orange-400 font-medium">
                          {item.duration} min
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between text-sm">
                <span className="text-gray-500">总计时间</span>
                <span className="text-white font-medium">
                  {output.timeAllocation.reduce((sum, item) => sum + item.duration, 0)} 分钟
                </span>
              </div>
            </div>
          </section>

          {/* 6. Pitfalls */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <LuAlertTriangle className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">常见坑 / 放弃点</h2>
            </div>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <ul className="space-y-3">
                {output.pitfalls.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-yellow-400 mt-1">⚠️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7. Next Steps */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <LuArrowRight className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">完成后下一步</h2>
            </div>
            <div className="p-6 rounded-2xl bg-[#12122a] border border-white/5">
              <ul className="space-y-3 mb-6">
                {output.nextSteps.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Related Outputs */}
              {relatedOutputs.length > 0 && (
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">推荐下一个输出</h3>
                  <div className="grid gap-4">
                    {relatedOutputs.map((related) => (
                      <Link
                        key={related.id}
                        href={`/output/${related.id}`}
                        className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all"
                      >
                        <div>
                          <h4 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-500">{related.output}</p>
                        </div>
                        <LuArrowRight className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12">
            <div className="inline-flex flex-col items-center">
              <p className="text-gray-400 mb-4">准备好了吗？</p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                开始 2 小时行动
              </button>
              <p className="text-xs text-gray-600 mt-4">
                记住：完成比完美更重要
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
