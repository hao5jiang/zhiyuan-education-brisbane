# 学生中心演示与 Cloudflare 静态资源准备报告

## 范围与基线

- 开发分支：`feature/student-demo-cloudflare`，从 `main` 的 `54920a0` 建立。
- `main` 原有静态首页、图片、GitHub Pages 工作流及 `.openai/hosting.json` 已检查。GitHub Pages 工作流只在 `main` 推送或手动触发时发布。
- 本次未修改现有 GitHub Pages 部署、Sites 部署、正式域名或 Cloudflare 账号配置。
- 参考 [North Shore Coaching College](https://www.north-shore.com.au/) 的清晰导航与学生入口组织方式；页面文案、照片和代码均使用本项目内容。

## 改动清单

| 文件 | 内容 |
| --- | --- |
| `dist/index.html` | 新增相对路径学生中心入口；把 Mansfield 表述改为租用场地上课；改善手机导航。原有课程、活动照片及课表保留。 |
| `dist/student/index.html`, `student.css`, `app.js` | 新增 Dashboard、Courses、Assignments、Progress、Schedule、Profile 六个双语页面，以及互动练习和模拟提交。 |
| `dist/student/data-source.js` | 独立的数据访问模块，提供异步 `getSnapshot()`、`submitPractice()` 接口；当前只有内存中的虚构数据。 |
| `dist/404.html` | GitHub Pages 与 Cloudflare 共用的双语错误页面。 |
| `wrangler.jsonc` | Workers Static Assets 指向 `./dist`，采用 `404-page`，没有 Worker `main`。 |
| `package.json`, `package-lock.json` | 锁定 Wrangler `4.151.1`，提供本地预览、检查、部署和 Workers Builds 预览命令。 |
| `scripts/check-static.mjs`, `scripts/serve-prefix.mjs` | 静态源码检查与 GitHub Pages 子路径本地模拟。 |

## 数据边界

- 学生 Alex Chen、课程、日期、题目、分数均为虚构示例。
- 模拟提交只更新当前页面的内存状态；刷新后清空。页面没有文件选择器、登录、`/api/*` 请求、数据库或对象存储绑定。
- 将来接入真实系统时，替换 `data-source.js` 的实现，并在服务端验证身份与教师权限。届时可把结构化记录交给 D1、文件交给 R2；现阶段不应把真实学生数据加入 `dist` 或 Git 仓库。

## 验证记录

以下检查在本地分支完成，尚不是 GitHub Pages 或 Cloudflare 的新生产部署。

| 检查 | 结果 |
| --- | --- |
| `npm run check`、`node --check`、`git diff --check` | 通过。 |
| Cloudflare 根路径：Wrangler 本地预览 `http://127.0.0.1:8787/` | 首页、`/student/`、JS、活动图片返回 200；未知路径和 `/api/demo` 返回 404，显示自定义 404 页面。 |
| GitHub Pages 项目子路径：本地模拟 `http://127.0.0.1:8788/zhiyuan-education-brisbane/` | 首页导航到 `student/`、学生中心返回首页、图片路径与错误页面均通过。 |
| 路由与刷新 | 六个页面可访问；直接进入练习页面后刷新仍显示该页面。 |
| 中英文切换 | 首页和学生中心均通过；练习反馈在中文下显示中文说明。 |
| 练习交互 | 错误答案与正确答案显示对应反馈；模拟提交计数增加；刷新后归零。 |
| 手机布局 | 390 × 844 视口复查首页和学生中心；修复了导航造成的横向溢出。 |
| 隐私边界 | 源码检查确认演示数据模块没有网络请求或浏览器持久化接口；本地 `/api/demo` 返回 404。真实账号、文件上传和权限控制未实现。 |

## Workers Builds 部署说明

此分支**没有连接 Cloudflare 账号或自动发布到 Cloudflare**。仓库已经具备连接 Workers Builds 所需的 `wrangler.jsonc` 与锁定依赖。审阅 PR 后，如决定建立一个独立演示 Worker：

1. 在 Cloudflare Workers & Pages 新建 Worker，连接 GitHub 仓库 `hao5jiang/zhiyuan-education-brisbane`。不要选择现有生产 Worker。
2. 在 **Settings → Build** 中设置根目录为仓库根目录；Build command 为 `npm run check`；Deploy command 为 `npm run deploy`；Preview command 为 `npm run preview`。Workers Builds 会按锁文件安装依赖。
3. 在 **Branch control** 中确认所选 production branch。连接后，推送到该分支会自动部署；非 production 分支的预览需启用 Preview Builds。连接前先确认目标 Worker 名称、分支和账号方案。
4. 当前 `wrangler.jsonc` 的 Worker 名称为 `zhiyuan-education-student-demo`。若账号中已有同名 Worker，应先改名，避免覆盖。

Cloudflare 的 [Workers Builds 配置](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) 与 [分支控制](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/) 文档说明了自动部署与预览分支行为。此处没有建立账号连接，因此 Cloudflare 自动部署尚未经过线上验证。

## 免费额度与风险

- Cloudflare [Static Assets](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) 的静态文件请求与资产存储目前不额外计费；这一点不涵盖将来的 Worker 脚本、D1 或 R2 用量。
- Workers 免费方案当前每个版本最多 20,000 个静态文件，单文件 25 MiB；Workers Builds 免费方案当前为每月 3,000 构建分钟、同时 1 个构建。以 [平台限制](https://developers.cloudflare.com/workers/platform/limits/) 和 [Builds 限制](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/) 的现行规则为准。
- 本次没有创建付费资源，也没有启用 D1、R2 或真实上传。若日后收集真实作业，应先设计登录、权限、保留期限、费用控制与隐私流程。
- `dist/student/` 是公开演示页面，不构成学生账号系统。虚构成绩不可当作真实成绩展示。

## 精确回滚步骤

目前尚未合并，也没有新 Cloudflare 部署。要撤回这次开发：

```powershell
gh pr close feature/student-demo-cloudflare
git push origin --delete feature/student-demo-cloudflare
git switch main
git branch -D feature/student-demo-cloudflare
```

上述命令只处理本次 PR 与分支。现有 `main` 的 GitHub Pages 和原 Sites 网站继续运行。若以后合并到 `main`，应在核对合并提交后执行 `git revert <合并提交SHA>`（普通合并提交使用 `git revert -m 1 <合并提交SHA>`），再推送 `main`，由现有 Pages 工作流发布回退版本。若未来另外部署 Cloudflare 演示 Worker，应在其版本历史中回退该 Worker，不要改动现有网站域名。
