import React, { useState } from "react";

function TareasHabitos() {
  const [tareas, setTareas] = useState([
    { id: 1, descripcion: "Hacer ejercicio", completada: false, tipo: "tarea" },
    { id: 2, descripcion: "Leer un libro", completada: true, tipo: "tarea" },
    { id: 3, descripcion: "Meditar", completada: false, tipo: "hábito" },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("tarea"); // Tipo de tarea
  const [editandoTareaId, setEditandoTareaId] = useState(null); // ID de tarea que se edita
  const [menuAbiertoId, setMenuAbiertoId] = useState(null); // ID de la tarea con menú abierto

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
    setMenuAbiertoId(menuAbiertoId === id ? null : id); // Alterna el estado del menú
  };

  return (
    <div className="tareas-habitos-board">
      <h1>Gestión de Tareas y Hábitos</h1>

      <div className="tipo-tarea">
        <label>Selecciona el tipo:</label>
        <select
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
        >
          <option value="tarea">Tarea</option>
          <option value="hábito">Hábito</option>
        </select>
      </div>

      <div className="tareas-habitos-div">
        <div className="tareas-lista div-ul-list">
          <h3>Tareas</h3>
          <ul>
            {tareas
              .filter((tarea) => tarea.tipo === "tarea")
              .map((tarea) => (
                <li
                  key={tarea.id}
                  className={`tarea-item ${
                    tarea.completada ? "completada" : ""
                  }`}
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
                        {tarea.completada ? "Desmarcar" : "Completar"}
                      </button>
                      <button onClick={() => editarTarea(tarea.id)}>Editar</button>
                      <button onClick={() => eliminarTarea(tarea.id)}>
                        Eliminar
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="habitos-lista div-ul-list">
          <h3>Hábitos</h3>
          <ul>
            {tareas
              .filter((tarea) => tarea.tipo === "hábito")
              .map((tarea) => (
                <li
                  key={tarea.id}
                  className={`tarea-item ${
                    tarea.completada ? "completada" : ""
                  }`}
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
                        {tarea.completada ? "Desmarcar" : "Completar"}
                      </button>
                      <button onClick={() => editarTarea(tarea.id)}>Editar</button>
                      <button onClick={() => eliminarTarea(tarea.id)}>
                        Eliminar
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
            placeholder="Descripción"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            required
          />
          <button type="submit">
            {editandoTareaId ? "Guardar" : "Agregar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TareasHabitos;
