'use client';
import React from 'react';
import {
  LuLightbulb,
  LuPalette,
  LuRocket,
  LuCheckCircle,
  LuCode2,
  LuServer,
  LuSparkles,
} from 'react-icons/lu';

const steps = [
  {
    time: 20,
    title: '生成页面结构',
    description: '使用 AI 工具快速生成页面框架',
    example: '选择模板 → 输入需求 → 生成代码',
    icon: LuLightbulb,
    iconBg: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    timeColor: 'text-cyan-400',
    timeBorder: 'border-cyan-500/50',
  },
  {
    time: 60,
    title: '调整样式',
    description: '优化视觉细节和交互体验',
    example: '修改配色 → 调整布局 → 优化响应式',
    icon: LuPalette,
    iconBg: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    timeColor: 'text-purple-400',
    timeBorder: 'border-purple-500/50',
  },
  {
    time: 20,
    title: '部署上线',
    description: '将页面发布到服务器',
    example: '连接 Vercel → 构建 → 部署',
    icon: LuServer,
    iconBg: 'from-emerald-500/20 to-cyan-500/20',
    borderColor: 'border-emerald-500/30',
    timeColor: 'text-emerald-400',
    timeBorder: 'border-emerald-500/50',
  },
  {
    time: 20,
    title: '检查 & 发布',
    description: '测试并正式发布',
    example: '检查功能 → 测试性能 → 发布链接',
    icon: LuRocket,
    iconBg: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    timeColor: 'text-amber-400',
    timeBorder: 'border-amber-500/50',
  },
];

export default function ActionPreview() {
  return (
    <section className="py-16 pb-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-slate-500 mb-2">Action Preview</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            2 小时你会做什么?
          </h2>
          <p className="text-slate-400">时间分配 & 操作步骤</p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%]">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" preserveAspectRatio="none">
              <path
                d="M 50 50 L 350 50 L 350 150 L 50 150"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl bg-slate-800/30 border ${step.borderColor} backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300`}
                >
                  <div className="flex items-start gap-5">
                    {/* Time Circle */}
                    <div className={`shrink-0 w-16 h-16 rounded-full border-2 ${step.timeBorder} flex flex-col items-center justify-center bg-slate-900/50`}>
                      <span className={`text-xl font-bold ${step.timeColor}`}>{step.time}</span>
                      <span className="text-xs text-slate-500">分钟</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.iconBg} flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 ${step.timeColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{step.description}</p>
                      <div className="text-xs text-slate-500">
                        <span className="text-slate-400">任务案例</span>
                        <p className="mt-1 text-slate-500">• {step.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Time */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50">
            <LuSparkles className="w-5 h-5 text-purple-400" />
            <span className="text-slate-400">总计</span>
            <span className="text-xl font-bold text-white">120 分钟</span>
            <span className="text-slate-400">= 完成一个可发布的作品</span>
          </div>
        </div>
      </div>
    </section>
  );
}
