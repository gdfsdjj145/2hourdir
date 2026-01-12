// 分类数据
export const categories = [
  {
    id: 'page',
    title: '写一个页面',
    subtitle: 'Page Output',
    description: '快速搭建各类页面，从 Landing Page 到产品官网',
    icon: 'LuLayout',
    gradient: 'from-blue-500 to-cyan-500',
    scenarios: ['想快速验证想法', '展示产品/项目', '活动推广'],
    defaultTool: 'mvpfast',
  },
  {
    id: 'feature',
    title: '写一个功能',
    subtitle: 'Feature Output',
    description: '快速实现各类功能模块，登录、表单、上传等',
    icon: 'LuCode2',
    gradient: 'from-purple-500 to-pink-500',
    scenarios: ['SaaS/小产品核心功能', '快速原型验证'],
    defaultTool: 'codebox',
  },
  {
    id: 'script',
    title: '写一个脚本',
    subtitle: 'Automation Output',
    description: '自动化脚本，提效工具，批处理任务',
    icon: 'LuTerminal',
    gradient: 'from-orange-500 to-red-500',
    scenarios: ['提效', '副业工具', '数据处理'],
    defaultTool: 'Python',
  },
  {
    id: 'content',
    title: '写一篇内容',
    subtitle: 'Content Output',
    description: '技术博客、产品文案、README 文档',
    icon: 'LuPenTool',
    gradient: 'from-green-500 to-teal-500',
    scenarios: ['个人品牌', '产品冷启动', '技术分享'],
    defaultTool: 'Claude',
  },
  {
    id: 'product',
    title: '做一个小产品',
    subtitle: 'Mini Product Output',
    description: '小工具站、API 服务、Chrome 插件',
    icon: 'LuBox',
    gradient: 'from-indigo-500 to-purple-500',
    scenarios: ['副业', '产品实验', 'MVP 验证'],
    defaultTool: 'mvpfast',
  },
];

// 输出项目数据
export const outputs = [
  // 写一个页面
  {
    id: 'landing-page-1',
    categoryId: 'page',
    title: '2 小时上线一个 Landing Page',
    difficulty: 2,
    output: '可访问 URL',
    description: '使用 mvpfast + Vercel，从零开始搭建一个专业的产品落地页，2 小时内完成部署上线。',
    goal: '完成一个可访问的产品落地页，包含 Hero 区域、功能介绍、CTA 按钮',
    deliverables: ['可访问的 URL', '响应式设计', '基础 SEO 配置'],
    doneDefinition: ['页面可正常访问', '移动端适配完成', '核心信息展示完整'],
    tools: [
      { name: 'mvpfast', role: '首选', description: '页面结构生成' },
      { name: 'TailwindCSS', role: '配合', description: '样式调整' },
      { name: 'Vercel', role: '部署', description: '上线' },
    ],
    timeAllocation: [
      { duration: 20, task: '生成页面结构' },
      { duration: 60, task: '样式调整与内容填充' },
      { duration: 20, task: '部署到 Vercel' },
      { duration: 20, task: '检查 & 优化' },
    ],
    pitfalls: ['不要纠结配色，使用默认主题即可', '不要添加额外功能，保持简洁', '不要过度设计，先上线再迭代'],
    nextSteps: ['添加数据统计', '接入表单收集', '优化 SEO'],
  },
  {
    id: 'portfolio-page',
    categoryId: 'page',
    title: '2 小时完成个人作品集页面',
    difficulty: 2,
    output: '可访问 URL',
    description: '搭建一个展示个人项目和技能的作品集网站',
    goal: '完成个人作品集页面，包含项目展示、技能介绍、联系方式',
    deliverables: ['可访问的 URL', '项目展示区', '联系表单'],
    doneDefinition: ['页面可正常访问', '至少展示 3 个项目', '联系方式可点击'],
    tools: [
      { name: 'mvpfast', role: '首选', description: '快速生成' },
      { name: 'Vercel', role: '部署', description: '上线' },
    ],
    timeAllocation: [
      { duration: 30, task: '选择模板并生成' },
      { duration: 60, task: '填充个人内容' },
      { duration: 30, task: '部署上线' },
    ],
    pitfalls: ['不要放太多项目', '保持信息简洁'],
    nextSteps: ['添加博客功能', '接入访问统计'],
  },
  {
    id: 'event-page',
    categoryId: 'page',
    title: '2 小时搭建活动报名页',
    difficulty: 2,
    output: '可访问 URL + 报名表单',
    description: '创建一个线上活动报名页面，包含活动介绍和报名功能',
    goal: '完成活动报名页，可收集报名信息',
    deliverables: ['活动介绍页面', '报名表单', '报名数据收集'],
    doneDefinition: ['页面展示完整', '表单可提交', '数据可查看'],
    tools: [
      { name: 'mvpfast', role: '首选', description: '页面生成' },
      { name: 'Tally', role: '配合', description: '表单收集' },
      { name: 'Vercel', role: '部署', description: '上线' },
    ],
    timeAllocation: [
      { duration: 20, task: '生成页面' },
      { duration: 40, task: '配置表单' },
      { duration: 40, task: '样式调整' },
      { duration: 20, task: '测试部署' },
    ],
    pitfalls: ['表单字段不要太多', '专注核心信息收集'],
    nextSteps: ['添加报名人数显示', '设置报名截止时间'],
  },

  // 写一个功能
  {
    id: 'login-feature',
    categoryId: 'feature',
    title: '2 小时实现邮箱登录功能',
    difficulty: 3,
    output: '可用的登录模块',
    description: '基于 NextAuth 快速实现邮箱密码登录功能',
    goal: '完成用户邮箱登录功能，包含注册、登录、退出',
    deliverables: ['登录表单', '注册流程', '会话管理'],
    doneDefinition: ['用户可注册', '用户可登录', '登录状态可保持'],
    tools: [
      { name: 'NextAuth', role: '首选', description: '认证框架' },
      { name: 'Prisma', role: '配合', description: '数据库' },
      { name: 'React Hook Form', role: '配合', description: '表单处理' },
    ],
    timeAllocation: [
      { duration: 20, task: '配置 NextAuth' },
      { duration: 40, task: '创建登录表单' },
      { duration: 40, task: '实现注册逻辑' },
      { duration: 20, task: '测试完整流程' },
    ],
    pitfalls: ['先用邮箱密码，不要一开始就接第三方', '密码加密用 bcrypt', '不要忘记错误处理'],
    nextSteps: ['添加邮箱验证', '接入第三方登录', '添加找回密码'],
  },
  {
    id: 'form-submission',
    categoryId: 'feature',
    title: '2 小时完成表单提交功能',
    difficulty: 2,
    output: '可用的表单系统',
    description: '创建一个完整的表单提交功能，包含前端验证和后端存储',
    goal: '完成表单系统，数据可正确保存',
    deliverables: ['表单页面', 'API 接口', '数据存储'],
    doneDefinition: ['表单可正常填写', '数据可正确提交', '后台可查看数据'],
    tools: [
      { name: 'React Hook Form', role: '首选', description: '表单处理' },
      { name: 'Zod', role: '配合', description: '数据验证' },
      { name: 'Prisma', role: '配合', description: '数据存储' },
    ],
    timeAllocation: [
      { duration: 30, task: '设计表单结构' },
      { duration: 40, task: '实现前端表单' },
      { duration: 30, task: '实现 API 接口' },
      { duration: 20, task: '测试完整流程' },
    ],
    pitfalls: ['字段不要太多', '必填项要明确', '错误提示要友好'],
    nextSteps: ['添加邮件通知', '添加数据导出'],
  },
  {
    id: 'file-upload',
    categoryId: 'feature',
    title: '2 小时实现文件上传功能',
    difficulty: 3,
    output: '可用的上传模块',
    description: '实现文件上传功能，支持图片预览和云存储',
    goal: '完成文件上传，文件可正确保存到云存储',
    deliverables: ['上传组件', '预览功能', '云存储集成'],
    doneDefinition: ['文件可选择', '预览正常', '上传成功'],
    tools: [
      { name: 'react-dropzone', role: '首选', description: '上传组件' },
      { name: '阿里云 OSS', role: '配合', description: '云存储' },
    ],
    timeAllocation: [
      { duration: 30, task: '配置云存储' },
      { duration: 50, task: '实现上传组件' },
      { duration: 30, task: '添加预览功能' },
      { duration: 10, task: '测试' },
    ],
    pitfalls: ['限制文件大小', '限制文件类型', '添加上传进度'],
    nextSteps: ['支持多文件上传', '添加压缩功能'],
  },

  // 写一个脚本
  {
    id: 'data-script',
    categoryId: 'script',
    title: '2 小时写一个数据处理脚本',
    difficulty: 2,
    output: '可运行的 Python 脚本',
    description: '使用 Python 处理 Excel/CSV 数据，完成清洗和转换',
    goal: '完成数据处理脚本，可批量处理数据文件',
    deliverables: ['Python 脚本', '使用文档', '示例数据'],
    doneDefinition: ['脚本可运行', '数据正确处理', '有错误处理'],
    tools: [
      { name: 'Python', role: '首选', description: '脚本语言' },
      { name: 'Pandas', role: '配合', description: '数据处理' },
      { name: 'Claude', role: '配合', description: '代码生成' },
    ],
    timeAllocation: [
      { duration: 20, task: '分析数据结构' },
      { duration: 60, task: '编写处理逻辑' },
      { duration: 30, task: '测试和调试' },
      { duration: 10, task: '编写使用说明' },
    ],
    pitfalls: ['先处理小样本', '注意编码问题', '保留原始数据'],
    nextSteps: ['添加命令行参数', '支持更多格式'],
  },
  {
    id: 'auto-publish',
    categoryId: 'script',
    title: '2 小时写一个自动发布脚本',
    difficulty: 3,
    output: 'GitHub Actions 配置',
    description: '配置 CI/CD，代码推送后自动部署到服务器',
    goal: '完成自动发布流程，push 后自动部署',
    deliverables: ['GitHub Actions 配置', '部署脚本', '使用文档'],
    doneDefinition: ['push 触发构建', '自动部署成功', '有失败通知'],
    tools: [
      { name: 'GitHub Actions', role: '首选', description: '自动化' },
      { name: 'Docker', role: '配合', description: '容器化' },
    ],
    timeAllocation: [
      { duration: 30, task: '配置 workflow' },
      { duration: 50, task: '编写部署脚本' },
      { duration: 30, task: '测试流程' },
      { duration: 10, task: '配置通知' },
    ],
    pitfalls: ['先测试 build 流程', '注意 secrets 配置', '添加构建缓存'],
    nextSteps: ['添加多环境部署', '添加回滚机制'],
  },

  // 写一篇内容
  {
    id: 'tech-blog',
    categoryId: 'content',
    title: '2 小时写一篇技术博客',
    difficulty: 1,
    output: '已发布的博客文章',
    description: '用 AI 辅助写作，完成一篇有价值的技术文章',
    goal: '完成并发布一篇技术博客',
    deliverables: ['文章正文', '配图', '发布链接'],
    doneDefinition: ['内容完整', '逻辑清晰', '已发布'],
    tools: [
      { name: 'Claude', role: '首选', description: '内容生成' },
      { name: 'Notion', role: '配合', description: '编辑排版' },
      { name: '掘金/知乎', role: '发布', description: '发布平台' },
    ],
    timeAllocation: [
      { duration: 20, task: '确定主题和大纲' },
      { duration: 60, task: 'AI 辅助写作' },
      { duration: 20, task: '润色和配图' },
      { duration: 20, task: '发布和推广' },
    ],
    pitfalls: ['不要贪多', '专注一个点', '保持原创性'],
    nextSteps: ['收集反馈', '持续更新'],
  },
  {
    id: 'readme-doc',
    categoryId: 'content',
    title: '2 小时完成项目 README',
    difficulty: 1,
    output: '完整的 README 文档',
    description: '为开源项目编写专业的 README 文档',
    goal: '完成项目 README，让人一眼看懂项目价值',
    deliverables: ['README.md', '示例代码', '效果图'],
    doneDefinition: ['结构清晰', '示例可运行', '有效果展示'],
    tools: [
      { name: 'Claude', role: '首选', description: '内容生成' },
      { name: 'Shields.io', role: '配合', description: '徽章生成' },
    ],
    timeAllocation: [
      { duration: 20, task: '梳理项目信息' },
      { duration: 50, task: '编写各章节' },
      { duration: 30, task: '添加示例和图片' },
      { duration: 20, task: '检查和优化' },
    ],
    pitfalls: ['保持简洁', '示例要可运行', '及时更新'],
    nextSteps: ['添加 CONTRIBUTING', '添加 CHANGELOG'],
  },

  // 做一个小产品
  {
    id: 'tool-site',
    categoryId: 'product',
    title: '2 小时做一个工具站',
    difficulty: 3,
    output: '可用的在线工具',
    description: '快速搭建一个单功能在线工具网站',
    goal: '完成一个可用的在线工具，解决一个具体问题',
    deliverables: ['工具页面', '核心功能', '使用说明'],
    doneDefinition: ['功能可用', '界面友好', '可分享'],
    tools: [
      { name: 'mvpfast', role: '首选', description: '快速开发' },
      { name: 'Vercel', role: '部署', description: '上线' },
    ],
    timeAllocation: [
      { duration: 20, task: '确定工具功能' },
      { duration: 80, task: '实现核心逻辑' },
      { duration: 20, task: '部署上线' },
    ],
    pitfalls: ['只做一个功能', '先 MVP 后优化', '收集用户反馈'],
    nextSteps: ['添加更多功能', '优化用户体验'],
  },
  {
    id: 'chrome-extension',
    categoryId: 'product',
    title: '2 小时做一个 Chrome 插件',
    difficulty: 3,
    output: '可安装的插件',
    description: '开发一个简单实用的 Chrome 浏览器插件',
    goal: '完成 Chrome 插件开发，可本地安装使用',
    deliverables: ['插件代码', '安装包', '使用说明'],
    doneDefinition: ['插件可安装', '功能正常', '有图标'],
    tools: [
      { name: 'Chrome API', role: '首选', description: '插件开发' },
      { name: 'Claude', role: '配合', description: '代码生成' },
    ],
    timeAllocation: [
      { duration: 20, task: '设计功能' },
      { duration: 70, task: '开发实现' },
      { duration: 20, task: '测试调试' },
      { duration: 10, task: '打包' },
    ],
    pitfalls: ['功能单一', '权限最小化', '图标要清晰'],
    nextSteps: ['发布到商店', '收集反馈迭代'],
  },
];

// 获取分类数据
export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

// 获取分类下的输出列表
export function getOutputsByCategory(categoryId: string) {
  return outputs.filter((o) => o.categoryId === categoryId);
}

// 获取单个输出详情
export function getOutput(id: string) {
  return outputs.find((o) => o.id === id);
}

// 获取今日推荐
export function getTodayRecommend() {
  // 简单实现：随机返回一个或者返回第一个
  return outputs[0];
}
