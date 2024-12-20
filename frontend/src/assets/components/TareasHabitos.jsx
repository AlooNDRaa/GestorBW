import React, { useState } from "react";

function TareasHabitos() {
  const [tareas, setTareas] = useState([
    { id: 1, descripcion: "Exercise", completada: false, tipo: "task" },
    { id: 2, descripcion: "Read a book", completada: true, tipo: "task" },
    { id: 3, descripcion: "Meditate", completada: false, tipo: "habit" },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("task"); // Task type
  const [editandoTareaId, setEditandoTareaId] = useState(null); // ID of the task being edited
  const [menuAbiertoId, setMenuAbiertoId] = useState(null); // ID of the task with open menu

  const manejarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim()) {
      if (editandoTareaId !== null) {
        setTareas(
          tareas.map((tarea) =>
            tarea.id === editandoTareaId
              ? { ...tarea, descripcion: nuevaTarea }
              : tarea
          )
        );
        setEditandoTareaId(null);
      } else {
        const tarea = {
          id: tareas.length + 1,
          descripcion: nuevaTarea,
          completada: false,
          tipo: tipoSeleccionado,
        };
        setTareas([...tareas, tarea]);
      }
      setNuevaTarea("");
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const editarTarea = (id) => {
    const tareaAEditar = tareas.find((tarea) => tarea.id === id);
    setNuevaTarea(tareaAEditar.descripcion);
    setTipoSeleccionado(tareaAEditar.tipo);
    setEditandoTareaId(id);
    setMenuAbiertoId(null); 
  };

  const toggleMenu = (id) => {
    setMenuAbiertoId(menuAbiertoId === id ? null : id); // Toggle menu state
  };

  return (
    <div className="tareas-habitos-board">
      <h1>Task and Habit Management</h1>

      <div className="tipo-tarea">
        <label>Select between:</label>
        <select
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
        >
          <option value="task">Task</option>
          <option value="habit">Habit</option>
        </select>
      </div>

      <div className="tareas-habitos-div">
        <div className="tareas-lista div-ul-list">
          <h3>Tasks</h3>
          <ul>
            {tareas
              .filter((tarea) => tarea.tipo === "task")
              .map((tarea) => (
                <li
                  key={tarea.id}
                  className={`tarea-item ${tarea.completada ? "completada" : ""}`}
                >
                  <span>{tarea.descripcion}</span>
                  <button
                    className="menu-boton"
                    onClick={() => toggleMenu(tarea.id)}
                  >
                    ⋮
                  </button>
                  {menuAbiertoId === tarea.id && (
                    <div className="menu">
                      <button onClick={() => toggleCompletada(tarea.id)}>
                        {tarea.completada ? "Unmark" : "Complete"}
                      </button>
                      <button onClick={() => editarTarea(tarea.id)}>Edit</button>
                      <button onClick={() => eliminarTarea(tarea.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="habitos-lista div-ul-list">
          <h3>Habits</h3>
          <ul>
            {tareas
              .filter((tarea) => tarea.tipo === "habit")
              .map((tarea) => (
                <li
                  key={tarea.id}
                  className={`tarea-item ${tarea.completada ? "completada" : ""}`}
                >
                  <span>{tarea.descripcion}</span>
                  <button
                    className="menu-boton"
                    onClick={() => toggleMenu(tarea.id)}
                  >
                    ⋮
                  </button>
                  {menuAbiertoId === tarea.id && (
                    <div className="menu">
                      <button onClick={() => toggleCompletada(tarea.id)}>
                        {tarea.completada ? "Unmark" : "Complete"}
                      </button>
                      <button onClick={() => editarTarea(tarea.id)}>Edit</button>
                      <button onClick={() => eliminarTarea(tarea.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="agregar-tarea">
        <form onSubmit={manejarTarea}>
          <input
            type="text"
            placeholder="Description"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            required
          />
          <button type="submit">
            {editandoTareaId ? "Save" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TareasHabitos;
