/**
 * 2 Hour Builder - Action (输出卡片) Model
 */
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// 时间分配类型
interface TimeAllocation {
  duration: number;
  task: string;
}

// 获取所有启用的 Actions
export async function getActionList(options?: {
  categoryId?: string;
  isRecommend?: boolean;
  limit?: number;
  offset?: number;
}) {
  const { categoryId, isRecommend, limit = 20, offset = 0 } = options || {};

  const where: Prisma.ActionWhereInput = {
    isActive: true,
    ...(categoryId && { categoryId }),
    ...(isRecommend !== undefined && { isRecommend }),
  };

  return prisma.action.findMany({
    where,
    include: {
      category: true,
      actionTools: {
        include: { tool: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: [{ isRecommend: 'desc' }, { sortOrder: 'asc' }],
    take: limit,
    skip: offset,
  });
}

// 根据 slug 获取 Action 详情
export async function getActionBySlug(slug: string) {
  return prisma.action.findUnique({
    where: { slug },
    include: {
      category: true,
      actionTools: {
        include: { tool: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });
}

// 根据分类 slug 获取 Actions
export async function getActionsByCategorySlug(categorySlug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) return [];

  return prisma.action.findMany({
    where: {
      categoryId: category.id,
      isActive: true,
    },
    include: {
      actionTools: {
        include: { tool: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: [{ isRecommend: 'desc' }, { sortOrder: 'asc' }],
  });
}

// 获取推荐的 Actions（今日推荐）
export async function getRecommendActions(limit: number = 1) {
  return prisma.action.findMany({
    where: {
      isActive: true,
      isRecommend: true,
    },
    include: {
      category: true,
      actionTools: {
        include: { tool: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { sortOrder: 'asc' },
    take: limit,
  });
}

// 创建 Action
export async function createAction(data: {
  slug: string;
  title: string;
  description?: string;
  difficulty?: number;
  duration?: number;
  output: string;
  goal?: string;
  deliverables?: string[];
  doneDefinition?: string[];
  pitfalls?: string[];
  nextSteps?: string[];
  timeAllocation?: TimeAllocation[];
  categoryId: string;
  isRecommend?: boolean;
  sortOrder?: number;
}) {
  const { timeAllocation, ...rest } = data;
  return prisma.action.create({
    data: {
      ...rest,
      timeAllocation: timeAllocation as unknown as Prisma.InputJsonValue,
    },
  });
}

// 更新 Action
export async function updateActionBySlug(
  slug: string,
  data: {
    title?: string;
    description?: string;
    difficulty?: number;
    duration?: number;
    output?: string;
    goal?: string;
    deliverables?: string[];
    doneDefinition?: string[];
    pitfalls?: string[];
    nextSteps?: string[];
    timeAllocation?: TimeAllocation[];
    categoryId?: string;
    isRecommend?: boolean;
    sortOrder?: number;
    isActive?: boolean;
  }
) {
  const { timeAllocation, ...rest } = data;
  return prisma.action.update({
    where: { slug },
    data: {
      ...rest,
      ...(timeAllocation && { timeAllocation: timeAllocation as unknown as Prisma.InputJsonValue }),
    },
  });
}

// 增加浏览次数
export async function incrementViewCount(slug: string) {
  return prisma.action.update({
    where: { slug },
    data: { viewCount: { increment: 1 } },
  });
}

// 增加完成次数
export async function incrementCompleteCount(slug: string) {
  return prisma.action.update({
    where: { slug },
    data: { completeCount: { increment: 1 } },
  });
}

// 删除 Action
export async function deleteActionBySlug(slug: string) {
  return prisma.action.delete({
    where: { slug },
  });
}

// 获取 Action 数量
export async function countActions(where?: {
  categoryId?: string;
  isActive?: boolean;
  isRecommend?: boolean;
}) {
  return prisma.action.count({ where });
}

// 获取相关 Actions（同分类）
export async function getRelatedActions(actionSlug: string, limit: number = 3) {
  const action = await prisma.action.findUnique({
    where: { slug: actionSlug },
    select: { categoryId: true },
  });

  if (!action) return [];

  return prisma.action.findMany({
    where: {
      categoryId: action.categoryId,
      slug: { not: actionSlug },
      isActive: true,
    },
    take: limit,
    orderBy: [{ isRecommend: 'desc' }, { sortOrder: 'asc' }],
  });
}
