var NewQA = require('cli-qa');
var struct = require("new-struct");
var format = require("format-text");

var Question = struct({
  defaultValue: defaultValue,
  isRequired: isRequired,
  lastAnswer: lastAnswer,
  prettify: prettify
});

module.exports = NewQuestion;

function NewQuestion (form, options) {
  var q = Question({
    QAQuestion: NewQA.NewQuestion(form.QA, options),
    form: form,
    options: options
  });

  q.QAQuestion.default = q.defaultValue();
  q.QAQuestion.title = q.prettify();

  return q;
}

function defaultValue (question) {
  if (question.options.default != undefined) {
    return question.options.default;
  }

  var lastAnswer = question.lastAnswer();

  if (Array.isArray(lastAnswer) && lastAnswer.length == 0) {
    return;
  }

  return lastAnswer;
}

function isRequired (question) {
  return !question.options.forOnce || question.lastAnswer() === undefined;
}

function lastAnswer (question) {
  return question.form.content.get(question.QAQuestion.key);
}

function prettify (question) {
  var template = "\n  {bold}{white}{title}{reset}{desc}{default}\n  {reset}{bold}{white}> {reset}";
  var title = question.options.title;
  var desc = question.options.desc;
  var def = question.defaultValue();

  if (def) {
    def = format('  (Default: {0})', JSON.stringify(def));
  }

  if (desc) {
    desc = format(' {0} ', desc);
  }

  return format(template, {
    title: title,
    desc: desc || '',
    default: def || ''
  });
}
