var taskManager = ({


    add: function () {
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
        localStorage.setItem("" + newTask.taskName, sNewTask);
    },


    del: function (elem) {
        if(confirm("Вы действительно хотите удалить задачу " + elem.id )) {
            elem.parentElement.remove();
            localStorage.removeItem("" + elem.parentElement.id)
        }
    },


    set: function (elemID) {
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            let elem =  localStorage.getItem( localStorage.key( i ));
            let elemStr = JSON.parse(elem);
            if (elemStr.taskId === elemID){
                var refName = elemStr.taskName;
            }
        }
        var refactored = {
            taskName: "" + document.getElementById('taskNameRef').value,
            taskType:  "Тип Задачи: " + document.getElementById('taskTypeRef').value,
            taskDate: "" + document.getElementById('taskDateRef').value,
            taskId: elemID,
            taskIsComplete: false,
        };
        var strRefactored = JSON.stringify(refactored);
        localStorage.removeItem("" + refName);
        localStorage.setItem("" + refactored.taskName, strRefactored);
        location.reload();
    },


    complete: function (elem) {
        if (elem.className === "inProgress") {
            elem.className = "completed";
            let isComplete = JSON.parse(localStorage.getItem("" + elem.parentElement.id));
            isComplete.taskIsComplete = true;
            let strIsComplete = JSON.stringify(isComplete);
            localStorage.setItem("" + elem.parentElement.id, strIsComplete);
        } else if (elem.className === "completed") {
            elem.className = "inProgress";
            let isComplete = JSON.parse(localStorage.getItem("" + elem.parentElement.id));
            isComplete.taskIsComplete = false;
            let strIsComplete = JSON.stringify(isComplete);
            localStorage.setItem("" + elem.parentElement.id, strIsComplete);
        }
    },


    get: function () {
        if (localStorage.length > 0) {
            for (let j = 0; j < localStorage.length; j++) {
                let key = localStorage.key(j);
                let localValue = localStorage.getItem(key);
                let localValueJSON = JSON.parse(localValue);
                let localValueDate = new Date(localValueJSON.taskDate);
                let currentDate = Math.round(Date.now() / 60);
                let localValueDateNorm = Date.parse(localValueJSON.taskDate) / 60;
                let diff = currentDate - localValueDateNorm;
                diff = Math.round(diff / 60);

                let newLi = localValueJSON.taskName + "\n" + localValueJSON.taskType + "\n" + localValueDate.toLocaleString() + "\n";
                if (localValueJSON.taskType === "Тип Задачи: Личные задачи") {
                    let li = document.createElement('li');
                    li.id = localValueJSON.taskName;
                    li.innerHTML =  "<span onclick='taskManager.del(this)'>X</span> <p class='inProgress' onclick='taskManager.complete(this)'>" + newLi + "</p><span onclick='refactorLi(this)'>Редактировать</span>";
                    document.getElementById("personList").appendChild(li);
                    if (localValueJSON.taskIsComplete === true)
                        document.getElementById(localValueJSON.taskName).firstElementChild.nextElementSibling.className = "completed";
                    if (localValueDateNorm < currentDate)
                        document.getElementById(localValueJSON.taskName).className += " red";
                    if (diff < 0 && diff > -24000)
                        document.getElementById(localValueJSON.taskName).className += " yellow";
                }
                if (localValueJSON.taskType === "Тип Задачи: Рабочие задачи") {
                    let li = document.createElement('li');
                    li.id = localValueJSON.taskName;
                    li.innerHTML =  "<span onclick='taskManager.del(this)'>X</span> <p class='inProgress' onclick='taskManager.complete(this)'>" + newLi + "</p><span onclick='refactorLi(this)'>Редактировать</span>";
                    document.getElementById("workList").appendChild(li);
                    if (localValueJSON.taskIsComplete === true)
                        document.getElementById(localValueJSON.taskName).firstElementChild.nextElementSibling.className = "completed";
                    if (localValueDateNorm < currentDate)
                        document.getElementById(localValueJSON.taskName).className += " red";
                    if (diff < 0 && diff > -24000)
                        document.getElementById(localValueJSON.taskName).className += " yellow";
                }
                let li = document.createElement('li');
                li.id = localValueJSON.taskName;
                li.innerHTML =  "<span onclick='taskManager.del(this)'>X</span> <p class='inProgress' onclick='taskManager.complete(this)'>" + newLi + "</p><span onclick='refactorLi(this)'>Редактировать</span>";
                document.getElementById("list").appendChild(li);
                if (localValueJSON.taskIsComplete === true)
                    document.getElementById(localValueJSON.taskName).firstElementChild.nextElementSibling.className = "completed";
                if (localValueDateNorm < currentDate)
                    document.getElementById(localValueJSON.taskName).className += " red";
                if (diff < 0 && diff > -24000)
                    document.getElementById(localValueJSON.taskName).className += " yellow";
            }
        }
    },


    clear: function () {
        if (confirm("Вы уверены, что хотите очистить список задач?")) {
            localStorage.clear();
            location.reload();
        }
    }


});


function refactorLi(elem) {

    let elementStorage = JSON.parse(localStorage.getItem("" + elem.parentElement.id));



     let div = document.createElement("div");
    // div.className = "refactor";
    // let h1 = document.createElement('h1');
    // h1.innerText = "Редактирование элемента " + elementStorage.taskName;
    // let form = document.createElement('form');
    // div = document.getElementsByClassName('refactor');
    // elem.parentElement.parentElement.appendChild(div).appendChild(h);


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
        "                        <button type=\"submit\" value=\"Создать\" formmethod=\"post\" class=\"btn btn-primary\" onclick=\"taskManager.set("+ elementStorage.taskId +");\">Изменить</button></form>";
    elem.parentElement.parentElement.appendChild(div);
}



//     console.log(addEl);
        //     addEl.addEventListener('click', taskManager.add());
        // }
         //   addEl.addEventListener("click", taskManager.add(), false);
       // }
       // var clearEL = document.getElementsByClassName('clear');
       // clearEL.addEventListener('click', taskManager.clear());


