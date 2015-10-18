var struct = require("new-struct");
var NewDoc = require("config-doc");
var NewQA = require("cli-qa");
var NewQuestion = require("./question");
var format = require("format-text");

var Form = struct({
  ask: ask,
  questions: questions
});

module.exports = NewForm;

function NewForm (filename, options) {
  var f = Form({
    content: NewDoc(filename),
    options: options
  });

  f.QA = NewQA({ context: f.content.document });

  f.questions().forEach(function (q) {
    f.QA.questions.push(q.QAQuestion);
  });

  return f;
}

function ask (form, callback) {
  form.QA.start(function (answers) {

    var key;
    for (key in answers) {
      form.content.set(key, answers[key]);
    }

    callback(form.content.document);
  });
}

function questions (form) {
  var result = [];

  var i = -1;
  var len = form.options.length;
  var q;
  while (++i < len) {
    q = NewQuestion(form, form.options[i]);

    if (q.isRequired()) {
      result.push(q);
    }
  }

  return result;
}
