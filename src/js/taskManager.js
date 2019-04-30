var taskManager = (function () {
    return {
        // Добавить элемент
        visibilityForm: function () {
        $('#createForm')
            .transition('scale')
        },

        add: function () {

            if (document.querySelector('#taskName').value !== "") {
                var newTask = {
                    taskName:   document.querySelector('#taskName').value,
                    taskType:   document.getElementById('taskType').value,
                    taskDate:   document.querySelector('#taskDate').value,
                    // taskId: i,
                    taskIsComplete: false,
                };
                localStorageManager.addElem(newTask.taskName, JSON.stringify(newTask));
                taskManager.create(newTask);
               taskManager.clearForm();
            }
        },

        // Удалить элемент

        del: function () {
            if (confirm("Вы действительно хотите удалить задачу " + this + "?")) {
                document.getElementById(this).remove();
                localStorageManager.delElem(this)
            }
        },
        // Пометить выполненным
        complete: function () {

           let li = document.getElementById(this);
           let liSrorage = localStorageManager.getOneElem(this);
           if(liSrorage.taskIsComplete === false) {
               localStorageManager.completeElem.complete(this);
               li.classList.remove(li.classList[4]);
               li.classList.add('green');
           } else {
               localStorageManager.completeElem.inProgress(this);
               li.remove();
               liSrorage = localStorageManager.getOneElem(this);
               taskManager.create(liSrorage);
           }

        },

        // Очистка формы
        clearForm: function() {
            document.querySelector('#taskName').value = "";
            document.getElementById('taskDate').value = "";
            document.querySelector('#taskType').querySelectorAll('option')[0].selected = true;
        },
        // Создать новый элемент списка
        create: function (elem) {
            // Определяем тип задачи
            let li = document.createElement("li");
            li.id = elem.taskName;
            li.className = "ui segment inverted dividing";
            if (elem.taskType === "Личная задача") {
                li.classList.add("person");
            } else if (elem.taskType === "Рабочая задача") {
                li.classList.add("work");
            }
            if (elem.taskIsComplete === false) {
                li.classList.add(taskManager.checkDate(elem.taskDate));
            }
            else {
                li.classList.add("green");
            }
            let div1 = document.createElement('div');
            div1.className = "ui segment grid";

            let completeButton = document.createElement('button');
            completeButton.className = 'inProgress ui button one wide column';
            let pName = document.createElement("h3");
            pName.innerHTML = elem.taskName;
            div1.appendChild(completeButton);


            div1.appendChild(pName);

            let div2 = document.createElement("div");
            div2.className = "ui segments";

            let div2_1 = document.createElement('div');
            div2_1.className ="ui segment";

            let pDate = document.createElement("p");
            pDate.innerHTML = "Дедлайн: " + taskManager.deadline(elem.taskDate);
            div2_1.appendChild(pDate);

            let div2_2 = document.createElement('div');
            div2_2.className = "ui segment";

            let pType = document.createElement("p");
            pType.innerHTML = elem.taskType;
            div2_2.appendChild(pType);

            div2.appendChild(div2_1);
            div2.appendChild(div2_2);

            // Кнопка редактирования
            let div3 = document.createElement('div');
            div3.className = "extra content";

            let spanRef = document.createElement("button");
            spanRef.className = 'ui labeled icon button refactor';
            spanRef.innerHTML = "Редактировать";
            let iconRefBut = document.createElement('i');
            iconRefBut.className = "edit outline icon";
            spanRef.appendChild(iconRefBut);
            div3.appendChild(spanRef);

            let delButton = document.createElement('button');
            delButton.className = "ui labeled icon button delone";
            delButton.innerHTML = "Удалить";

            let iconDelBut = document.createElement('i');
            iconDelBut.className = "trash alternate icon";
            delButton.appendChild(iconDelBut);
            div3.appendChild(delButton);
            // Собираем все элементы

            li.appendChild(div1);
            li.appendChild(div2);
            li.appendChild(div3);

            //Добавляем в DOM
            document.querySelector("#list").appendChild(li);
        },

        // Изменить задачу
        set: function () {

            if (document.querySelector('#taskName').value !== "") {
                var newTask = {
                    taskName: document.querySelector('#taskName').value,
                    taskType: document.getElementById('taskType').value,
                    taskDate: document.querySelector('#taskDate').value,
                    // taskId: i,
                    taskIsComplete: false,
                };

                localStorageManager.refactorElem(this, newTask.taskName, JSON.stringify(newTask));
                taskManager.clearForm();
                taskManager.createAddButton();
                taskManager.clearList();
                taskManager.createList();
            }
        },

        // замена кнопки на "Изменить"
        createSetButton: function () {
          let but = document.querySelector("#addSetBut");
          if(but) {
              let newBut = but.cloneNode(true);
                  newBut.classList.add("set");
                  newBut.classList.remove("add");
                  newBut.innerHTML = "Изменить";
                  but.parentNode.replaceChild(newBut, but);
              }

        },

        //Замена кнопки на "Создать"
        createAddButton: function () {
            let but = document.querySelector("#addSetBut");
            if(but) {

                let newBut = but.cloneNode(true);
                newBut.classList.add("add");
                newBut.classList.remove("set");
                newBut.innerHTML = "Создать";
                but.parentNode.replaceChild(newBut, but);
            }
        },

        // Заполнение формы данными изменяегомого элемента
        refactor: function() {
            var key = this;
            var oldTask = localStorageManager.getOneElem(key);
            document.querySelector("#taskName").value = oldTask.taskName;
            document.querySelector("#taskDate").value = oldTask.taskDate;

            let index;
            if (oldTask.taskType === "Личная задача") {
                index = 1;
            } else if (oldTask.taskType === "Рабочая задача") {
                index = 2;
            } else {
                index = 0;
            }
            taskManager.createSetButton();
             document.querySelector('#taskType').querySelectorAll('option')[index].selected = true;
        },

        // Построение полного списка
        createList: function() {
                let list = localStorageManager.getAllElems();
                list.sort(function (a,b) {
                   return new Date(a.taskDate) -  new Date(b.taskDate);
                });
                for (let i = 0; i < list.length; i++)
                    taskManager.create(list[i]);
        },

        //Создание списка отсортированного по типу задачи
        createCustomList: function(listname) {
            let customList = localStorageManager.getAllElems();
            customList.sort(function (a,b) {
                return new Date(a.taskDate) -  new Date(b.taskDate);
            });
            for(let i = 0; i < customList.length; i++) {
                if(customList[i].taskType === listname) {
                    taskManager.create(customList[i]);
                }
            }
        },

        // Очищаем список
        clearList: function() {
            var ulList = document.querySelector("#list");
            let listChilds = ulList.childNodes;
            for(let i = (listChilds.length - 1); i >= 0; i--) {
                listChilds[i].remove();
            }
        },

        //Проверяет дату, возвращает цвет в зависимости от срока
        checkDate: function (taskDate) {
            let currentDate = Math.round(Date.now() / 60);
            let localValueDateNorm = Date.parse(taskDate) / 60;
            let diff = currentDate - localValueDateNorm;
            let color = "";

            diff = Math.round(diff / 60);

            if (localValueDateNorm < currentDate)
                color = "red";
            else if (diff < 0 && diff > -24000)
                color = "yellow";
            else
                color = "lightgrey";
            return color;
        },

        //Преобразует дату к нужному формату
        deadline: function (time) {
            let date = new Date(time);
            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
            };
            let ret = date.toLocaleString('ru', options);
            return (ret);
        },


    }
})();