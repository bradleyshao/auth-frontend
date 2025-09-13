# 认证系统前端

基于Next.js 14、Tailwind CSS和Ant Design构建的前端认证系统，与NestJS后端对接。

## 功能特性

- 用户登录
- 用户注册
- JWT认证
- 响应式设计
- 表单验证
- 状态管理

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Ant Design
- Axios

## 快速开始

1. 克隆项目

```bash
git clone https://github.com/your-repo/auth-frontend.git
cd auth-frontend
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

复制`.env.example`文件为`.env.local`，并根据需要修改配置：

```bash
cp .env.example .env.local
```

4. 启动开发服务器

```bash
npm run dev
```

5. 访问应用

打开浏览器访问 [http://localhost:3001](http://localhost:3001)

## 项目结构

```
src/
├── app/                    # 页面路由
│   ├── (auth)/             # 认证相关页面
│   │   ├── login/          # 登录页面
│   │   └── register/       # 注册页面
│   └── page.tsx            # 主页
├── components/             # 公共组件
├── contexts/               # React上下文
├── services/               # API服务
└── types/                  # 类型定义
```

## 构建生产版本

```bash
npm run build
npm run start
```

## 许可证

MIT