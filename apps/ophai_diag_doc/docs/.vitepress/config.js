
export default {
  title: 'RetiSan Pro文档',
  description: 'RetiSan Pro文档集',
  base: '/doc',
  server: {
    port: 5174
  },
  themeConfig: {
    appearance: false,
    // 优化配置以实现左右布局，左侧导航栏可伸缩
    sidebar: [
      { text: '项目概览', link: '/index' },
      {
        text: '技术架构',
        items: [
          {
            text: '前端架构',
            items: [
              { text: '技术栈与核心功能矩阵', link: '/architecture/frontend/functional.md' },
              { text: '工程架构设计', link: '/architecture/frontend/architecture.md' },
              { text: '性能优化方案', link: '/architecture/frontend/optimization.md' },
              { text: '代码规范体系', link: '/architecture/frontend/specification.md'},
              { text: '演进与扩展', link: '/architecture/frontend/evolution.md' }
            ]
          },
          {
            text: '后端架构',
            items: [
              // { text: '微服务设计', link: '/architecture/backend/microservices' },
              // { text: '数据安全机制', link: '/architecture/backend/security' },
              // { text: '高并发处理', link: '/architecture/backend/concurrency' }
              { text: '后端设计概要', link: '/architecture/backend/README.md' },
            ]
          },
          {
            text: '模型服务',
            items: [
              { text: '多模态眼底图像智能分析系统', link: '/architecture/model/MFIIAS.md' },
              { text: '疾病分类模型（SE-Xception）', link: '/architecture/model/SE-Xception.md' },
            ]
          }
        ]
      },
      // {
      //   text: '部署运维',
      //   items: [
      //     { text: '通信协议', link: '/deploy/protocols/' },
      //     { text: '云原生部署', link: '/deploy/cloud/' },
      //     { text: '监控告警', link: '/deploy/monitoring/' }
      //   ]
      // },
      // {
      //   text: '扩展设计',
      //   link: '/extend/multimodal.md'
      // },
      // {
      //   text: '附录',
      //   link: '/appendix/appendix.md'
      // }
    ],
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/openharmony',},
    //   { icon: 'github', link: 'https://github.com/openharmony' },
    //   { icon: 'github', link: 'https://github.com/openharmony' }
    // ],
    footer: {
      message: 'RetiSan Pro文档集',
      copyright: 'Copyright © 2025 RetiSan Pro'
    }
  },
}