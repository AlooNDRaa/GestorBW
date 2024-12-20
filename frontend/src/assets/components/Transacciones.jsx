import React, { useState, useEffect } from 'react';

function Transacciones() {
    // Estado inicial con algunas transacciones de ejemplo
    const [transacciones, setTransacciones] = useState([
        { id: 1, descripcion: 'Pago de alquiler', monto: -500, fecha: '19/12/2024' },
        { id: 2, descripcion: 'Sueldo', monto: 1500, fecha: '19/12/2024' },
        { id: 3, descripcion: 'Compra supermercado', monto: -200, fecha: '19/12/2024' },
    ]);

    // Estado para los inputs de nueva transacción
    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoMonto, setNuevoMonto] = useState('');
    
    // Estado para controlar la edición
    const [editando, setEditando] = useState(null);
    const [descripcionEditada, setDescripcionEditada] = useState('');
    const [montoEditado, setMontoEditado] = useState('');

    // Función para agregar una nueva transacción con fecha dinámica
    const agregarTransaccion = (e) => {
        e.preventDefault();
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');  // Añadir ceros a la izquierda si el día es menor de 10
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');  // Los meses comienzan desde 0 (Enero es 0)
        const año = fecha.getFullYear();

        const fechaTransaccion = `${dia}/${mes}/${año}`;  // Formato día/mes/año

        const nuevaTransaccion = {
            id: transacciones.length + 1, 
            descripcion: nuevaDescripcion, 
            monto: parseFloat(nuevoMonto),
            fecha: fechaTransaccion,  // Fecha actual con formato
        };

        setTransacciones([...transacciones, nuevaTransaccion]);
        setNuevaDescripcion('');
        setNuevoMonto('');
    };

    // Función para eliminar una transacción por ID
    const eliminarTransaccion = (id) => {
        setTransacciones(transacciones.filter(transaccion => transaccion.id !== id));
    };

    // Función para guardar los cambios de edición
    const guardarEdicion = (id) => {
        setTransacciones(
            transacciones.map(transaccion =>
                transaccion.id === id
                    ? { ...transaccion, descripcion: descripcionEditada, monto: parseFloat(montoEditado) }
                    : transaccion
            )
        );
        setEditando(null);  // Termina la edición
    };

    useEffect(() => {
        // Guardar las transacciones en localStorage cada vez que se actualicen
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    }, [transacciones]);

    return (
        <div className="transacciones-board">
            <h1>Gestión de Transacciones</h1>
            
            <div className="transacciones-list-container">
                <div className="transacciones-list">
                    <h3>Listado de Transacciones</h3>
                    <ul>
                        {transacciones.map(transaccion => (
                            <li key={transaccion.id} className="transaccion-item">
                                {editando === transaccion.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={descripcionEditada}
                                            onChange={(e) => setDescripcionEditada(e.target.value)}
                                            className="input-description"
                                        />
                                        <input
                                            type="number"
                                            value={montoEditado}
                                            onChange={(e) => setMontoEditado(e.target.value)}
                                            className="input-monto"
                                        />
                                        <button onClick={() => guardarEdicion(transaccion.id)} className="save-button">
                                            Guardar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span>{transaccion.descripcion} - ${transaccion.monto}</span>
                                        <span> ({transaccion.fecha})</span>
                                        <div>
                                            <button 
                                                onClick={() => {
                                                    setEditando(transaccion.id);
                                                    setDescripcionEditada(transaccion.descripcion);
                                                    setMontoEditado(transaccion.monto);
                                                }} 
                                                className="edit-button"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => eliminarTransaccion(transaccion.id)} 
                                                className="delete-button"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="add-transaccion">
                <h3>Agregar Nueva Transacción</h3>
                <form onSubmit={agregarTransaccion}>
                    <input 
                        type="text" 
                        placeholder="Descripción" 
                        value={nuevaDescripcion} 
                        onChange={(e) => setNuevaDescripcion(e.target.value)} 
                        required 
                        className="input-description"
                    />
                    <input 
                        type="number" 
                        placeholder="Monto" 
                        value={nuevoMonto} 
                        onChange={(e) => setNuevoMonto(e.target.value)} 
                        required 
                        className="input-monto"
                    />
                    <button type="submit" className="submit-button">Agregar</button>
                </form>
            </div>
        </div>
    );
}

export default Transacciones;
