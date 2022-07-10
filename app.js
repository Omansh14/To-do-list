// Getting all required elements
const inputBox= document.querySelector('.input-field input');
const addBtn= document.querySelector('.input-field button');
const todoList= document.querySelector('.todo-List');
const deleteAllBtn= document.querySelector('.footer button');

inputBox.onkeyup=() =>{
    let userData= inputBox.value;// getting user entered value
    if(userData.trim()!=0){
        addBtn.classList.add('active');// active the add button
    }

    else{
        addBtn.classList.remove('active');//unactive the add button
    }
}

showTasks();

//if user clicks on add button
addBtn.onclick=()=>{
    let userData= inputBox.value;
    let getLocalStorage= localStorage.getItem('New Todo');//getting local storage
    if(getLocalStorage==null){
        listArr= [];
    }
    else{
        listArr= JSON.parse(getLocalStorage);// transforming json into js object
    }

    listArr.push(userData);// pushing user data 
    localStorage.setItem('New Todo',JSON.stringify(listArr));//transforming js object into json string
    showTasks();
    addBtn.classList.remove('active');//unactive add button

}
    function showTasks(){
    let getLocalStorage= localStorage.getItem('New Todo');

    if(getLocalStorage==null){
        listArr=[];
    }
    else{
        listArr= JSON.parse(getLocalStorage);
    }

    const pendingNumb= document.querySelector('.pendingNumb');
    pendingNumb.textContent= listArr.length;

    if(listArr.length>0){
        deleteAllBtn.classList.add('active');//active the clear all button
    }
    else{
        deleteAllBtn.classList.remove('active');// unactive the clear all button
    }

    let newLiTag= '';
    listArr.forEach((element, index)=>{
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;

    });
    todoList.innerHTML= newLiTag;
    inputBox.value="";
}

//delete Task Function

function deleteTask(index){
    let getLocalStorage= localStorage.getItem('New Todo');
    listArr= JSON.parse(getLocalStorage);
    listArr.splice(index,1);// deleting particular indexed li
    // after removal of li, again updating local storage
    localStorage.setItem('New Todo',JSON.stringify(listArr));
    showTasks();
}

deleteAllBtn.onclick=()=>{
    listArr= [];
    localStorage.setItem('New Todo',JSON.stringify(listArr));
    showTasks();
}