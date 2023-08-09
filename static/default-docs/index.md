# 欢迎使用 DocMan

欢迎使用 DocMan ！如果您可以看到本文档，说明您的操作正确且 DocMan 在您的机器上正常运行，稍后您可以编辑或者删除本文档。

DocMan 是一款基于 Node.js 的文档站点构造系统，允许您将由 Markdown 编写的文档项目（文档、教程、笔记等等）出版为可以在浏览器中给用户阅读的 HTML 文档站点。本文简要的介绍 DocMan 的使用方法，关于 DocMan 的详细文档可以在我们的[官方网站](https://docman.monkeyhbd.com)查看。

## 准备

DocMan 基于 [Node.js](https://nodejs.org) ，在确认您的机器安装了 Node.js 后，使用 npm 全局安装 `docman-cli` ：

```shell
$ npm install docman-cli -g
```

测试 `docman-cli` 是否正确安装：

```shell
$ docman --help
```

或者

```shell
$ npx docman --help
```

## 创建

使用下面的命令可以创建一个 DocMan 实例：

```shell
$ docman create hello-world
```

文档项目通常就是 DocMan 实例下的 `docs` 子目录。默认情况下 `docman-cli` 会创建一个 “欢迎” 文档项目（本文档），如果您不希望自动创建文档项目，可以使用下面的命令，但请记得此后手动创建 `docs` ：

```shell
$ docman create hello-world --empty
```

安装 npm 依赖：

```shell
$ cd hello-world
$ npm install
```

## 构造

在上述步骤均完成之后，即可启动 DocMan 构造文档了：

```shell
$ npm run build
```

构造得到的 HTML 站点文件将会输出至 DocMan 实例的 `dist` 目录下。
