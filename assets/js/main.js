var completeTask = function () {
  var check = $(this);
  var item = check.parent();

  if (item.hasClass('completed')) {

    //uncomplete task
    item.removeClass('completed');
    check.addClass('fa-circle-thin').removeClass('fa-check-circle');

    item.remove().prependTo('.todos-list');

  } else {

    //complete task
    item.addClass('completed');
    check.removeClass('fa-circle-thin').addClass('fa-check-circle');

    item.remove().prependTo('.todos-completed');
  }
};

var removeTask = function () {
  $(this).parent().slideUp().remove();
};

var addTask = function () {
  var input = $('.todos-task-input');
  var text = input.val();

  if (text == '') {
    return;
  }

  var task = $('<li class="todos-item list-group-item">' +
    '<i class="todos-item-done fa fa-circle-thin"></i>' +
    '<i class="todos-item-remove fa fa-trash-o"></i>' +
    text +
    '</li>');
  $('.todos-list').prepend(task);

  input.val('');
};

$('.todos-list')
  .delegate('.todos-item-done', 'click', completeTask)
  .delegate('.todos-item-remove', 'click', removeTask);

$('.todos-add-task').click(addTask);