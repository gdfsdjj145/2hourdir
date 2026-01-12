/**
 * 2 Hour Builder - 分类 Model
 */
import prisma from '@/lib/prisma';

// 获取所有启用的分类（按排序）
export async function getCategoryList() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
}

// 根据 slug 获取分类详情
export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  });
}

// 根据 slug 获取分类及其关联的 Actions
export async function getCategoryWithActions(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      actions: {
        where: { isActive: true },
        orderBy: [{ isRecommend: 'desc' }, { sortOrder: 'asc' }],
      },
    },
  });
}

// 创建分类
export async function createCategory(data: {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  gradient?: string;
  scenarios?: string[];
  defaultTool?: string;
  sortOrder?: number;
}) {
  return prisma.category.create({ data });
}

// 更新分类
export async function updateCategoryBySlug(
  slug: string,
  data: {
    title?: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    gradient?: string;
    scenarios?: string[];
    defaultTool?: string;
    sortOrder?: number;
    isActive?: boolean;
  }
) {
  return prisma.category.update({
    where: { slug },
    data,
  });
}

// 删除分类
export async function deleteCategoryBySlug(slug: string) {
  return prisma.category.delete({
    where: { slug },
  });
}

// 获取分类数量
export async function countCategories(where?: { isActive?: boolean }) {
  return prisma.category.count({ where });
}
