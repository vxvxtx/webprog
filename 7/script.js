$(document).ready(function () {
    loadTasks();

    $("#addTask").click(addTask);

    $("#taskInput").keypress(function (event) {
        if (event.which === 13) addTask();
    });

    $("#taskList").on("click", ".removeTask", function () {
        $(this).parent().remove();
        saveTasks();
    });

    $("#taskList").on("click", "li", function () {
        $(this).toggleClass("text-decoration-line-through");
        saveTasks();
    });

    function addTask() {
        let taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
            $("#taskList").append(`<li class='list-group-item d-flex justify-content-between'>
                ${taskText} 
                <button class='btn btn-danger btn-sm removeTask'>Видалити</button>
            </li>`);
            $("#taskInput").val("");
            saveTasks();
        }
    }

    function saveTasks() {
        let tasks = [];
        $("#taskList li").each(function () {
            tasks.push({ text: $(this).text().replace("Видалити", "").trim(), done: $(this).hasClass("text-decoration-line-through") });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            savedTasks.forEach(task => {
                let listItem = $(`<li class='list-group-item d-flex justify-content-between'>
                    ${task.text} 
                    <button class='btn btn-danger btn-sm removeTask'>Видалити</button>
                </li>`);
                if (task.done) listItem.addClass("text-decoration-line-through");
                $("#taskList").append(listItem);
            });
        }
    }
});
