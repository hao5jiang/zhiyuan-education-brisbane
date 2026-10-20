# 学生登录第一阶段：Firebase 接入说明

此分支新增 `dist/student/login/` 中英文登录页面，支持邮箱密码登录、会话状态、重设密码与退出。页面没有注册入口，也不读取或保存学生课程、成绩、作业。当前 `firebase-config.js` 留空，登录表单不会显示，公开网站在合并前保持原样。

## 创建免费项目

1. 打开 [Firebase Console](https://console.firebase.google.com/)，创建项目，选择 Spark 免费方案。先不要添加付款方式或开通付费资源。
2. 在项目设置的“你的应用”中添加 Web 应用。复制 Web 应用配置中的 `apiKey`、`authDomain`、`projectId`、`appId`，填到 `dist/student/login/firebase-config.js`。这些是网页配置值；不要填入服务账号 JSON、管理员密钥或学生资料。
3. 在 Authentication → Sign-in method 中启用 Email/Password。先不要启用电话短信登录。
4. 在 Authentication → Settings → Authorized domains 中加入 `hao5jiang.github.io`。按 Firebase 控制台的实际要求核对域名设置。
5. 在 Authentication → Users 中建立测试账号。先用教育机构控制的测试邮箱；不要把密码写进 GitHub、聊天记录或页面文件。
6. 核对 Authentication 的邮件模板、密码规则和邮箱枚举保护。测试登录、刷新后会话、退出及重设密码邮件。
7. 上述测试通过后，再决定是否合并 PR 并公开学生登录入口。

## 数据与权限边界

- 登录成功后只显示 Firebase 返回的账号邮箱。页面没有连接真实学生记录，也不接收作业。
- 页面使用浏览器会话持久化；关闭浏览器会话后需重新登录。
- 隐藏网页注册按钮不能阻止有人直接调用 Firebase 的公开注册接口。真实学生资料接入前，必须另行设计账号准入与逐人权限；不要把“能够登录”当作“获准读取资料”。
- 以后接入数据库或作业文件时，应在服务端或 Firebase Security Rules 中按身份检查访问权限；网页按钮和路由不能代替权限控制。
- 若使用免费额度，超限或服务规则变化可能使登录或后续数据功能中断。上线真实数据前再次核对官方额度和隐私要求。

## 验证记录

已通过 `npm run check`、`node --check dist/student/login/login.js` 和 `git diff --check`。本地 GitHub Pages 项目子路径预览中，首页、学生演示、登录页、登录脚本、样式、配置及 Logo 返回 200；缺失页面返回 404。用 Chrome 无界面模式检查了 500 像素宽的登录页，未见布局溢出，登录表单在配置留空时保持隐藏。

待完成：配置 Firebase 项目后的真实账号端到端测试，包括中英文操作、密码重设与手机浏览器。没有项目配置时无法宣称真实登录已启用。

## 回滚

如果此功能日后合并到 `main`，可以撤销对应 PR 的合并提交并等待 GitHub Pages 工作流成功。撤销页面代码不会删除 Firebase 中已建立的账号；如要停用登录，还需在 Firebase Console 禁用 Email/Password 登录方式或停用该项目。
