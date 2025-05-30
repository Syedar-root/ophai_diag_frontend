# RetiSan Pro项目概览

## 一、项目简介
RetiSan Pro是一个基于 Spring Boot 开发的眼底医学后端业务管理系统，融合了 Redis 缓存、JPA、RabbitMQ、OSS 云存储等技术，采用微服务架构，实现了与 AI 诊断端的通信。

## 二、功能模块
### （一）医生用户管理系统
- **主要功能**：提供医生用户的增删改查、登录、注册、角色权限管理以及医生诊断建议管理等功能。
- **技术栈**：Spring Boot + JWT
- **数据库设计**：包含 `user` 表（用户 ID/用户名/密码/角色）和 `role` 表（角色 ID/权限列表）。
- **安全措施**：采用 JWT 双存储（Redis + Header）、密码 MD5 加密和 RBAC 权限拦截器。
- **关键接口**：`/api/user/login`（登录）、`/api/user/updateRole`（角色更新）

### （二）病例管理系统
- **主要功能**：实现病例的 CRUD 操作、分页查询、AI 诊断结果存储以及历史病例关联查询。
- **技术栈**：Spring Data JPA + Redis
- **数据库设计**：涉及 `case` 表（病例 ID/患者 ID/诊断状态）、`ai_result` 表（AI 诊断结果）和 `history_case` 表。
- **安全措施**：通过事务控制（@Transactional）和 Redis 分页缓存保障数据安全。
- **关键接口**：`/api/case/list`（分页查询）、`/api/case/updateNorDiag`（AI 诊断结果更新）

### （三）患者管理系统
- **主要功能**：进行患者档案管理、患者病例关联和批量病例查询。
- **技术栈**：Spring Boot + PageHelper
- **数据库设计**：包含 `patient` 表（患者 ID/姓名/年龄/性别）和 `patient_case` 表（患者 ID/病例 ID）。
- **安全措施**：使用 JWT 进行身份验证。
- **关键接口**：`/api/patient/list`（分页查询）、`/api/patient/batchSelect`（批量病例关联查询）

### （四）图表管理系统
- **主要功能**：生成统计图表，如新增趋势、年龄分布、性别分布等，实现跨系统诊断接口通信。
- **技术栈**：ECharts + Redis
- **数据库设计**：涉及 `statistic` 表（统计类型/数据）和 `cache_chart` 表（图表缓存）。
- **安全措施**：采用接口鉴权（JWT）和数据加密传输（HTTPS）。
- **关键接口**：`/api/chart`（图表数据生成）、`/api/chart/sendUrltoP`（外部诊断服务通信）

## 三、疾病分类模型（SE - Xception）
### （一）模型架构特色
采用两阶段渐进式训练策略，包括智能过采样和自适应学习率。智能过采样基于中位频率的动态样本扩增算法，有效缓解类别不平衡问题；自适应学习率采用余弦退火算法动态调整。

### （二）分阶式动态优化训练框架
独创两阶段自适应进化训练范式，结合医学影像特性与深度学习优化理论，实现模型性能的阶梯式跃迁。包含特征解耦 - 全域微调的渐进式优化路径，在公开数据集验证中，模型收敛速度提升 42%，最终准确率突破 90.1%。

### （三）训练效能验证
通过消融实验对比，两阶段训练在青光眼、白内障、近视的 F1 指标上均优于端到端训练。同时展示了混淆矩阵和性能报告。

### （四）性能对比分析
在模拟三甲医院真实场景的测试中，假阳性率降低至 2.1%，优于文献报道的 CARE 模型；处理单张图像仅需 288ms，满足实时诊断需求。

## 四、多模态眼底深度处理管线
### （一）多模态模型设计
采用 Qwen2.5 - VL - 72b 超大规模多模态模型，支持同时解析左眼 OCT 影像、右眼 OCT 影像和概率化诊断指标，实现影像特征与病理指标的跨模态注意力融合。

### （二）患者 QR 码报告生成
具有安全二维码生成和企业级功能支持的特性。安全二维码生成采用动态内容加密和抗干扰设计；企业级功能支持与草料 API 深度集成。

## 五、工程架构设计
### （一）系统架构设计
包括视图容器层（主布局视图）和核心业务层（路由系统、业务逻辑单元、全局状态管理、辅助功能模块）。

### （二）项目结构展示
web 端项目结构分为 libs（存放公共库）、features（存放功能模块）和 shared（存放共享组件）三部分。整个项目采用 `monorepo` 架构模式。

## 六、代码规范体系
### （一）ESLint 规范
按文件类型（Vue/TS/JS）差异化配置，实现分层治理，采用从 warning 到 error 的梯度规则，支持 --fix 自动修复 70% + 常见问题。

### （二）TypeScript 规范
具有防御性编程、文档即代码和架构隔离的优势，类型定义自动生成 API 文档。

### （三）Sass 规范
基于色阶算法生成系统化颜色变量，实现响应式阶梯和原子 CSS，提升样式复用率至 90% +。

### （四）组件规范
统一使用组合式 API，实现逻辑解耦、复用革命和类型推导。

### （五）目录结构
采用模块化设计，每个 feature 独立闭环开发，支持模块独立部署，通过 index.ts 统一出口控制模块访问权限。

### （六）命名规范
采用三维命名体系，具有搜索优化、新人指引和国际化的优势。

## 七、未来演进与扩展
### （一）架构扩展
包括微前端架构改造和容器化与编排，提高开发效率和项目的可维护性，实现资源的高效利用和自动化部署。

### （二）功能演进
引入人工智能和机器学习技术，增加智能化功能；扩展新的功能模块；优化系统性能；支持跨平台开发。

## 八、代码可用性
本系统的所有代码均开源，包括模型训练、数据处理、算法实现等，可通过以下链接访问完整代码：
- 业务后端代码：https://github.com/wzzzszh/ophai_diags_backend
- 算法后端代码：https://github.com/3362345814/A07_backend.git
- 疾病分类模型代码：https://github.com/3362345814/A07-ophai-diag-train.git
- 前端代码：https://github.com/Syedar-root/ophai_diag_frontend.git 