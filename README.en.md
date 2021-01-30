# conventional-changelog-chestnut

#### Introduce

A `conventional-changelog` log template

The reference to[conventional-changelog-angular](https://github.com/conventional-changelog/conventional-changelog)

#### Installation preparation

Make sure you install the dependent packages first

- [commitizen](https://github.com/commitizen/cz-cli)
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

#### Install

```markdown
npm install conventional-changelog-chestnut --save-dev
```

#### Use

```json
{
	"scripts": {
		"changelog": "conventional-changelog -p chestnut -i CHANGELOG.md -s -r 0"
	}
}
```

#### Configuration

It needs to be in the project root directory create `.chestnutlogrc` file，A reference document is provided [here](https://gitee.com/bnuephjx/conventional-changelog-chestnut/blob/master/config/.chestnutlogrc)

##### types

type:  `Array`

The default parameter type is based on [commitizen](https://github.com/commitizen/cz-cli) provide，According to the `git commit message`的`type` output the log

Array element Settings must contain the `type` and `alias` fields

The array must have at least one item, otherwise the default configuration is used

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

show the submitter

```
{
	"authorName": false
}
```

##### authorEmail

type: `Boolean`, default: `false`

show the Email of submitter

```
{
	"authorEmail": false
}
```

#### License

MIT © [bnuephjx](https://gitee.com/bnuephjx)