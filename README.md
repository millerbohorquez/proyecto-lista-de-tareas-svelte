# Aplicación de Gestión de Tareas

Esta es una aplicación de gestión de tareas construida con Svelte. Permite a los usuarios agregar, editar, eliminar y filtrar tareas. La aplicación también admite alternar tareas entre estados activos y completados, y tiene una función de modo oscuro.

## Descripción

La Aplicación de Gestión de Tareas es una herramienta simple pero poderosa para gestionar tareas diarias. Está construida con Svelte para una experiencia de usuario rápida y reactiva. Los usuarios pueden agregar nuevas tareas, marcarlas como completadas y filtrar tareas según su estado. La aplicación también admite un modo oscuro para una mejor usabilidad en entornos con poca luz.

## Características

- Agregar nuevas tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas
- Alternar tareas entre activas/inactivas
- Filtrar tareas por estado (todas, activas, completadas)
- Alternar modo oscuro

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-repo/gestion-tareas.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd gestion-tareas
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
2. Abre la aplicación en tu navegador:
    ```bash
    http://localhost:8080
    ```

## Métodos de API

La aplicación utiliza varios métodos de API para interactuar con el backend. Aquí están los métodos y su uso:

### `getTasks`

Obtiene la lista de tareas desde el backend.

```javascript
async function loadTasks() {
    try {
        const response = await getTasks();
        tasks = response.data;
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

loadTasks();

```
### `addTask`


Agrega una nueva tarea al backend.

```javascript

async function handleAddTask(event) {
    if (event.key === 'Enter' && taskInput !== '') {
        try {
            const response = await addTask({ title: taskInput, completed: false, active: true, description: "" });
            tasks = [...tasks, response.data.task];
            taskInput = '';
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }
}


```
### `updateTask`


Actualiza una tarea existente en el backend.

```javascript

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

```
### `deleteTask`

Elimina una tarea del backend.

```javascript

async function handleRemoveTask(id) {
    try {
        await deleteTask(id);
        tasks = tasks.filter(task => task.id !== id);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

# Funciones Principales



## Alternar Modo Oscuro
```
```javascript

function toggleOscuro() {
    oscuro = !oscuro;
    document.querySelector('body').classList.toggle("oscuro");
}

```
### `editar tarea`


```javascript

function startEditTask(task) {
    editMode = task.id;
    editedText = task.title;
}

```
### `establecer filtro`



```javascript

function setFilter(newFilter) {
    filter = newFilter;
}

$: filteredTasks = tasks.filter(task => {
    if (filter === 'active') return task.active;
    if (filter === 'completed') return task.completed;
    return true;
});



Este README proporciona una estructura clara, que incluye toda la información necesaria para entender, instalar, usar el proyecto de lista de tareas. También se detallan las principales funciones y los puntos de API que se utilizaron.

