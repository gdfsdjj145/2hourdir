/**
 * 2 Hour Builder - 工具 Model
 */
import prisma from '@/lib/prisma';

// 获取所有启用的工具
export async function getToolList(options?: {
  tagId?: string;
  level?: string;
  limit?: number;
  offset?: number;
}) {
  const { tagId, level, limit = 50, offset = 0 } = options || {};

  return prisma.tool.findMany({
    where: {
      isActive: true,
      ...(tagId && { tagIds: { has: tagId } }),
      ...(level && { level }),
    },
    orderBy: { sortOrder: 'asc' },
    take: limit,
    skip: offset,
  });
}

// 根据 slug 获取工具详情
export async function getToolBySlug(slug: string) {
  return prisma.tool.findUnique({
    where: { slug },
    include: {
      actionTools: {
        include: {
          action: {
            include: { category: true },
          },
        },
      },
    },
  });
}

// 根据名称搜索工具
export async function searchTools(keyword: string, limit: number = 10) {
  return prisma.tool.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ],
    },
    take: limit,
  });
}

// 创建工具
export async function createTool(data: {
  slug: string;
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  level?: string;
  levelReason?: string;
  learnCost?: number;
  failRate?: number;
  timeCost?: number;
  tagIds?: string[];
  sortOrder?: number;
}) {
  return prisma.tool.create({ data });
}

// 更新工具
export async function updateToolBySlug(
  slug: string,
  data: {
    name?: string;
    description?: string;
    url?: string;
    logo?: string;
    level?: string;
    levelReason?: string;
    learnCost?: number;
    failRate?: number;
    timeCost?: number;
    tagIds?: string[];
    sortOrder?: number;
    isActive?: boolean;
  }
) {
  return prisma.tool.update({
    where: { slug },
    data,
  });
}

// 删除工具
export async function deleteToolBySlug(slug: string) {
  return prisma.tool.delete({
    where: { slug },
  });
}

// 获取工具数量
export async function countTools(where?: { isActive?: boolean; level?: string }) {
  return prisma.tool.count({ where });
}
