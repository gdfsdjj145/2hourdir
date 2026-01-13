'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuBookOpen, LuArrowRight, LuCalendar, LuUser } from 'react-icons/lu';
import { blogSource } from '@/../source';
import { formatDate } from '@/lib/utils';
import { type PageData } from 'fumadocs-core/source';

interface BlogPageData extends PageData {
  date?: Date;
  category?: string;
  coverImage?: string;
}

// 获取博客文章列表
function getBlogs() {
  const pages = blogSource.getPages();

  return pages
    .map((page) => {
      const data = page.data as BlogPageData;
      const rawDate = data.date instanceof Date ? data.date : new Date();

      return {
        slug: page.slugs.join('/'),
        title: data.title || '无标题',
        description: data.description || '',
        date: formatDate(rawDate),
        rawDate,
        category: data.category || '未分类',
        coverImage: data.coverImage || '/blog/assets/1.png',
      };
    })
    .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    .slice(0, 3); // 只取最新的3篇
}

export default function BlogSection() {
  const blogs = getBlogs();

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 pb-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LuBookOpen className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl md:text-2xl font-bold text-white">
                最新文章
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              技术分享、经验总结、使用指南
            </p>
          </div>
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <span className="text-sm text-slate-400 group-hover:text-blue-400 transition-colors">
              查看全部
            </span>
            <LuArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="h-full rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 overflow-hidden transition-all duration-300 hover:bg-slate-800/50">
                {/* Cover Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900/50">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs rounded-md bg-blue-500/20 text-blue-400 backdrop-blur-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <LuCalendar className="w-3 h-3" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LuUser className="w-3 h-3" />
                      <span>MvpFast</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button - Mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
          >
            <span>查看全部文章</span>
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
