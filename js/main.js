

function createTask() {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            var lastItem = localStorage.getItem(key);
        }
        var lastItemJSON = JSON.parse(lastItem);
        i = lastItemJSON.taskId + 1;

    } else {
        i = 1;
    }
    var newTask = {
        taskName: "Задача: " + document.getElementById('taskName').value,
        taskType: "Тип задачи: " + document.getElementById('taskType').value,
        taskDate: "Deadline: " + document.getElementById('taskDate').value,
        taskId: "" +  i
    };
    var sNewTask = JSON.stringify(newTask);
    localStorage.setItem("newTask" + i, sNewTask);
}
function deleteLi(elem) {
    elem.parentElement.remove();
    localStorage.removeItem("newTask" + elem.parentElement.id)
}

function complete(elem) {
    elem.className = (elem.className === "inProgress") ? "completed" : "inProgress";
}

function buildList() {
        if (localStorage.length > 0) {
            for (let j = 0; j < localStorage.length; j++) {
                let key = localStorage.key(j);
                let localValue = localStorage.getItem(key);
                let localValueJSON = JSON.parse(localValue);
                let localValueName = localValueJSON.taskName;
                let localValueType = localValueJSON.taskType;
                let localValueDate = localValueJSON.taskDate;
                let localValueId = localValueJSON.taskId;
               let newLi = localValueName + "\n" + localValueType + "\n" + localValueDate + "\n" ;
              // document.getElementById("list").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>");
               $("#list").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>")
            }
        }
   }

function buildPersonList() {
    if (localStorage.length > 0) {
        for (let j = 0; j < localStorage.length; j++) {
            let key = localStorage.key(j);
            let localValue = localStorage.getItem(key);
            let localValueJSON = JSON.parse(localValue);
            if (localValueJSON.taskType === "Тип задачи: Личные задачи") {
                let localValueName = localValueJSON.taskName;
                let localValueType = localValueJSON.taskType;
                let localValueDate = localValueJSON.taskDate;
                let localValueId = localValueJSON.taskId;
                let newLi = localValueName + "\n" + localValueType + "\n" + localValueDate + "\n";
                // document.getElementById("list").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>");
                $("#personList").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>")
            }
        }
    }
}

function buildWorkList() {
    if (localStorage.length > 0) {
        for (let j = 0; j < localStorage.length; j++) {
            let key = localStorage.key(j);
            let localValue = localStorage.getItem(key);
            let localValueJSON = JSON.parse(localValue);
            if (localValueJSON.taskType === "Тип задачи: Рабочие задачи") {
                let localValueName = localValueJSON.taskName;
                let localValueType = localValueJSON.taskType;
                let localValueDate = localValueJSON.taskDate;
                let localValueId = localValueJSON.taskId;
                let newLi = localValueName + "\n" + localValueType + "\n" + localValueDate + "\n";
                // document.getElementById("list").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>");
                $("#workList").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>")
            }
        }
    }
}

function clrList() {
    localStorage.clear();
}
