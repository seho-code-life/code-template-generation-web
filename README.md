# 如何使用

    npm install code-template-generation-web -g --registry https://npm.registry.xian.develop.zhigui.com/

全局安装之后，请到一个拥有 package.json 的根目录中命令行运行下面的代码:

    seho start

# 工具🔧命令行指南

## options

- -h, --help 查看帮助
- -v, --version 工具版本
- -sp, --servicePort 工具后端运行地址 默认8899
- -cp, --clientPort 工具前端页面运行地址 默认8080

## commands

- help 查看帮助
- start 开启代码生成工具服务 (前后端一起开)
- create 选择模板拉取代码（目前只有一个模板内容还在完善中）
- service 开启代码生成工具的后端服务 (内置命令，方便维护者调试)
- client 开启代码生成工具的前端服务 (内置命令, 方便维护者调试)

# 目录结构

-bin<br>--main.js 命令行运行的入口文件<br>--start.js 启动工具的模块<br>--create.js 创建项目/拉取模板的模块<br>-src<br>--server 后端服务<br>---controllers 控制器<br>---routers 路由<br>---services 服务<br>---template 模板<br>---util 后端工具函数<br>---app.js 后端服务入口<br>--api 前端api接口管理器<br>--common 前端的普通模块包<br>--components 前端组件包<br>--router 前端路由<br>--views 前端页面<br>---index<br>---start.vue 开始配置的页面<br>---welcome.vue 欢迎页面

# 技术栈
- 前端 vue3 vueRouter4 Antdesign ts(用的极少)
- 后端 koa2 nodejs ejs

# 特性
1. 开发者选择技术栈并且通过工具拉取对于的模板 ✅
2. 在拉取之后模板上开启此工具进行API的生成 ✅
3. 前端业务模型生成 ❌
4. 生成统一风格的组件代码 ❌

# 目标
1. 技术栈统一
2. 代码风格统一
3. 无痛地初始化项目（初始化模板功能还未集成到工具中）
4. 前端API自助生成
5. 根据前端模型自助生成业务组件代码，拒绝CRUD