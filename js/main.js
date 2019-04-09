

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
        taskDate: "" + document.getElementById('taskDate').value,
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
            let currentDate = Math.round(Date.now() / 60);
            let localValueDateNorm = Date.parse(localValueJSON.taskDate) / 60;
            let diff = currentDate - localValueDateNorm;
            diff = Math.round(diff / 60);
            let newLi = localValueName + "\n" + localValueType + "\n" + localValueDate + "\n";
            // document.getElementById("list").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>");

            if (localValueJSON.taskType === "Тип задачи: Личные задачи") {
                $("#personList").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>")
                if (localValueDateNorm < currentDate)
                    document.getElementById(localValueId).className += " red";
                if (diff < 0 && diff > -24000)
                    document.getElementById(localValueId).className += " yellow";
            }
            if (localValueJSON.taskType === "Тип задачи: Рабочие задачи") {
                $("#workList").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>")
                if (localValueDateNorm < currentDate) {
                    document.getElementById(localValueId).className += " red";
                }
                if (diff < 0 && diff > -24000)
                    document.getElementById(localValueId).className += " yellow";
            }
            $("#list").append("<li class='inProgress' " + "id='" + localValueId + "' onclick='complete(this)'><span onclick='deleteLi(this)'>X</span> " + newLi + "</li>")
            if (localValueDateNorm < currentDate)
                document.getElementById(localValueId).className += " red";
            if (diff < 0 && diff > -24000)
                document.getElementById(localValueId).className += " yellow";
        }
    }
}

function clrList() {
    localStorage.clear();
}
