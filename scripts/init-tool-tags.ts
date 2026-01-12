/**
 * 初始化工具标签
 *
 * 使用方法:
 * npx tsx scripts/init-tool-tags.ts
 */

import prisma from '../src/lib/prisma';

const toolTags = [
  { slug: 'ai-coding', name: 'AI 编程', color: '#8B5CF6' },
  { slug: 'ai-design', name: 'AI 设计', color: '#EC4899' },
  { slug: 'ai-chat', name: 'AI 对话', color: '#06B6D4' },
  { slug: 'code-editor', name: '代码编辑器', color: '#10B981' },
  { slug: 'frontend', name: '前端框架', color: '#3B82F6' },
  { slug: 'backend', name: '后端服务', color: '#F59E0B' },
  { slug: 'database', name: '数据库', color: '#EF4444' },
  { slug: 'deploy', name: '部署托管', color: '#14B8A6' },
  { slug: 'design', name: '设计工具', color: '#F472B6' },
  { slug: 'code-hosting', name: '代码托管', color: '#6366F1' },
  { slug: 'css', name: 'CSS 框架', color: '#0EA5E9' },
  { slug: 'ui-generator', name: 'UI 生成', color: '#A855F7' },
  { slug: 'free-tier', name: '免费额度', color: '#22C55E' },
  { slug: 'must-have', name: '必备工具', color: '#EF4444' },
  { slug: 'frontend-template', name: '前端模板', color: '#0EA5E9' },
  { slug: 'logo-generator', name: 'Logo 生成', color: '#A855F7' },
  { slug: 'qr-code-generator', name: '二维码工具', color: '#22C55E' },
  { slug: 'operation-tool', name: '运营工具', color: '#EF4444' },
];

async function main() {
  console.log('初始化工具标签...\n');

  let created = 0;
  let skipped = 0;

  for (const tag of toolTags) {
    const existing = await prisma.toolTag.findUnique({
      where: { slug: tag.slug },
    });

    if (existing) {
      console.log(`  - 跳过: ${tag.name} (已存在)`);
      skipped++;
    } else {
      await prisma.toolTag.create({
        data: {
          slug: tag.slug,
          name: tag.name,
          color: tag.color,
          sortOrder: toolTags.indexOf(tag),
          isActive: true,
        },
      });
      console.log(`  + 创建: ${tag.name}`);
      created++;
    }
  }

  console.log(`\n完成: 创建 ${created} 个, 跳过 ${skipped} 个`);

  // 列出所有标签
  const allTags = await prisma.toolTag.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  console.log('\n当前所有标签:');
  console.log('─'.repeat(50));
  for (const tag of allTags) {
    console.log(`  ${tag.slug.padEnd(15)} │ ${tag.name.padEnd(10)} │ ${tag.color}`);
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
