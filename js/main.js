(function () {
    var taskManager = {

        // Добавить элемент

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
            if (document.getElementById('taskName').value !== "") {
                var newTask = {
                    taskName: "" + document.getElementById('taskName').value,
                    taskType: "Тип Задачи: " + document.getElementById('taskType').value,
                    taskDate: "" + document.getElementById('taskDate').value,
                    taskId: i,
                    taskIsComplete: false,
                };

                var sNewTask = JSON.stringify(newTask);
                localStorage.setItem("" + newTask.taskName, sNewTask);
            }
        },

        // Удалить элемент

        del: function () {
            if (confirm("Вы действительно хотите удалить задачу " + this.id)) {
                this.parentElement.remove();
                localStorage.removeItem("" + this.parentElement.id)
            }
        },

// Изменить элемент

        set: function (elemID) {
            if (document.getElementById('taskNameRef').value !== "") {
                var refactored = {
                    taskName: "" + document.getElementById('taskNameRef').value,
                    taskType: "Тип Задачи: " + document.getElementById('taskTypeRef').value,
                    taskDate: "" + document.getElementById('taskDateRef').value,
                    taskId: elemID.taskName,
                    taskIsComplete: false,
                };
                var strRefactored = JSON.stringify(refactored);
                localStorage.removeItem("" + elemID.taskName);
                localStorage.setItem("" + refactored.taskName, strRefactored);
            }
            location.reload();
        },

// Пометить выполненным

        complete: function () {
            if (this.className === "inProgress") {
                this.className = "completed";
                let isComplete = JSON.parse(localStorage.getItem("" + this.parentElement.id));
                isComplete.taskIsComplete = true;
                let strIsComplete = JSON.stringify(isComplete);
                localStorage.setItem("" + this.parentElement.id, strIsComplete);
            } else if (this.className === "completed") {
                this.className = "inProgress";
                let isComplete = JSON.parse(localStorage.getItem("" + this.parentElement.id));
                isComplete.taskIsComplete = false;
                let strIsComplete = JSON.stringify(isComplete);
                localStorage.setItem("" + this.parentElement.id, strIsComplete);
            }
        },

// построение списка

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
                        li.innerHTML = "<span class='delone'>X</span> <p class='inProgress'>" + newLi + "</p><span class='refactor'>Редактировать</span>";
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
                        li.innerHTML = "<span class='delone'>X</span> <p class='inProgress' >" + newLi + "</p><span class='refactor'>Редактировать</span>";
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
                    li.innerHTML = "<span class='delone'>X</span> <p class='inProgress'>" + newLi + "</p><span class='refactor'>Редактировать</span>";
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

        // Очистить localStorage

        clear: function () {
            if (confirm("Вы уверены, что хотите очистить список задач?")) {
                localStorage.clear();
                location.reload();
            }
        },

        // Открыть меню редактирования

        refactorLi: function () {

            var elementStorage = JSON.parse(localStorage.getItem("" + this.parentElement.id));


            let div = document.createElement("div");
            // div.className = "refactor";
            // let h1 = document.createElement('h1');
            // h1.innerText = "Редактирование элемента " + elementStorage.taskName;
            // let form = document.createElement('form');
            // div = document.getElementsByClassName('refactor');
            // elem.parentElement.parentElement.appendChild(div).appendChild(h);

            div.id = "refactorDiv";
            div.innerHTML = "<h1>Редактирование элемента " + elementStorage.taskName + "</h1>" + "<form><div class=\"form-row\">\n" +
                "                        <div class=\"form-group col-md-6\">\n" +
                "\n" +
                "                            <label for=\"taskName\"></label><input class=\"form-control\" type=\"text\" value=\"" + elementStorage.taskName + "\" id=\"taskNameRef\" placeholder=\"Новая задача\" name=\"taskName\" required>\n" +
                "                        </div>\n" +
                "                        <div class=\"form-group col-md-6\">\n";


            if (elementStorage.taskType === "Тип Задачи: Личные задачи") {
                div.innerHTML += "<label for=\"taskType\"></label><select class=\"form-control\" id=\"taskTypeRef\" name=\"taskType\">" +
                    "                        <option selected='selected'>Личные задачи</option>\n" +
                    "                        <option>Рабочие задачи</option>\n" +
                    "                        </select>\n" +
                    "                        </div>\n";
            } else if (elementStorage.taskType === "Тип Задачи: Рабочие задачи") {
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
                "                        <button type=\"submit\" value=\"Создать\" formmethod=\"post\" class=\"btn btn-primary set\">Изменить</button></form>";
            if(document.getElementById('refactorDiv'))
                document.getElementById('refactorDiv').remove();
            this.parentElement.parentElement.appendChild(div);

                //ждем клик на кнопке формы изменения
                var setEl = document.getElementsByClassName("set");
                if(setEl) {
                    setEl[0].addEventListener('click', function () {
                       taskManager.set(elementStorage);
                    });
                }

    }

    };

// Функция вызывается при полной загрузке DOM, создает наблюдателей за событиями, строит список

    function ready() {
        // строим лист
        taskManager.get();

        //ждем клик на добавление
        var addEl = document.getElementsByClassName("add");
        if (addEl)
            addEl[0].addEventListener('click', taskManager.add);

        //на очистку localStorage
        var clearEl = document.getElementsByClassName("clear");
        if(clearEl)
            clearEl[0].addEventListener('click', taskManager.clear);
        //на удаление элемента
        var delEl = document.getElementsByClassName("delone");
        for (let i = 0; i < delEl.length; i++) {
            delEl[i].addEventListener('click', taskManager.del);
        }
        // на выполнение
        var completeEl = document.getElementsByClassName("inProgress");
        for (let i = 0; i < completeEl.length; i++) {
            completeEl[i].addEventListener('click', taskManager.complete);
        }
        // на вызов оккна изменений
           var refactorLiEl = document.getElementsByClassName("refactor");
        for (let i = 0; i < refactorLiEl.length; i++) {
            refactorLiEl[i].addEventListener('click', taskManager.refactorLi);
        }}

    // Ждем пока страница загрузится (???)
    document.addEventListener("DOMContentLoaded", ready);
})();

