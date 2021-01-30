# conventional-changelog-chestnut

#### 介绍

一款`conventional-changelog`日志模板

参考于[conventional-changelog-angular](https://github.com/conventional-changelog/conventional-changelog)

#### 安装准备

先确保安装依赖包

- [commitizen](https://github.com/commitizen/cz-cli)
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

#### 安装

```markdown
npm install conventional-changelog-chestnut --save-dev
```

#### 使用

```json
{
	"scripts": {
		"changelog": "conventional-changelog -p chestnut -i CHANGELOG.md -s -r 0"
	}
}
```

#### 配置

需要在项目根目录下创建`.chestnutlogrc`文件，这里提供了一份[参考文件](https://gitee.com/bnuephjx/conventional-changelog-chestnut/blob/master/config/.chestnutlogrc)

##### types

type:  `Array`

默认的参数类型是根据[commitizen](https://github.com/commitizen/cz-cli)提供，根据git commit message的type输出日志

数组元素设置必须包含`type`和`alias`字段

数组必须至少有一项，否则会使用默认配置

```
{
  "types": [
    {
      "type": "feat",
      "alias": "Features"
    }
  ]
}
```

##### authorName

type: `Boolean`, default: `false`

是否显示提交人

```
{
	"authorName": false
}
```

##### authorEmail

type: `Boolean`, default: `false`

是否显示提交人邮箱

```
{
	"authorEmail": false
}
```

#### License

MIT © [bnuephjx](https://gitee.com/bnuephjx)