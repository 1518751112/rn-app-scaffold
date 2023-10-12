=== app react-native 框架 ===


##项目部署
**运行环境**
- `系统` windows 、macOS
- `node` 16.0.0+
- `react` 18.2.0
- `react-native` 0.72.5
- `java` 11以及以上 测试为17

**部署命令**
```shell
# 安装依赖
yarn install

#配置依赖文件
.env

#启动

#调试模式 不需要编译
yarn run start
yarn run android

#android 设置临时环境变量
set JAVA_HOME=D:\Java\jdk-11.0.2
```


## 项目配置

**项目中的常用环境**

- `dev` 开发、本地环境

- `test` 测试、调试环境

- `prod` 正式、线上环境


---技术栈：nestjs + mysql + sequelize + jwt + cos + ts
## 目录结构
```shell
src 目录结构:
|-- common //公用模块
| |-- constant.ts //常量
| |-- interface //ts 接口
| |-- type //ts 类型
|-- componests //组件
|-- configs //公共库
| |-- index.ts //一些配置参数
| |-- ... // 其它
|-- modules //主要业务实现
|-- utils //工具库
| |-- dva16.ts //接口请求封装与参数缓存
| |-- ... // 其它
|-- views //页面
|-- App.tsx //启动函数，配置 app
```
---使用流程---

1. 配置文件
   拷贝 .env.example 到 .env
   修改.env 中 PORT、APP_NAME、HOME_PATH、DB_DATABASE 等参数和项目一致
   GIT_CI_AUTHORIZE 为 gitlab ci 的 邮箱，用于自动部署 |分割
   在提交代码时 添加，$更新服务$ 会自动触发 gitlab ci，自动部署到服务器
   需要将服务器的地址添加到 gitlab ci 的钩子中
2. 依赖安装与启动
   npm i
   npm run dev

3. 业务开发
