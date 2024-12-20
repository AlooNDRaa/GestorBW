import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ResumenGeneral() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedTransacciones =
      JSON.parse(localStorage.getItem("transacciones")) || [];

    const ingresosPorMes = storedTransacciones.reduce((acc, transaccion) => {
      const mes = transaccion.fecha.slice(3, 5); 
      const año = transaccion.fecha.slice(6, 10); 
      const mesAño = `${mes}-${año}`; 
      if (!acc[mesAño]) {
        acc[mesAño] = { name: `${mes}/${año}`, Incomes: 0, Expenses: 0 };
      }

      if (transaccion.monto > 0) acc[mesAño].Incomes += transaccion.monto;
      else acc[mesAño].Expenses += transaccion.monto;

      return acc;
    }, {});

    const meses = Object.values(ingresosPorMes);
    setData(meses);
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Current Financial Status</h3>
      <BarChart
        width={600}
        height={500}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 9 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Incomes" fill="#16262e" />
        <Bar dataKey="Expenses" fill="#0e3b40" />
      </BarChart>
      <p className="dash-p">
        Total Income: ${data.reduce((total, item) => total + item.Incomes, 0)}{" "}
        | Total Expense: ${data.reduce((total, item) => total + item.Expenses, 0)}
      </p>
    </div>
  );
}

export default ResumenGeneral;
