let form = document.querySelector('.inputform');
let newtodo = document.getElementById('new-todo-input');
let checkbox = document.querySelector('.checkbox');


let completedButton = document.querySelector('#completed');
let activeButton = document.querySelector('#active');
let allButton = document.querySelector('#all');


let body = document.getElementsByTagName("body");

let alltasks = getItemsfromLocalStorage();


let toggle = document.getElementById("toggle-icon");


let numberTasks = document.getElementById("number");

let lowest = document.querySelector(".lowest");

let clearButton = document.getElementById("clear");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let alltasks = getItemsfromLocalStorage();
    if(newtodo.value !== ''){
        alltasks.push({
            task: newtodo.value,
            checked: checkbox.checked
        })
        

        newtodo.value= '';
        checkbox.checked= false

        setItemstoLocalStorage(alltasks)
        renderTasks(alltasks)
        updateBottom();
       
    }
})
allButton.addEventListener('click',()=>{
    let alltasks = getItemsfromLocalStorage();
    renderTasks(alltasks);
    
});

completedButton.addEventListener('click',()=>{
    let alltasks = getItemsfromLocalStorage();
    let completedTasks = alltasks.filter(task => task.checked);
    renderTasks(completedTasks)
});

activeButton.addEventListener('click',()=>{
    let alltasks = getItemsfromLocalStorage();
    let activeTasks = alltasks.filter(task => !task.checked);
    renderTasks(activeTasks);  
});



let renderTasks = (alltasks)=>{
    let taskItems = document.querySelectorAll(".lower-inner .taskitem");

    taskItems.forEach(el=>el.remove())



    alltasks.forEach(({
        task,
        checked
    }, index)=>{
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.className = "checkbox"
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
                taskContainer.style.textDecoration = "line-through";
                alltasks[index].checked = true;
                setItemstoLocalStorage(alltasks);
                updateBottom();
              
                
                
                
            }else{
                taskContainer.style.textDecoration = "none"
                alltasks[index].checked = false
                setItemstoLocalStorage(alltasks);
                updateBottom();
            }
        })

        let taskitem = document.createElement('div')
        taskitem.className="taskitem";

        taskitem.appendChild(checkbox)
        taskitem.appendChild(taskContainer)

        let alltasksContainer = document.querySelector('.lower-inner')
        alltasksContainer.appendChild(taskitem)
        updateBottom();

})
}


toggle.addEventListener('click',()=>{
    let sunIcon = './assets/icon-sun.svg';
    let moonIcon = './assets/icon-moon.svg';
    let body = document.body;
    let bottomInner = document.querySelector(".bottom-inner");
    let lowerInner = document.querySelector('.lower-inner');
    let upperInner = document.querySelector('.input-div');
    let radio = document.querySelector("#radio");

    if(body.classList.contains('light')){
        setDarkColor(bottomInner);
        setDarkColor(lowerInner);
        setDarkColor(upperInner);
        setDarkColor(newtodo);
        setDarkColor(radio);
        setDarkColor(lowest);
        
        body.classList.add('dark');
        body.classList.remove('light');
        toggle.src = sunIcon;

    }
    else{
        setLightColor(bottomInner);
        setLightColor(lowerInner);
        setLightColor(upperInner);
        setLightColor(newtodo);
        setLightColor(radio);
        setLightColor(lowest);
        body.classList.remove('dark');
        body.classList.add('light');
        toggle.src = sunIcon;
        toggle.src = moonIcon;

    }
   
});



clearButton.addEventListener("click", ()=>{
    
    let alltasks = getItemsfromLocalStorage();
    let activeTasks = alltasks.filter(task => !task.checked);

    setItemstoLocalStorage(activeTasks)
    renderTasks(getItemsfromLocalStorage()); 


    
})



function getItemsfromLocalStorage(){
    let storedItems = localStorage.getItem('alltasks');
    return JSON.parse(storedItems) ?? []
}

function setItemstoLocalStorage(alltasks){
    localStorage.setItem('alltasks', JSON.stringify(alltasks));
}

function setLightColor(div){
        Object.assign(div.style,{
            color: 'black',
            background: 'white'
        })
};


function setDarkColor(div){
        Object.assign(div.style,{
            background: "rgb(80, 79, 79)",
            color: 'white'
        })

};


function updateBottom(){
    
    let activeTasks = alltasks.filter(task => !task.checked);
    if (activeTasks.length>0){
        numberTasks.innerHTML = activeTasks.length+" Items Left";
    }
    else{
        numberTasks.innerHTML = "No Items Left";
    }
}


renderTasks(alltasks);

