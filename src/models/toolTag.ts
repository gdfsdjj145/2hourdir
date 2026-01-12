/**
 * 2 Hour Builder - 工具标签 Model
 */
import prisma from '@/lib/prisma';

// 获取所有启用的标签
export async function getToolTagList() {
  return prisma.toolTag.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
}

// 根据 slug 获取标签
export async function getToolTagBySlug(slug: string) {
  return prisma.toolTag.findUnique({
    where: { slug },
  });
}

// 根据 IDs 批量获取标签
export async function getToolTagsByIds(ids: string[]) {
  return prisma.toolTag.findMany({
    where: {
      id: { in: ids },
      isActive: true,
    },
    orderBy: { sortOrder: 'asc' },
  });
}

// 创建标签
export async function createToolTag(data: {
  slug: string;
  name: string;
  color?: string;
  sortOrder?: number;
}) {
  return prisma.toolTag.create({ data });
}

// 更新标签
export async function updateToolTagBySlug(
  slug: string,
  data: {
    name?: string;
    color?: string;
    sortOrder?: number;
    isActive?: boolean;
  }
) {
  return prisma.toolTag.update({
    where: { slug },
    data,
  });
}

// 删除标签
export async function deleteToolTagBySlug(slug: string) {
  return prisma.toolTag.delete({
    where: { slug },
  });
}

// 获取标签数量
export async function countToolTags(where?: { isActive?: boolean }) {
  return prisma.toolTag.count({ where });
}
