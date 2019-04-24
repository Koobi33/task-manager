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
            if (document.querySelector('#taskName').value !== "") {
                var newTask = {
                    taskName: "" + document.querySelector('#taskName').value,
                    taskType: "Тип Задачи: " + document.getElementById('taskType').value,
                    taskDate: "" + document.querySelector('#taskDate').value,
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
            if (document.querySelector('#taskNameRef').value !== "") {
                var refactored = {
                    taskName: "" + document.querySelector('#taskNameRef').value,
                    taskType: "Тип Задачи: " + document.getElementById('taskTypeRef').value,
                    taskDate: "" + document.querySelector('#taskDateRef').value,
                    taskId: elemID.taskName,
                    taskIsComplete: false,
                };
                var strRefactored = JSON.stringify(refactored);
                localStorage.removeItem("" + elemID.taskName);
                localStorage.setItem("" + refactored.taskName, strRefactored);
                location.reload();
            }

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
                        li.innerHTML = "<span class='delone'><img src=\"trash-alt-regular.svg\"></span> <p class='inProgress'>" + newLi + "</p><span class='refactor'>Редактировать</span>";
                        document.querySelector("#personList").appendChild(li);
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
                        li.innerHTML = "<span class='delone'><img src=\"trash-alt-regular.svg\"></span> <p class='inProgress' >" + newLi + "</p><span class='refactor'>Редактировать</span>";
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
                    li.innerHTML = "<span class='delone'><img src=\"trash-alt-regular.svg\"></span><p class='inProgress'>" + newLi + "</p><span class='refactor'>Редактировать</span>";
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
            var refh1 = document.querySelector("#refactorh1").innerHTML += "" + elementStorage.taskName;
            var refTaskName = document.querySelector("#taskNameRef").value = elementStorage.taskName;
            var refTaskDate = document.querySelector("#taskDateRef").value = elementStorage.taskDate;
            var refTaskType = document.querySelector('#taskTypeRef');

            if(elementStorage.taskType === "Тип Задачи: Личные задачи") {
                refTaskType.querySelectorAll('option')[0].selected = true;
            }
            else
                refTaskType.querySelectorAll('option')[1].selected = true;

            //    ждем клик на кнопке формы изменения
                var setEl = document.querySelectorAll(".set");
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
        var addEl = document.querySelectorAll(".add");
        if (addEl)
            addEl[0].addEventListener('click', taskManager.add);

        //на очистку localStorage
        var clearEl = document.querySelectorAll(".clear");
        if (clearEl)
            clearEl[0].addEventListener('click', taskManager.clear);
        //на удаление элемента
        var delEl = document.querySelectorAll(".delone");
        for (let i = 0; i < delEl.length; i++) {
            delEl[i].addEventListener('click', taskManager.del);
        }
        // на выполнение
        var completeEl = document.querySelectorAll(".inProgress");
        for (let i = 0; i < completeEl.length; i++) {
            completeEl[i].addEventListener('click', taskManager.complete);
        }
        // // на вызов оккна изменений
        //    var refactorLiEl = document.querySelectorAll(".refactor");
        // for (let i = 0; i < refactorLiEl.length; i++) {
        //     refactorLiEl[i].addEventListener('click', taskManager.refactorLi);
        // }

        var modal = document.querySelector("#modal");
        var modalOverlay = document.querySelector("#modal-overlay");
        var closeButton = document.querySelector("#close-button");
        var openRefactorButton = document.querySelectorAll(".refactor");
        //  var openButton = document.querySelectorAll(".refactor");

        closeButton.addEventListener("click", function () {
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
        });


        for (let i = 0; i < openRefactorButton.length; i++) {
            console.log("hi");
            openRefactorButton[i].addEventListener("click", function () {
                modal.classList.toggle("closed");
                modalOverlay.classList.toggle("closed");
               taskManager.refactorLi.apply(this);
           });
       }



    }
    // Ждем пока страница загрузится (???)
    document.addEventListener("DOMContentLoaded", ready);
})();

