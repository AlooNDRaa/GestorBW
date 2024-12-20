import React, { useState, useEffect } from 'react';

function MetasPresupuestos() {
    const [metas, setMetas] = useState(() => {
        const storedMetas = localStorage.getItem('metas');
        return storedMetas ? JSON.parse(storedMetas) : [
            { id: 1, nombre: 'Ahorro para vacaciones', monto: 2000, completado: false },
            { id: 2, nombre: 'Pago de tarjeta de crédito', monto: 500, completado: true }
        ];
    });

    useEffect(() => {
        localStorage.setItem('metas', JSON.stringify(metas));
    }, [metas]);

    const [nuevaMetaNombre, setNuevaMetaNombre] = useState('');
    const [nuevaMetaMonto, setNuevaMetaMonto] = useState('');
    const [agregarModo, setAgregarModo] = useState(false);

    const agregarMeta = () => {
        if (nuevaMetaNombre && nuevaMetaMonto) {
            const nuevaMeta = { 
                id: metas.length + 1, 
                nombre: nuevaMetaNombre, 
                monto: parseFloat(nuevaMetaMonto), 
                completado: false 
            };
            setMetas(prevMetas => [...prevMetas, nuevaMeta]);
            setNuevaMetaNombre('');
            setNuevaMetaMonto('');
            setAgregarModo(false);
        }
    };

    const eliminarMeta = (id) => {
        setMetas(prevMetas => prevMetas.filter(meta => meta.id !== id));
    };

    const toggleMetaCompletada = (id) => {
        setMetas(prevMetas =>
            prevMetas.map(meta => 
                meta.id === id ? { ...meta, completado: !meta.completado } : meta
            )
        );
    };

    return (
        <div className='metas-div'>
            <h3>Metas Activas</h3>
            {!agregarModo && (
                <button className="button add-meta" onClick={() => setAgregarModo(true)}>Agregar Meta</button>
            )}

            {agregarModo && (
                <div>
                    <input
                        type="text"
                        placeholder="Nombre de la meta"
                        value={nuevaMetaNombre}
                        onChange={(e) => setNuevaMetaNombre(e.target.value)}
                        className="input-description"
                    />
                    <input
                        type="number"
                        placeholder="Monto"
                        value={nuevaMetaMonto}
                        onChange={(e) => setNuevaMetaMonto(e.target.value)}
                        className="input-monto"
                    />
                    <button className="button submit-meta" onClick={agregarMeta}>Agregar</button>
                    <button className="button cancel" onClick={() => setAgregarModo(false)}>Cancelar</button>
                </div>
            )}

            <ul className="meta-list">
                {metas.map(meta => (
                    <li key={meta.id} className="meta-item">
                        {meta.nombre} - ${meta.monto} 
                        {meta.completado && <span className="completed-text">(Completada)</span>}
                        <button 
                            className="button toggle-button"
                            onClick={() => toggleMetaCompletada(meta.id)}
                        >
                            {meta.completado ? "Reactivar" : "Completar"}
                        </button>
                        <button className="button delete-button" onClick={() => eliminarMeta(meta.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MetasPresupuestos;
