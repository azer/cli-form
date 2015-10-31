## cli-form

Build user-friendly command-line forms easily.

![](https://cldup.com/U2M04exBeI.png)

## Install

```bash
$ npm install cli-form
```

## Usage

```js
var NewForm = require('cli-form')

var form = NewForm('~/.projects', [
  { key: "github", title: "What's your Github handle?", default: process.env.USER, forOnce: true },
  { key: "workspace", title: "Where do you keep your code?", default: process.cwd(), forOnce: true },
  { key: "name", title: "What's your new project name?", expect: { len: [1] } },
  { title: "Starter", desc: "user/repo (Github) or a full Git URL to clone.", default: "bud/react-starter" },
  { title: "Github Repo?", default: "{github}/{name}" }
])

form.ask(function (answers) {

  answers.github
  // => azer

  answers.starter
  // => bud/go-starter

})
```

## Reference

cli-form is a wrapper for [cli-qa](http://github.com/azer/cli-qa) module. In addition to what cli-qa's [Reference](https://github.com/azer/cli-qa#reference) lists;

* desc
* forOnce
