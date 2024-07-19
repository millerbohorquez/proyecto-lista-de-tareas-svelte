<script>
    let oscuro = false;
    let tasks = [];
    let taskInput = '';

    function toggleOscuro() {
        oscuro = !oscuro;
        document.querySelector('body').classList.toggle("oscuro");
        
    }

    function addTask(event) {
        if (event.key === 'Enter' && taskInput !== '') {
            tasks = [...tasks, { text: taskInput, completed: false }];
            taskInput = '';
        }
    }

    function removeTask(index) {
        tasks = tasks.filter((task, i) => i !== index);
    }

    function toggleTask(index) {
        tasks = tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
    }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</svelte:head>

<div class="todo">
    <div class="container" id="fondo">
        <div class="sub_container">
            <div class="lector">
                <div class="titulo">
                    <p>TODO</p>
                    <button on:click={toggleOscuro}>
                        <i id="imgBtn" class="fa-solid {oscuro ? 'fa-sun' : 'fa-moon'}"></i>
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Digite tu tarea"
                    bind:value={taskInput}
                    on:keydown={addTask}
                />
                <div class="contenido">
                    <div class="li-tarea">
                        <ul>
                            {#each tasks as task, index}
                                <li>
                                    <button
                                        class="{task.completed ? 'select' : 'option'}"
                                        on:click={() => toggleTask(index)}
                                    >
                                        <i class="fa-solid {task.completed ? 'fa-check' : 'sin'}"></i>
                                    </button>
                                    <p class="{task.completed ? 'tachar' : 'con'}">{task.text}</p>
                                    <button class="btn-eliminar" on:click={() => removeTask(index)}>X</button>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <div class="tareas">
                        <p>{tasks.length === 0 ? 'No tiene tarea pendientes.' : ''}</p>
                    </div>
                    <div class="obciones">
                        <p>{tasks.length} item{tasks.length !== 1 ? 's' : ''}</p>
                        <div class="filtros">
                            <button class="filtro uno">todo</button>
                            <button class="filtro dos">activos</button>
                            <button class="filtro tres">completados</button>
                        </div>
                        <button class="limpiar" on:click={() => tasks = []}>Limpiar todo</button>
                    </div>
                </div>
            </div>
        </div>            
    </div>
</div>

<style>
	:global(body.oscuro){
		background-color: black;
	}
	
</style>