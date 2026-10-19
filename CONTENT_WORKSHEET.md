# 致远教育网站内容填写表

当前公开页面保留已有课程文字、活动照片与 2026 年第四学期课表。本表供负责人逐步提供正式内容；填写后再核对英文和中文页面。请勿在此文件填写学生姓名、联系方式、成绩或作业。

网站结构：关于致远 → 课程 → 教学理念 → 活动 → 课表 → 报名申请演示。页脚提供同样的主要入口。学生页面目前只使用虚构示例；正式登录功能留待后续设计。

| 栏目 | 中文内容 | English copy | 对应位置 |
| --- | --- | --- | --- |
| 一句话介绍 | 待填写 | To be supplied | 首页主视觉与简介 |
| 学校简介 | 待填写 | To be supplied | 关于致远 / 教学理念 |
| 开课年级及科目 | 请核对当前 8–11 年级与 IB、Methods、Specialist 信息 | Confirm current year levels and subjects | 课程卡片 |
| 各课程目标与适合学生 | 待填写 | To be supplied | 课程卡片 |
| 教学方式 | 待填写 | To be supplied | 教学理念 |
| 活动说明 | 请核对照片说明与公开使用许可 | Confirm event text and photo permission | 活动图片区 |
| 当前课表 | 请核对日期、时间及地点 | Confirm dates, times and venue | 课表 |
| 上课地点 | 租用 Mansfield State High School 场地；请提供准确到访指引 | Classes in rented rooms at Mansfield State High School; provide arrival directions | 首页与页脚 |
| 正式报名方式 | 待确定接收渠道及隐私说明 | Confirm submission channel and privacy notice | 报名申请页面 |
| 对外联系方式 | 待填写并确认公开许可 | To be supplied and approved for publication | 后续联系栏目 |
| 社交媒体链接 | 如需展示，请提供官方链接 | Supply official links if needed | 后续页脚 |

## 编辑说明

- 首页文字在 `dist/index.html`。每段中英文字分别放在 `data-zh` 和 `data-en`；英文默认显示在标签内部。更新时保持英文显示文字与 `data-en` 一致。
- 课表也在 `dist/index.html` 的 `id="timetable"` 区域。改课表时同步检查报名演示的班级选项。
- 报名页在 `dist/enrol/`，学生演示在 `dist/student/`。当前两者不接收真实资料。
- 图片在 `dist/images/`。请确认照片公开使用许可后再添加新照片。
- 正式登录、资料接收及作业上传需要单独确认身份验证、权限、存储和隐私流程。
