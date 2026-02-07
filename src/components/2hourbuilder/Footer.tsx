'use client';
import React from 'react';
import Link from 'next/link';
import { LuGithub, LuTwitter, LuMail } from 'react-icons/lu';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Main Content */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            2 Hour Builder 是什么？
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            一个帮技术人，把零碎时间变成真实产出的系统
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Categories */}
          <div className="col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">输出分类</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/category/page" className="text-sm text-slate-500 hover:text-white transition-colors">
                写一个页面
              </Link>
              <Link href="/category/feature" className="text-sm text-slate-500 hover:text-white transition-colors">
                写一个功能
              </Link>
              <Link href="/category/script" className="text-sm text-slate-500 hover:text-white transition-colors">
                写一个脚本
              </Link>
              <Link href="/category/content" className="text-sm text-slate-500 hover:text-white transition-colors">
                写一篇内容
              </Link>
              <Link href="/category/product" className="text-sm text-slate-500 hover:text-white transition-colors">
                做一个小产品
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">关于</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-500 hover:text-white transition-colors">
                  方法论
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">联系我们</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <LuGithub className="text-lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <LuTwitter className="text-lg" />
              </a>
              <a
                href="mailto:hello@2hourbuilder.com"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <LuMail className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} 2 Hour Builder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
