var NewForm = require('./');

var form = NewForm('~/projects.json', [
  { key: "github", title: "What's your Github handle?", default: process.env.USER, forOnce: true },
  { key: "workspace", title: "Where do you keep your code?", default: process.cwd(), forOnce: true },
  { key: "name", title: "What's your new project name?", expect: { len: [1], name: "Project Name" } },
  { title: "Starter", desc: "user/repo (Github) or a full Git URL to clone.", commaList: true },
  { title: "Github Repo?", default: "{github}/{name}" }
]);

form.ask(function (answers) {
  console.log(answers);
});
