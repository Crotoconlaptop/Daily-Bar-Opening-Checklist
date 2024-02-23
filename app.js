          
document.addEventListener('DOMContentLoaded', function () {
    const tasksContainer = document.getElementById('tasks-container');
    const userNameInput = document.getElementById('userName');

    // Lista de tareas
    const tasks = [
        "Read the log book or hand over from closing shift",
        "Check all the refrigerator are working",
        "Check all Micros and printers are working also paper roll", 
        "Ensure financier are fresh, pastry, nuts, olives on a daily basis (if required)", 
        "Turn on coffee machine and make sure it is clean, filled milk and check the level of coffee", 
        "Check all items for expiary dates and record spoilages if any applicable", 
        "Wipe the display counter", 
        "Wipe all the disply Bottles", 
        "On a daily basis preapare spoilage form, and drop previous one to cost controller", 
        "Wipe all the fridge and back bar top", 
        "All bar surfaces are cleaned and sanitized", 
        "All rubber floor mats are put in place correctly and are clean", 
        "Set up the barcounter top with bar mat, bar caddy, coaster and menu (SOP/LSOP)", 
        "Set the workstation with cocktail shaker, stainer, bar spoon, muddler and knife", 
        "All the garbage bins are clean and placed on right area", 
        "Check and record temperature of the fridge", 
        "Ice chest with filled with ice/crushed ice", 
        "All the required glassware and ice buckets available in the bar for services", 
        "Fill ice in all work station ice chest", 
        "Set up stations according to standars", 
        "Garnish is cut according to the nature of business (Do not over cut, try to use fresh)", 
        "The following garnish available in the bar, lime, lemon, mint, orange, pineapple, etc", 
        "Not available items (86) list given to shift incharge", 
        "Upselling items list of the day given to the shift incharge", 
        "Garnish checklist signed. As per the menue / Mise en place", 
        "Parstock ready for operation"
    ];

    // Crear dinámicamente las tareas
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task${index}`;
        checkbox.addEventListener('change', () => handleTaskCheck(index));

        const label = document.createElement('label');
        label.htmlFor = `task${index}`;
        label.textContent = task;

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        tasksContainer.appendChild(taskDiv);
    });

    // Función para manejar el cambio de estado de las tareas
    function handleTaskCheck(index) {
        const checkbox = document.getElementById(`task${index}`);
        const taskText = tasks[index];
        const userName = userNameInput.value;
        const date = new Date().toLocaleString();

        // Registrar el estado de la tarea (realizada o no)
        if (checkbox.checked) {
            console.log(`Tarea realizada: ${taskText} por ${userName} el ${date}`);
            // Puedes almacenar estos registros en un array o enviarlos a un servidor, según tus necesidades.
        } else {
            console.log(`Tarea no realizada: ${taskText}`);
        }
    }

    // Agrega el botón de descarga al final
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', downloadTasks);

    // Función para descargar la checklist en formato CSV
    function downloadTasks() {
        let csvContent = "data:text/csv;charset=utf-8," +
            "Task,Performed by,Date and Time\n";
    
        tasks.forEach((task, index) => {
            const checkbox = document.getElementById(`task${index}`);
            const userName = userNameInput.value;
            const date = checkbox.checked ? new Date().toLocaleString() : "";
    
            csvContent += `"${task}","${checkbox.checked ? userName : ""}","${date}"\n`;
        });
    
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "checklist.csv");
        document.body.appendChild(link);
        link.click();
    }})