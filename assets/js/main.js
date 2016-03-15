var tasks = [];

var completeTask = function () {
  var button = $(this);
  var item = button.parent();

  if (item.hasClass('completed')) {

    //uncomplete task
    item.removeClass('completed');
    button.addClass('fa-circle-thin').removeClass('fa-check-circle');

    item.remove().prependTo('.todos-list');

    var completed = false;

  } else {

    //complete task
    item.addClass('completed');
    button.removeClass('fa-circle-thin').addClass('fa-check-circle');

    item.remove().prependTo('.todos-completed');

    var completed = true;
  }

  var index = item.attr('id');
  var dbTaskIdx = _.findIndex(tasks, {id: index});
  tasks[dbTaskIdx].completed = completed;
  saveTasks();

};

var removeTask = function () {
  var button = $(this);
  var item = button.parent();

  item.slideUp().remove();

  var index = item.attr('id');

  _.remove(tasks, function(task) {return task.id == index});

  saveTasks();
};

var addTaskFromInput = function () {
  var input = $('.todos-task-input');
  var text = input.val();

  if (text == '') {
    return;
  }

  var newTask = {
    id: 'task-' + Math.floor(Math.random() * 100000),
    text: text,
    completed: false
  };

  addTask(newTask.id, newTask.text, newTask.completed);

  tasks = _.concat(tasks, newTask);
  saveTasks();

  input.val('').focus();
};

var addTask = function(id, text, completed) {
  if (completed) {
    var task = $('<li class="todos-item list-group-item completed " id="' + id + '">' +
      '<i class="todos-item-done fa fa-check-circle completed"></i>' +
      '<i class="todos-item-remove fa fa-trash-o"></i>' +
      text +
      '</li>');
    $('.todos-completed').prepend(task);
  } else {
    var task = $('<li class="todos-item list-group-item" id="' + id + '">' +
      '<i class="todos-item-done fa fa-circle-thin"></i>' +
      '<i class="todos-item-remove fa fa-trash-o"></i>' +
      text +
      '</li>');
    $('.todos-list').prepend(task);
  }
};

var saveTasks = function() {
  localStorage['tasks'] = JSON.stringify(tasks);
};

var isValidJson = function(text) {
  if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

    return true;

  }else{

    return false;

  }
};

var clearAll = function () {
  tasks = [];
  saveTasks();
  $('.todos-list').html('');
  $('.todos-completed').html('');
};

var clearCompleted = function () {
  _.remove(tasks, function(task) {return task.completed});

  saveTasks();
  $('.todos-completed').html('');
};

var init = function () {
  $('.todos-list, .todos-completed')
    .delegate('.todos-item-done', 'click', completeTask)
    .delegate('.todos-item-remove', 'click', removeTask);

  $('.todos-add-task').click(addTaskFromInput);
  $('.todos-clear-all').click(clearAll);
  $('.todos-clear-completed').click(clearCompleted);

  $('.todos-task-input').focus();

  var dbTasks = localStorage['tasks'];
  if (isValidJson(dbTasks)) {
    tasks = JSON.parse(dbTasks);
  } else {
    tasks = [];
  }
  addStoredTasks();
};


var addStoredTasks = function () {
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    addTask(task.id, task.text, task.completed);
  }
};

$(function() {
  init();
});

