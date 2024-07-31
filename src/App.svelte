<script>
    import { getTasks, addTask, updateTask, deleteTask } from "./api";

    let oscuro = false;
    let tasks = [];
    let taskInput = '';
    let editMode = null;
    let editedText = '';

    function toggleOscuro() {
        oscuro = !oscuro;
        document.querySelector('body').classList.toggle("oscuro");
    }

    async function loadTasks() {
        try {
            const response = await getTasks();
            tasks = response.data;
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }

    loadTasks();

    async function handleAddTask(event) {
        if (event.key === 'Enter' && taskInput !== '') {
            try {
                const response = await addTask({ title: taskInput, completed: false, description: "" });
                tasks = [...tasks, response.data.task];
                taskInput = '';
                console.log(response);
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    }

    async function handleRemoveTask(id) {
        try {
            await deleteTask(id);
            tasks = tasks.filter(task => task.id !== id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    async function handleToggleTask(task) {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);
            tasks = tasks.map(t => t.id === task.id ? updatedTask : t);
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    }

    function startEditTask(task) {
        editMode = task.id;
        editedText = task.title;
    }

    async function handleEditTask(id, newText) {
        try {
            const updatedTask = { ...tasks.find(task => task.id === id), title: newText };
            await updateTask(id, updatedTask);
            tasks = tasks.map(task => task.id === id ? updatedTask : task);
            editMode = null;
            editedText = '';
        } catch (error) {
            console.error("Error editing task:", error);
        }
    }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</svelte:head>

<main class="todo">
    <section class="container" id="fondo">
        <section class="sub_container">
            <div class="lector">
                <div class="titulo">
                    <p>TODO</p>
                    <button on:click={toggleOscuro}>
                        <i id="imgBtn" class="fa-solid {oscuro ? 'fa-sun' : 'fa-moon'}"></i>
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Digita la tarea"
                    bind:value={taskInput}
                    on:keydown={handleAddTask}
                />
                <div class="contenido">
                    <section class="li-tarea">
                        <ul>
                            {#each tasks as task}
                                <li>
                                    <button
                                        class="{task.completed ? 'select' : 'option'}"
                                        on:click={() => handleToggleTask(task)}
                                    >
                                        <i class="fa-solid {task.completed ? 'fa-check' : 'sin'}"></i>
                                    </button>
                                    <p class="{task.completed ? 'tachar' : 'con'}">{task.title}</p>
                                    <button class="btn-eliminar" on:click={() => handleRemoveTask(task.id)}>X</button>
                                    <button class="btn-editar" on:click={() => startEditTask(task)}>✎</button>
                                    {#if editMode === task.id}
                                        <input type="text" class="input-editar" bind:value={editedText} />
                                        <button class="guard" on:click={() => handleEditTask(task.id, editedText)}> <strong>Guardar</strong></button>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </section>
                    <section class="tareas">
                        <p>{tasks.length === 0 ? 'No tiene tarea pendientes.' : ''}</p>
                    </section>
                    <section class="opciones">
                        <p>{tasks.length} item{tasks.length !== 1 ? 's' : ''}</p>
                        <div class="filtros">
                            <button class="filtro uno">todo</button>
                            <button class="filtro dos">activos</button>
                            <button class="filtro tres">completados</button>
                        </div>
                        <button class="limpiar" on:click={() => tasks = []}>Limpiar todo</button>
                    </section>
                </div>
            </div>
        </section>            
    </section>
</main>

<style>
	:global(body.oscuro){
		background-color: black;
	}
	
</style>