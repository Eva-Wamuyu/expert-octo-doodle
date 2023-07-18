let alltasks = []

let form = document.querySelector('.inputform')
let newtodo = document.getElementById('new-todo-input')
let checkbox = document.querySelector('#checkBox')

checkbox.addEventListener('click', ()=>{
    // console.log(checkbox.checked);
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(newtodo.value !== ''){
        alltasks.push({
            task: newtodo.value,
            checked: checkbox.checked
        })

        newtodo.value= '';
        checkbox.checked= false

        renderTasks()

        console.log(alltasks);
    }
})

function renderTasks(){
    let taskItems = document.querySelectorAll(".lower-inner .taskitem");

    taskItems.forEach(el=>el.remove())

    alltasks.forEach(({
        task,
        checked
    }, index)=>{
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.className = "itemcheckbox"
        checkbox.checked = checked

        let taskContainer = document.createElement('div')
        taskContainer.className = 'singletask';
        taskContainer.textContent = task
        taskContainer.style.textDecoration = "none"
        if(checkbox.checked == true){
            taskContainer.style.textDecoration = 'line-through'
        }
        checkbox.addEventListener('click' , ()=>{
            if(taskContainer.style.textDecoration == "none"){
                taskContainer.style.textDecoration = "line-through"
            }else{
                taskContainer.style.textDecoration = "none"
            }
        })

        let taskitem = document.createElement('div')
        taskitem.className="taskitem";

        taskitem.appendChild(checkbox)
        taskitem.appendChild(taskContainer)

        let alltasksContainer = document.querySelector('.lower-inner')
        alltasksContainer.appendChild(taskitem)
    })
}