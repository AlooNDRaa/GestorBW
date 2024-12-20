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
            <h1>Financial Dashboard: Overview and Goals</h1>
            <div className="dashboard-content">
                <section>
                    <ResumenGeneral />
                </section>

                <section>
                    <h2>Goals and Budgets</h2>
                    <MetasPresupuestos />
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
