$(document).ready(function () {
   var storageLength = localStorage.length;
   var localValue;
   var newId = 0;

    function createTask() {
    var newTask = "Задача: " + document.getElementById('taskName').value +
        "\nТип задачи: " + document.getElementById('taskType').value +
        "\nDeadline: " + document.getElementById('taskDate').value;
    localStorage.setItem('taskName', document.getElementById('taskName').value);
}
    function buildListAfterReload() {
        if (storageLength > 0) {
            for (i = 0; i < storageLength; i++) {
                var key = localStorage.key(i);
                document.getElementById('list').append("<li data-item=" + localStorage.key(i).slice(7)  + ">" + localStorage[key] + "</li>")



                // var localValue = localStorage.getItem('taskName');
                // var newLi = document.createElement('li');
                // newLi.innerHTML = localValue.trim();
                // var list = document.getElementById("list");
                // list.appendChild(newLi);
            }
        }
    }
});