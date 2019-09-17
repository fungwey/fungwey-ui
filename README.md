
# 从0开始搭建Vue组件库 fungwey-ui

个人网站想要做一个类似 eleUI tabs 的效果，想着以后说不准别处也要用呢，而且以后可能还会有其他组件，索性就写一个自己的UI库吧。因为暂时还没想到要什么样式，所以目前没有css效果。

这里记录一下过程，只针对于个人网站定制需求进行开发。第一次发文讲不明白的我会继续修改

下面开始吧

- 参考文章(感谢这些作者)
- [从零开始搭建Vue组件库 VV-UI](https://zhuanlan.zhihu.com/p/30948290)
- [手把手带你撸一个vue组件库！](https://juejin.im/post/5afcd516f265da0b9e65414b)
- [vue插件开发、文档书写、github发布、npm包发布一波流](https://juejin.im/post/5b96586de51d450e7d0984a6)

## 前期准备

`Vue-cli3` `npm` `webpack`

## 正文

### 一、创建项目再进行一些配置

1. 创建一个默认的项目.

    ```bash
    vue create fungwey-ui
    # 安装如下
    ? Please pick a preset: Manually select features
    ? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter, Unit
    ? Use history mode for router? (Requires proper server setup for index fallback in production) No
    ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
    ? Pick a linter / formatter config: Standard
    ? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
    ? Pick a unit testing solution: Jest
    ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In package.json
    ? Save this as a preset for future projects? No
    ```

    ```bash
    # 安装完成
    🎉  Successfully created project fungwey-ui.
    👉  Get started with the following commands:

    $ cd fungwey-ui
    $ yarn serve
    ```

2. 调整目录结构.

    项目根目录(src同级目录)

    ```markdown
        .
        ...
        |- examples // 原 src 目录，改成 examples 用作示例展示
        |- packages // 新增 packages 用于编写存放组件
        ...
        .
    ```

    通过上面更改，会出现两个问题
    - `src` 改名 `examples` ，导致项目无法运行
    - 新增 `packages` 文件夹，该目录未加入 `webpack` 编译

    > cli3 提供一个可选的 `vue.config.js` 配置文件。如果这个文件存在则他会被自动加载，所有的对项目和webpack的配置，都在这个文件中。

    新建 `vue.config.js`,
    - `pages` 修改入口
    - `chainWebpack` 对 `packages` 目录进行处理

    ```markdown
    module.exports = {
        // 修改 src 目录 为 examples 目录
        pages: {
            index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
            }
        },
        lintOnSave: false // 关闭eslint
    }
    ```

    执行 `yarn serve` 此时可以运行项目。删除 HelloWorld 组件，清空 App.vue 里面内容

    ```markdown
    <template>
    <div id="app">
        <router-view/>
    </div>
    </template>
    <script>
    export default {
        name: 'app'
    }
    </script>
    ```

### 二、编写组件

1. 导入组件
    新建 `/packages/src/utils/util.js`,
        `/packages/tab-pane/index.js`,
        `/packages/tabs/index.js`,
        `packages/tabs/src/tabs.vue`,
        `packages/tabs/src/tab-pane.vue`,
        `packages/tabs/src/tab-nav.vue`,
        `packages/tabs/src/tab-bar.vue`

    文件内容 [GitHub]<>
    `/packages/tabs/index.js` 对组件进行导出

    ```js
    // 导入组件
    import Tabs from './tabs'
    import TabPane from './tab-pane/index.js'

    // 存储组件列表
    const components = [
        TabPane,
        Tabs
    ]

    // 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
    const install = function (Vue) {
        // 判断是否安装
        if (install.installed) return
        // 遍历注册全局组件
        components.map(component => Vue.component(component.name, component))
    }

    // 判断是否是直接引入文件
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue)
    }

    export default {
        // 导出install，可以 Vue.use() 全局引入
        install,
        // 以下是具体的组件列表，可以按需加载
        TabPane,
        Tabs
    }
    ```

2. 编写示例

    在 `examples/main.js` 导入组件库

    ```js
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'

    // 导入组件库
    import FungWeyUI from './../packages/index'
    // 注册组件库
    Vue.use(FungWeyUI)

    Vue.config.productionTip = false

    new Vue({
    router,
    render: h => h(App)
    }).$mount('#app')

    ```

    执行代码 `yarn serve` 启动成功了。

### 三、github发布

接下来上传github、设置github展示页。

1. 在github上新建一个项目

2. 上传代码
    - `git init` 初始化git项目
    - `git checkout -b master` 新建一个master分支
    - `git add .` 添加所有文件
    - `git commit -m "初始化项目"` git本地提交
    - `git remote add origin https://github.com/fungwey/fungwey-ui.git` 链接仓库
    - `git push origin master` 提交

3. 查看项目地址
    项目 -> Settings -> Options -> GitHub Pages -> Source 下 None 换成 master branch, 上面就可以看到地址了 `Your site is published at https://fungwey.github.io/fungwey-ui/`

### 四、发布npm包

首先需要到 npm 上注册一个账号。通过npm的邮件激活邮箱。

如果配置了淘宝镜像，重新配置回去。

```bash
npm config set registry http://registry.npmjs.org 
```

然后在终端执行登录命令，输入用户名、密码、邮箱(必须激活)即可登录。

```bash
yarn login
# 用户名、邮箱、密码
yarn publish
```

发布成功，就可用了。这个 [项目](https://github.com/fungwey/MyHomePage) 中 `views/search/index.js` 是实践
