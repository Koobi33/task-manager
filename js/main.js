// document.ready(function () {
//    var storageLength = localStorage.length;
//    var localValue;
//    var newId = 0;

    function createTask() {
    var i = counter();
    if (localStorage.length > 0) {
    i = localStorage.length + 1;
    }
    var newTask = {
        taskName: "Задача: " + document.getElementById('taskName').value,
        taskType: "Тип задачи: " + document.getElementById('taskType').value,
        taskDate: "Deadline: " + document.getElementById('taskDate').value,
        taskId: "Номер задачи: " +  i
    };
    var sNewTask = JSON.stringify(newTask);
    localStorage.setItem("newTask" + i, sNewTask);
    alert(localStorage.getItem('newTask' + i));
//counterAlertFunc();
}
    function buildList() {
        if (localStorage.length > 0) {
            for (var j = 1; j < localStorage.length + 1; j++) {
     //           document.getElementById('list').appendChild("<li>" + localStorage.getItem('taskName' + j) + "</li>");
                var localValue = localStorage.getItem('newTask' + j);
                var localValueJSON = JSON.parse(localValue);
                var localValueName = localValueJSON.taskName;
                var localValueType = localValueJSON.taskType;
                var localValueDate = localValueJSON.taskDate;
                var newLi = document.createElement('li');
                newLi.innerHTML = localValueName + "\n" + localValueType + "\n" + localValueDate;
                var list = document.getElementById("list");
                list.appendChild(newLi);
            }
        }
   }
// });

function clrList() {
        localStorage.clear();
    }
function makeCounter() {
    var currentCount = 1;

    return function () {
       return currentCount++;
    };
}
var counter = makeCounter();
