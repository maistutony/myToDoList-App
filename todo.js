//select dom elements
const todoInput=document.querySelector(".input-todo");
const addButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const validate=document.querySelector(".validate")
let todos=[];
//event listerners
window.addEventListener("DOMContentLoaded",displayLocal)
addButton.addEventListener('click',addTask);
todoList.addEventListener('click',deleteCheck);
todoInput.addEventListener("focus",removeClass)

function removeClass(){
  validate.innerText="";
  validate.classList.remove("error");
  addButton.style.height="27px";
  addButton.style.width="25px";
};

function displayUi(tasks){
  if(tasks.length==0){
    let emptyDiv=document.createElement("li");
    todoList.appendChild(emptyDiv);
   emptyDiv.innerText="No added Task";
   emptyDiv.classList.add("emptyTasks");
  }else{

    for (let i = 0; i < tasks.length; i++) {
      //create todo-div
      let todoDiv=document.createElement("div");
      todoDiv.classList.add("todo-div");
      todoDiv.setAttribute("data-taskId",tasks[i].id)
      //create li
      let todoItem=document.createElement("li");
      todoItem.classList.add("todo-item");
      todoItem.innerText=tasks[i].task;
      let timeStamp=document.createElement("li");
      timeStamp.classList.add("timeClass");
      timeStamp.innerText=tasks[i].timeAdded;
      todoDiv.appendChild(timeStamp)
  
      todoDiv.appendChild(todoItem);
  
       //create completed button
      let completed=document.createElement("button");
      completed.innerHTML="<i class='fa-solid fa-check' id='completed-icon'></i>";
      completed.classList.add("completed");
      todoDiv.appendChild(completed);
  
      //create delete button
  
      let deleteBtn=document.createElement("button");
      deleteBtn.innerHTML='<i class="fa-solid fa-trash trash-btn" id="delete-icon"></i>';
      deleteBtn.classList.add("delete");
      todoDiv.appendChild(deleteBtn);
  
      //finnal append
      todoList.appendChild(todoDiv);
   
 }
  }
}
function craeteTodo(todoItem){
  let task=todoItem;
  const time=new Date();
  let timeAdded=time.toLocaleString();
  let taskId=parseInt(Math.random()*1000);
  todos.push({task:task,timeAdded:timeAdded,id:taskId});
  saveToLocalStorage(todos);
  displayUi(todos);
}

function addTask(event){
    event.preventDefault();
    document.getElementsByClassName("todo-list")[0].innerText="";
    document.getElementsByClassName("todo-list")[0].classList.remove("emptyTasks");
    var x;
    x = todoInput.value;
    //check if value is available
    if (x === "") {
        validate.innerText="cannot submit blank task"
        validate.classList.add("error");
        addButton.style.width="40px";
        addButton.style.height="50px";
        setTimeout(()=>{
          removeClass();
        },2000);
        displayUi(todos);
        return false;
    }else{
     
      removeClass();
      craeteTodo(x);
    todoInput.value="";

    };
}
function deleteCheck(e){
   let item=e.target;
   let todo=item.parentElement;
   let id=todo.dataset.taskid;
  if(item.classList[0]==="delete"){
     let todo=item.parentElement;
     todo.remove();
     removeLocalTodo(id);
   }
  if(item.classList[0]==="completed"){
    let checked=item.parentElement;
    checked.classList.toggle("line-through");
  }
}
function removeLocalTodo(taskId){
  tasks=JSON.parse(localStorage.getItem("todos"));
 todos=tasks.filter(function(task) {
    return task.id!=taskId;
});
localStorage.setItem("todos",JSON.stringify(todos));

}


function saveToLocalStorage(tasks){
  localStorage.setItem("todos",JSON.stringify(tasks));
}
function displayLocal(){
  if(localStorage.getItem("todos")===null){
    let emptyDiv=document.createElement("li");
    todoList.appendChild(emptyDiv);
   emptyDiv.innerText="No added Task";
   emptyDiv.classList.add("emptyTasks");
  }
  else{
    tasks=JSON.parse(localStorage.getItem("todos"));
   tasks.forEach(task => {
    todos.push(task);
   });
 displayUi(todos);
  }
}

