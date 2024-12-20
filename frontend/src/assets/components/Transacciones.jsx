import React, { useState, useEffect } from 'react';

function Transacciones() {
    const [transacciones, setTransacciones] = useState([
        { id: 1, descripcion: 'Rent payment', monto: -500, fecha: '19/12/2024' },
        { id: 2, descripcion: 'Salary', monto: 1500, fecha: '19/12/2024' },
        { id: 3, descripcion: 'Buy supermarket', monto: -200, fecha: '19/12/2024' },
    ]);

    const [nuevaDescripcion, setNuevaDescripcion] = useState('');
    const [nuevoMonto, setNuevoMonto] = useState('');
    
    const [editando, setEditando] = useState(null);
    const [descripcionEditada, setDescripcionEditada] = useState('');
    const [montoEditado, setMontoEditado] = useState('');

    const agregarTransaccion = (e) => {
        e.preventDefault();
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0'); 
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');  
        const año = fecha.getFullYear();

        const fechaTransaccion = `${dia}/${mes}/${año}`; 

        const nuevaTransaccion = {
            id: transacciones.length + 1, 
            descripcion: nuevaDescripcion, 
            monto: parseFloat(nuevoMonto),
            fecha: fechaTransaccion, 
        };

        setTransacciones([...transacciones, nuevaTransaccion]);
        setNuevaDescripcion('');
        setNuevoMonto('');
    };

    const eliminarTransaccion = (id) => {
        setTransacciones(transacciones.filter(transaccion => transaccion.id !== id));
    };

    const guardarEdicion = (id) => {
        setTransacciones(
            transacciones.map(transaccion =>
                transaccion.id === id
                    ? { ...transaccion, descripcion: descripcionEditada, monto: parseFloat(montoEditado) }
                    : transaccion
            )
        );
        setEditando(null);
    };

    useEffect(() => {
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    }, [transacciones]);

    return (
        <div className="transacciones-board">
            <h1>Transaction Management</h1>
            
            <div className="transacciones-list-container">
                <div className="transacciones-list">
                    <h3>List of Transactions</h3>
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
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => eliminarTransaccion(transaccion.id)} 
                                                className="delete-button"
                                            >
                                                Delete
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
                <h3>Add new transaction</h3>
                <form onSubmit={agregarTransaccion}>
                    <input 
                        type="text" 
                        placeholder="Description" 
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
                    <button type="submit" className="submit-button">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Transacciones;
