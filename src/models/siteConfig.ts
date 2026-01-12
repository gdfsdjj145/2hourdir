/**
 * 2 Hour Builder - 站点配置 Model
 */
import prisma from '@/lib/prisma';

// 预定义的配置键
export const CONFIG_KEYS = {
  TODAY_RECOMMEND_ACTION_ID: 'today_recommend_action_id', // 今日推荐的 Action ID
  SITE_TITLE: 'site_title', // 站点标题
  SITE_DESCRIPTION: 'site_description', // 站点描述
  HERO_TITLE: 'hero_title', // 首屏标题
  HERO_SUBTITLE: 'hero_subtitle', // 首屏副标题
  ANNOUNCEMENT: 'announcement', // 公告
} as const;

// 获取配置值
export async function getConfig(key: string): Promise<string | null> {
  const config = await prisma.siteConfig.findUnique({
    where: { key },
  });
  return config?.isActive ? config.value : null;
}

// 获取多个配置值
export async function getConfigs(keys: string[]): Promise<Record<string, string>> {
  const configs = await prisma.siteConfig.findMany({
    where: {
      key: { in: keys },
      isActive: true,
    },
  });

  return configs.reduce((acc, config) => {
    acc[config.key] = config.value;
    return acc;
  }, {} as Record<string, string>);
}

// 获取所有配置
export async function getAllConfigs() {
  return prisma.siteConfig.findMany({
    where: { isActive: true },
    orderBy: { key: 'asc' },
  });
}

// 设置配置值（存在则更新，不存在则创建）
export async function setConfig(
  key: string,
  value: string,
  description?: string
) {
  return prisma.siteConfig.upsert({
    where: { key },
    update: { value, description },
    create: { key, value, description },
  });
}

// 删除配置
export async function deleteConfig(key: string) {
  return prisma.siteConfig.delete({
    where: { key },
  });
}

// 禁用配置
export async function disableConfig(key: string) {
  return prisma.siteConfig.update({
    where: { key },
    data: { isActive: false },
  });
}

// 启用配置
export async function enableConfig(key: string) {
  return prisma.siteConfig.update({
    where: { key },
    data: { isActive: true },
  });
}

// ========== 便捷方法 ==========

// 获取今日推荐的 Action ID
export async function getTodayRecommendActionId(): Promise<string | null> {
  return getConfig(CONFIG_KEYS.TODAY_RECOMMEND_ACTION_ID);
}

// 设置今日推荐的 Action ID
export async function setTodayRecommendActionId(actionId: string) {
  return setConfig(
    CONFIG_KEYS.TODAY_RECOMMEND_ACTION_ID,
    actionId,
    '今日推荐的 Action ID'
  );
}

// 获取公告
export async function getAnnouncement(): Promise<string | null> {
  return getConfig(CONFIG_KEYS.ANNOUNCEMENT);
}

// 设置公告
export async function setAnnouncement(content: string) {
  return setConfig(CONFIG_KEYS.ANNOUNCEMENT, content, '站点公告');
}
