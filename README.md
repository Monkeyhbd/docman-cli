# DocMan CLI - 命令行 DocMan 脚手架工具

DocMan CLI 是一款命令行 DocMan 脚手架工具，赋予您快速创建和管理 DocMan 实例的能力。

## 相关链接 / 参与贡献

- 官方文档：[DocMan Docs](https://docman.monkeyhbd.com)
- DocMan Core：[GitHub](https://github.com/monkeyhbd/docman) | [Gitee](https://gitee.com/monkeyhbd/docman) | [NPM](https://www.npmjs.com/package/docman-core)
- DocMan CLI（本项目）：[GitHub](https://github.com/monkeyhbd/docman-cli) | [Gitee](https://gitee.com/monkeyhbd/docman-cli) | [NPM](https://www.npmjs.com/package/docman-cli)

## 快速开始

安装 DocMan CLI ：

```shell
$ npm install docman-cli -g
$ docman --help
```

创建 DocMan 实例：

```shell
$ docman create hello-world
```

进入 DocMan 实例，安装 NPM 依赖，然后开始构建：

```shell
$ cd hello-world
$ npm install
$ npm run build
```

构造得到的 HTML 站点文件将会输出至 DocMan 实例的 `dist` 目录下，您可以使用 Web 服务器进行发布。
