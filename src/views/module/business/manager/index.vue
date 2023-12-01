<template>
  <div class="md-content">
    <div class="sidebar">
      <div v-html="tocContent" />
    </div>
    <div class="content" v-html="htmlMD" />
  </div>
</template>
<script>
  import axios from 'axios'
  import markdownIt from 'markdown-it'
  import markdownItAnchor from 'markdown-it-anchor'
  import markdownItTocDoneRight from 'markdown-it-toc-done-right'
  import uslug from 'uslug'
  export default {
    data() {
      return {
        htmlMD: '',
        tocContent: ''
      }
    },
    mounted() {
      this.loadMd()
    },
    methods: {
      loadMd() {
        axios.get(`${window.location.protocol}//${window.location.host}/test.md`).then(res => {
          // 结合当前路由生成相应锚点
          const uslugify = s => uslug('/business/manager/#' + s, { allowedChars: ['/', '#'] })
          const md = markdownIt({
            html: true,
            typographer: true
          })
            .use(markdownItAnchor, { // 给生成的标题加唯一ID
              permalink: true,
              permalinkSymbol: '',
              slugify: uslugify
            })
            .use(markdownItTocDoneRight, { // 生成锚点菜单
              includeLevel: [1, 2]
            })
          const result = md.render(res) // 将Markdown文件转为html字符串
          this.htmlMD = result
          this.generateToc(res, md)
        })
      },
      generateToc(markdownText, md) {
        let tocHtml = ''
        const tokens = md.parse(markdownText, {}) // 解析为token数组
        console.log('tokens', tokens)
        tokens.forEach((token, index) => {
          if (token.type === 'heading_open') { // 标题的开始标签节点
            const anchor = token.attrGet('id') // 获取标题的id
            let title = ''
            const nextToken = tokens[index + 1]
            if (nextToken.type === 'inline') {
              // 如果下一个标记是文本标记，则将其内容作为标题内容
              title = md.renderer.render(nextToken.children, md.options, {})
            } else {
              // 否则使用默认的标题内容
              title = md.renderer.renderToken(tokens[index + 1], md.options, {})
            }
            tocHtml += `<a href="#${anchor}">${title}</a><br>` // 渲染为锚点链接
          }
        })
        this.tocContent = tocHtml
      }
    }
  }
</script>
<style lang="scss" scoped>
.md-content {
  display: flex;
  .sidebar{
    position: sticky;
    top: 0;
    width: 300px;
    padding: 20px;
    background-color: #f0f0f0;
    overflow-y: auto;
    ul {
      list-style: none;
      padding: 0;
      li {
        margin-left: 10px;
      }
    }
    a {
      display: inline-block;
      margin-bottom: 5px;
    }
  }
  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    text-align: left;
  }
}
</style>
