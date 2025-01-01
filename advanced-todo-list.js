let todoList = JSON.parse(localStorage.getItem('todoList'))||[{
  name: 'job1',
  dueDate: '2022-12-22',
  time: '12:00 AM',
  daysTill: '4'
}]; 
renderTodoList();
function renderTodoList(){
  let todoListHTML = '';

  for (let i = 0;i<todoList.length;i++){
    const todoObject = todoList[i];
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;
    const time = todoObject.time;
    const daysTill = todoObject.daysTill;
    
    const html = `
      <div>${name}</div>
      <div>Do by: ${dueDate}</div>
      <div> at ${time}</div>
      <div> ${daysTill} Days Remaining</div>
      <button onclick = "todoList.splice(${i},${i+1});
      localStorage.setItem('todoList', JSON.stringify(todoList));
      renderTodoList();" class = "delete-button">Remove</button>
    `;
    todoListHTML += html;
  }
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

let dateList = ['1'];
function addTodo(){
  const inputElement = document.querySelector('.js-todoitem');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  const timeElement = document.querySelector('.js-time-input');
  const time = timeElement.value;

  const dateString = dueDate + ' ' + time;
  let start = new Date(dateString);
  const current = new Date();
  const diff = (current - start) + ((start.getTimezoneOffset()-current.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff/oneDay);
  const daysTill = (day + 1) * -1;

  todoList.push({
    name,
    dueDate,
    time,
    daysTill
});
  inputElement.value = '';
  localStorage.setItem('todoList', JSON.stringify(todoList));
  
  
  
  renderTodoList();
}