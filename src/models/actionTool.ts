/**
 * 2 Hour Builder - Action-Tool 关系 Model
 */
import prisma from '@/lib/prisma';

// 获取 Action 的所有工具
export async function getToolsByActionId(actionId: string) {
  return prisma.actionTool.findMany({
    where: { actionId },
    include: { tool: true },
    orderBy: { sortOrder: 'asc' },
  });
}

// 获取工具关联的所有 Actions
export async function getActionsByToolId(toolId: string) {
  return prisma.actionTool.findMany({
    where: { toolId },
    include: {
      action: {
        include: { category: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });
}

// 为 Action 添加工具
export async function addToolToAction(data: {
  actionId: string;
  toolId: string;
  role?: string;
  description?: string;
  sortOrder?: number;
}) {
  return prisma.actionTool.create({ data });
}

// 批量为 Action 添加工具
export async function addToolsToAction(
  actionId: string,
  tools: Array<{
    toolId: string;
    role?: string;
    description?: string;
    sortOrder?: number;
  }>
) {
  return prisma.actionTool.createMany({
    data: tools.map((t, index) => ({
      actionId,
      toolId: t.toolId,
      role: t.role || '配合',
      description: t.description,
      sortOrder: t.sortOrder ?? index,
    })),
  });
}

// 更新 Action-Tool 关系
export async function updateActionTool(
  actionId: string,
  toolId: string,
  data: {
    role?: string;
    description?: string;
    sortOrder?: number;
  }
) {
  return prisma.actionTool.updateMany({
    where: { actionId, toolId },
    data,
  });
}

// 移除 Action 的工具
export async function removeToolFromAction(actionId: string, toolId: string) {
  return prisma.actionTool.deleteMany({
    where: { actionId, toolId },
  });
}

// 清空 Action 的所有工具关联
export async function clearActionTools(actionId: string) {
  return prisma.actionTool.deleteMany({
    where: { actionId },
  });
}

// 替换 Action 的工具列表
export async function replaceActionTools(
  actionId: string,
  tools: Array<{
    toolId: string;
    role?: string;
    description?: string;
    sortOrder?: number;
  }>
) {
  // 先删除所有旧关联
  await prisma.actionTool.deleteMany({
    where: { actionId },
  });

  // 再添加新关联
  if (tools.length > 0) {
    return prisma.actionTool.createMany({
      data: tools.map((t, index) => ({
        actionId,
        toolId: t.toolId,
        role: t.role || '配合',
        description: t.description,
        sortOrder: t.sortOrder ?? index,
      })),
    });
  }
}
