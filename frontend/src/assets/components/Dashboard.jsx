import React from 'react';
import ResumenGeneral from './ResumenGeneral';
import MetasPresupuestos from './MetasPresupuestos';
import AlertasRecomendaciones from './AlertasRecomendaciones';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <section>
                <AlertasRecomendaciones />
            </section>
            <h1>Dashboard Financiero: Resumen y metas</h1>
            <div className="dashboard-content">
                <section>
                    <ResumenGeneral />
                </section>

                <section>
                    <h2>Metas y Presupuestos</h2>
                    <MetasPresupuestos />
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
