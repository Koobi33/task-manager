

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
        taskName: "" + document.getElementById('taskName').value,
        taskType:  "Тип Задачи: " + document.getElementById('taskType').value,
        taskDate: "" + document.getElementById('taskDate').value,
        taskId: i,
        taskIsComplete: false,
    };
    var sNewTask = JSON.stringify(newTask);
    localStorage.setItem("newTask" + i, sNewTask);
}


function deleteLi(elem) {
    elem.parentElement.remove();
    localStorage.removeItem("newTask" + elem.parentElement.id)
}

function complete(elem) {
    if (elem.className === "inProgress") {
        elem.className = "completed";
        let isComplete = JSON.parse(localStorage.getItem("newTask" + elem.parentElement.id));
        isComplete.taskIsComplete = true;
        let strIsComplete = JSON.stringify(isComplete);
        localStorage.setItem("newTask" + elem.parentElement.id, strIsComplete);
    } else if (elem.className === "completed") {
        elem.className = "inProgress";
        let isComplete = JSON.parse(localStorage.getItem("newTask" + elem.parentElement.id));
        isComplete.taskIsComplete = false;
        let strIsComplete = JSON.stringify(isComplete);
        localStorage.setItem("newTask" + elem.parentElement.id, strIsComplete);
    }
}

function refactorTask(elemID) {
    var refactored = {
        taskName: "" + document.getElementById('taskNameRef').value,
        taskType:  "Тип Задачи: " + document.getElementById('taskTypeRef').value,
        taskDate: "" + document.getElementById('taskDateRef').value,
        taskId: elemID,
        taskIsComplete: false,
    };
    var strRefactored = JSON.stringify(refactored);
    localStorage.setItem("newTask" + elemID, strRefactored);
    location.reload();
}

function refactorLi(elem) {

    var elementStorage = JSON.parse(localStorage.getItem("newTask" + elem.parentElement.id));
    var div = document.createElement("div");
    div.className = "refactor";
    div.innerHTML = "<h1>Редактирование элемента " + elementStorage.taskName + "</h1>" + "<form><div class=\"form-row\">\n" +
        "                        <div class=\"form-group col-md-6\">\n" +
        "\n" +
        "                            <label for=\"taskName\"></label><input class=\"form-control\" type=\"text\" value=\"" + elementStorage.taskName + "\" id=\"taskNameRef\" placeholder=\"Новая задача\" name=\"taskName\">\n" +
        "                        </div>\n" +
        "                        <div class=\"form-group col-md-6\">\n";
    if (elementStorage.taskType === "Тип Задачи: Личные задачи"){
        div.innerHTML += "<label for=\"taskType\"></label><select class=\"form-control\" id=\"taskTypeRef\" name=\"taskType\">" +
            "                        <option selected='selected'>Личные задачи</option>\n" +
            "                        <option>Рабочие задачи</option>\n" +
            "                        </select>\n" +
            "                        </div>\n";
    }else if (elementStorage.taskType === "Тип Задачи: Рабочие задачи"){
        div.innerHTML += "<label for=\"taskType\"></label><select class=\"form-control\" id=\"taskTypeRef\" name=\"taskType\">" +
            "                        <option>Личные задачи</option>\n" +
            "                        <option selected='selected'>Рабочие задачи</option>\n" +
            "                        </select>\n" +
            "                        </div>\n";
    }
         div.innerHTML += "                        <div class=\"form-group sm col-3\">\n" +
        "                        <label for=\"taskDate\"></label> <input type=\"datetime-local\" value=\"" + elementStorage.taskDate + "\" id=\"taskDateRef\" name=\"taskDate\" min=\"2019-04-01T00:00\" max=\"2019-12-31T23:59\">\n" +
        "                        </div>\n" +
        "                        </div>\n" +
        "                        <button type=\"submit\" value=\"Создать\" formmethod=\"post\" class=\"btn btn-primary\" onclick=\"refactorTask(" + elementStorage.taskId + ");\">Изменить</button></form>";
    elem.parentElement.parentElement.appendChild(div);
}

function buildList() {

    if (localStorage.length > 0) {
        for (let j = 0; j < localStorage.length; j++) {
            let key = localStorage.key(j);
            let localValue = localStorage.getItem(key);
            let localValueJSON = JSON.parse(localValue);
            let localValueName = localValueJSON.taskName;
            let localValueType = localValueJSON.taskType;
            let localValueDate = new Date(localValueJSON.taskDate);
            localValueDate = localValueDate.toLocaleString();
            let localValueId = localValueJSON.taskId;
            let currentDate = Math.round(Date.now() / 60);
            let localValueDateNorm = Date.parse(localValueJSON.taskDate) / 60;
            let diff = currentDate - localValueDateNorm;
            diff = Math.round(diff / 60);

            let newLi = localValueName + "\n" + localValueType + "\n" + localValueDate + "\n";
            if (localValueJSON.taskType === "Тип Задачи: Личные задачи") {
                $("#personList").append("<li class='inProgress' " + "id='" + localValueId + "'><span onclick='deleteLi(this)'>X</span> <p class='inProgress' onclick='complete(this)'>" + newLi + "</p><span onclick='refactorLi(this)'>Редактировать</span> </li>");
                if (localValueJSON.taskIsComplete === true)
                    document.getElementById(localValueId).firstElementChild.nextElementSibling.className = "completed";
                if (localValueDateNorm < currentDate)
                    document.getElementById(localValueId).className += " red";
                if (diff < 0 && diff > -24000)
                    document.getElementById(localValueId).className += " yellow";
            }
            if (localValueJSON.taskType === "Тип Задачи: Рабочие задачи") {
                $("#workList").append("<li class='inProgress' " + "id='" + localValueId + "'><span onclick='deleteLi(this)'>X</span> <p class='inProgress' onclick='complete(this)'>" + newLi + "</p><span onclick='refactorLi(this)'>Редактировать</span> </li>");
                if (localValueJSON.taskIsComplete === true)
                    document.getElementById(localValueId).firstElementChild.nextElementSibling.className = "completed";
                if (localValueDateNorm < currentDate)
                    document.getElementById(localValueId).className += " red";
                if (diff < 0 && diff > -24000)
                    document.getElementById(localValueId).className += " yellow";
            }
            $("#list").append("<li class='inProgress' " + "id='" + localValueId + "'><span onclick='deleteLi(this)'>X</span> <p class='inProgress' onclick='complete(this)'>" + newLi + "</p><span onclick='refactorLi(this)'>Редактировать</span> </li>");
            if (localValueJSON.taskIsComplete === true)
                document.getElementById(localValueId).firstElementChild.nextElementSibling.className = "completed";
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
