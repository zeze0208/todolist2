//유저가 값을 입력한다
//+버튼을 누르면 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 취소선이 생긴다
//(1)check버튼을 클릭하는 순간 true를 false로 바꿔준다
//(2)true이면 끝난 것으로 간주하고 취소선 보여주고
//(3)false이면 안 끝난 것으로 간주하고 그대로 두기
//진행중&끝남 탭을 누르면 언더라인이 이동하고, 각각에 맞는 task를 보여준다.
//전체 탭을 누르면 다시 전체 task 리스트로 돌아온다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line")
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

tabs.forEach((tab, index) => {
    tab.addEventListener("click",function(event){
        filter(event);
        moveUnderLine(event, index);
    });
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
    let taskContent = taskInput.value.trim();

    if (taskContent === "") {
        alert("할 일을 입력해주세요!");
        return;
    }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = filterList;
  } else if (mode === "done"){
    list = filterList;
  }

  let resultHTML = "";
  const buttonBox = (listId, imgState) => {
    return `<div class="button-box">
            <button class="checked-button" onclick="toggleComplete('${listId}')"><img src="images/${imgState?imgState:'checked'}.png" width="20"></button>
            <button onclick="deleteTask('${listId}')"><img src="images/bin.png" width="20"></button>
            </div>`;
  };

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    ${buttonBox(list[i].id, 'refresh')}
                    </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            ${buttonBox(list[i].id)}
            </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;    
      break;
    }
  }
  filterMode();
}

 
function filterMode() {
    filterList = [];
    if (mode === "all") {
      filterList = taskList;
    } else if (mode === "ongoing") {
      filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === "done") {
      filterList = taskList.filter(task => task.isComplete);
    }
    render();
  }
  
  
  function filter(event) {
    mode = event.target.id;
    filterMode();
  }
  

  function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    filterMode();
    
    console.log(taskList);
  }
  

// function filter(event) {

//   mode = event.target.id;
//   filterList = [];
//   if (mode === "all") {
//     render();
//   } else if (mode === "ongoing") {
//     for (let i = 0; i < taskList.length; i++) {
//       if (taskList[i].isComplete === false) {
//         filterList.push(taskList[i]);
//       }
//     }
//     render();
//     console.log("진행중", filterList);
//   } else if (mode === "done") {
//     for (let i = 0; i < taskList.length; i++) {
//       if (taskList[i].isComplete === true) {
//         filterList.push(taskList[i]);
//       }
//     }
//     render();
//   }
// }

function moveUnderLine(event, index) {
    const tab = event.target;
    underLine.style.left = tab.offsetLeft + "px";
    underLine.style.width = tab.offsetwidth + "px";
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
