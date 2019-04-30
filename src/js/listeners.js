function ready() {

    taskManager.createList();
    //Добавляем обработкчик событий на всю страницу
    document.addEventListener('click', function (e) {
        let tar = e.target;
        if (tar.classList.contains("formToggle")) { //если кликнули на "создать задачу"
            let createFormVisible = document.querySelector("#createForm");
            if (createFormVisible.classList.contains("visible")) {
                 taskManager.visibilityForm();
                taskManager.clearForm();
                let checkSetBut = document.querySelector(".set");
                if (checkSetBut) {
                    taskManager.visibilityForm();

                }
            } else {
                taskManager.visibilityForm();
            }
            taskManager.createAddButton();
        } else if (tar.classList.contains('add')) { // кликнули на "создать"
            taskManager.add();
            taskManager.createSetButton();
            taskManager.visibilityForm();
            taskManager.clearList();
            taskManager.createList();
        } else if (tar.classList.contains("all")) { // строим список всех задач
            taskManager.clearList();
            taskManager.createList();
        } else if (tar.classList.contains("person")) { // список личных задач
            taskManager.clearList();
            taskManager.createCustomList("Личная задача");
        } else if (tar.classList.contains("work")) { // рабочих
            taskManager.clearList();
            taskManager.createCustomList("Рабочая задача");
        } else if (tar.classList.contains('refactor')) { // нажали на "Редактировать"
            let createFormVisible = document.querySelector("#createForm");
            if (createFormVisible.classList.contains("visible")) {
                taskManager.visibilityForm();
                taskManager.visibilityForm();
            } else {
                taskManager.visibilityForm();
            }
            window.scrollTo(0,0);
            taskManager.refactor.call(tar.parentElement.parentElement.id);
            let oldKeyid = tar.parentElement.parentElement.id;
            let setEl = document.querySelector("#addSetBut");
            if(setEl.classList.contains('set')) {
                setEl.addEventListener('click', function () {
                    taskManager.set.apply(oldKeyid);
                })
            }
        }
        else if (tar.classList.contains('delone')) { // "Удалить"
            taskManager.del.call(tar.parentElement.parentElement.id);
        } else if (tar.classList.contains('inProgress')) { //Пометили выполненным
            taskManager.complete.call(tar.parentElement.parentElement.id)
        } else {
            let refactorFormVisible = document.querySelector("#createForm"); // Проверяем на клик вне формы
            if (refactorFormVisible.classList.contains("visible")) {
                if (!(isDescendant(refactorFormVisible, tar))) {
                    taskManager.visibilityForm();
                    taskManager.clearForm();
                }
            }
        }

        function isDescendant(parent, child) { // ф-я для проверки дочернего элемента
            var node = child.parentNode;
            while (node != null) {
                if (node === parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
    });

    $('#standard_calendar')
        .calendar(); // календарь семантика
}

document.addEventListener("DOMContentLoaded", ready);