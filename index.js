var struct = require("new-struct");
var NewDoc = require("config-doc");
var QA = require("cli-qa");
var format = require("format-text");

var Form = struct({
  ask: ask,
  questions: questions,
  isMissingQuestion: isMissingQuestion,
  formatQuestion: formatQuestion,
  rememberLastAnswer: rememberLastAnswer
});

module.exports = NewForm;

function NewForm (filename, options) {
  return Form({
    content: NewDoc(filename),
    options: options
  });
}

function ask (form, callback) {
  QA(form.questions(), function (answers) {

    var key;
    for (key in answers) {
      form.content.set(key, answers[key]);
    }

    callback(form.content.document);
  });
}

function questions (form) {
  var result = form.options
        .map(QA.normalizeQuestion)
        .filter(form.isMissingQuestion);

  result.forEach(form.rememberLastAnswer);
  result.forEach(form.formatQuestion);

  return result;
}

function isMissingQuestion (form, question) {
  return !question.forOnce || form.content.get(question.key) === undefined;
}

function formatQuestion (form, question) {
  var desc = question.desc || question.description || '';
  var defaultValue = '';

  if (question.default) {
    defaultValue = format('  (Default: {0})', question.default);
  }

  if (desc) {
    desc = format(' {0} ', desc);
  }

  question.title = format("\n  {bold}{white}{0}{reset}{1}{2}\n  {reset}{bold}{white}> {reset}", question.title, desc, defaultValue);
}

function rememberLastAnswer (form, question) {
  var last = form.content.get(question.key);

  if (question.default || !last) return;

  question.default = last;
}
