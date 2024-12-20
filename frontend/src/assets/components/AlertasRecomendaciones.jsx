import React from 'react';

function AlertasRecomendaciones() {
    const alertas = [
        { id: 1, mensaje: 'Reminder: Pay the electricity bill before October 5th.' },
        { id: 2, mensaje: 'Suggestion: Increase your savings by 10% this month.' }        
    ];

    return (
        <div>
            <ul className="alertas-list">
                {alertas.map(alerta => (
                    <li key={alerta.id} className="alerta-item">
                        {alerta.mensaje}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlertasRecomendaciones;
