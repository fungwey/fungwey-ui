
const utils = require('./config/utils')
const striptags = require('./config/strip-tags')

const MarkdownItContainer = require('markdown-it-container')

// const vueMarkdown = {
//   preset: 'default',
//   breaks: true,
//   raw: true,
//   typographer: true,
//   preprocess: function(MarkdownIt, source) {
//     MarkdownIt.renderer.rules.table_open = function() {
//       return '<table class="table">'
//     }
//     MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)

//     // ```html `` 给这种样式加个class hljs
//     //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
//     //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
//     //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
//     // const fence = MarkdownIt.renderer.rules.fence
//     // MarkdownIt.renderer.rules.fence = function(...args){
//     //   args[0][args[1]].attrJoin('class', 'hljs')
//     //   var a = fence(...args)
//     //   return a
//     // }

//     // ```code`` 给这种样式加个class codeInline
//     const codeInline = MarkdownIt.renderer.rules.codeInline
//     MarkdownIt.renderer.rules.codeInline = function(...args) {
//       args[0][args[1]].attrJoin('class', 'codeInline')
//       return codeInline(...args)
//     }
//     return source
//   },
//   use: [
//     [MarkdownItContainer, 'demo', {
//       validate: params => params.trim().match(/^demo\s*(.*)$/),
//       render: function(tokens, idx) {
//         if (tokens[idx].nesting === 1) {
//           // const html = tokens[idx + 1].content
//           const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
//           // 移除描述，防止被添加到代码块
//           tokens[idx + 2].children = []

//           return `<demo-block>
//                         <div slot="desc">${html}</div>
//                         <div slot="highlight">`
//         }
//         return '</div></demo-block>\n'
//       }
//     }]
//   ]
// }

module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: './',
  lintOnSave: false, // 关闭eslint
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        preset: 'default',
        breaks: true,
        raw: true,
        typographer: true,
        preprocess: function (MarkdownIt, source) {
          MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="table">'
          }
          MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)

          // ```html `` 给这种样式加个class hljs
          //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
          //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
          //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
          // const fence = MarkdownIt.renderer.rules.fence
          // MarkdownIt.renderer.rules.fence = function(...args){
          //   args[0][args[1]].attrJoin('class', 'hljs')
          //   var a = fence(...args)
          //   return a
          // }

          // ```code`` 给这种样式加个class codeInline
          const codeInline = MarkdownIt.renderer.rules.codeInline
          MarkdownIt.renderer.rules.codeInline = function (...args) {
            args[0][args[1]].attrJoin('class', 'codeInline')
            return codeInline(...args)
          }
          return source
        },
        use: [
          [MarkdownItContainer, 'demo', {
            validate: params => params.trim().match(/^demo\s*(.*)$/),
            render: function (tokens, idx) {
              if (tokens[idx].nesting === 1) {
                // const html = tokens[idx + 1].content
                const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
                // 移除描述，防止被添加到代码块
                tokens[idx + 2].children = []

                return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`
              }
              return '</div></demo-block>\n'
            }
          }]
        ]
      })
  }
}
