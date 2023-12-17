# vscode的`settings.json`配置

位置：File->Preferences->Settings->settings.json

```json
{
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "[javascript]": {
        "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "git.autofetch": true,
    "editor.tabSize": 2,
    "breadcrumbs.enabled": false,
    "editor.minimap.enabled": true,
    "terminal.integrated.tabs.location": "left",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    // tab 大小为2个空格
    "editor.tabSize": 2,
    // 100 列后换行
    "editor.wordWrapColumn": 100,
    // 开启 vscode 文件路径导航
    "breadcrumbs.enabled": true,
    // 选择 vue 文件中 template 的格式化工具
    "vetur.format.defaultFormatter.html": "prettyhtml",
    // 显示 markdown 中英文切换时产生的特殊字符
    "editor.renderControlCharacters": true,
    // 设置 eslint 保存时自动修复
    "eslint.autoFixOnSave": true,
    // eslint 检测文件类型
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    // vetur 的自定义设置
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "singleQuote": true,
            "semi": false
        }
    },
    "emmet.variables": {

    
    },
    "search.followSymlinks": false,
    "editor.fontLigatures": null,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "[jsonc]": {
        "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "[typescript]": {
        "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "workbench.editor.splitInGroupLayout": "vertical",
    "bracketPairColorizer.depreciation-notice": false,
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "workbench.editor.enablePreview": false,
    "window.zoomLevel": 1,
    "editor.indentSize": "tabSize"
}
```