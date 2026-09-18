import React, { useState } from 'react';

export default function PlanillaView() {
  const date = new Date();
  const [data, setData] = useState({
    mes: String(date.getMonth() + 1).padStart(2, '0'),
    anio: String(date.getFullYear()),
    profNombre: '',
    pacNombre: '',
    institucion: '',
    horaEntrada: '08:00',
    horaSalida: '12:00',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  // Generar dias del mes
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const daysCount = getDaysInMonth(parseInt(data.mes), parseInt(data.anio));
  const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);

  // Nombre de los meses para el encabezado
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const mesNombre = monthNames[parseInt(data.mes) - 1] || "";

  const inputClass = "w-full rounded-md border border-slate-300 p-2 text-sm bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide";

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Formulario de Controles */}
      <div className="no-print bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Configuración de Planilla de Asistencia</h2>
          <button 
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Imprimir Planilla
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div><label className={labelClass}>Mes</label>
            <select name="mes" value={data.mes} onChange={handleChange} className={inputClass}>
              {monthNames.map((m, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>
              ))}
            </select>
          </div>
          <div><label className={labelClass}>Año</label><input type="number" name="anio" value={data.anio} onChange={handleChange} className={inputClass} /></div>
          <div className="lg:col-span-2"><label className={labelClass}>Profesional (MAI)</label><input type="text" name="profNombre" value={data.profNombre} onChange={handleChange} className={inputClass} placeholder="Nombre MAI" /></div>
          <div className="lg:col-span-2"><label className={labelClass}>Beneficiario/Alumno</label><input type="text" name="pacNombre" value={data.pacNombre} onChange={handleChange} className={inputClass} placeholder="Nombre Alumno" /></div>
          <div className="lg:col-span-2"><label className={labelClass}>Institución/Escuela</label><input type="text" name="institucion" value={data.institucion} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Entrada Estándar</label><input type="time" name="horaEntrada" value={data.horaEntrada} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Salida Estándar</label><input type="time" name="horaSalida" value={data.horaSalida} onChange={handleChange} className={inputClass} /></div>
        </div>
        <p className="text-xs text-slate-500 mt-4 bg-yellow-50 p-2 rounded border border-yellow-200">
          <strong>Tip de impresión:</strong> Para asegurar que la tabla ocupe toda la hoja, asegurate de seleccionar formato <strong>Horizontal (Landscape)</strong> en la ventana de impresión de tu navegador, y activá "Imprimir gráficos de fondo" si querés que salgan los sombreados.
        </p>
      </div>

      {/* Vista a Imprimir */}
      <div className="bg-white shadow-lg p-8 overflow-auto print:shadow-none print:p-0 print-break-inside-avoid" id="planilla-hoja">
        <style>
          {`
            @media print {
              @page { size: landscape; margin: 1cm; }
            }
          `}
        </style>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase">Planilla de Asistencia Diaria</h1>
          <h2 className="text-lg font-semibold text-slate-700">Periodo: {mesNombre} {data.anio}</h2>
        </div>

        <div className="flex justify-between mb-4 text-sm font-semibold border border-slate-800 p-2">
          <div><span className="text-slate-600">Beneficiario/a:</span> {data.pacNombre || '_____________________________'}</div>
          <div><span className="text-slate-600">Institución:</span> {data.institucion || '_____________________________'}</div>
          <div><span className="text-slate-600">Profesional:</span> {data.profNombre || '_____________________________'}</div>
        </div>

        <table className="w-full border-collapse border border-slate-800 text-xs text-center">
          <thead>
            <tr className="bg-slate-200 print:bg-slate-200">
              <th className="border border-slate-800 p-1 w-12">Día</th>
              <th className="border border-slate-800 p-1 w-20">Entrada</th>
              <th className="border border-slate-800 p-1 w-20">Salida</th>
              <th className="border border-slate-800 p-1 w-20">Total Hs.</th>
              <th className="border border-slate-800 p-1">Firma Conformidad (Directivo/Tutor)</th>
              <th className="border border-slate-800 p-1">Firma Profesional MAI</th>
              <th className="border border-slate-800 p-1 w-32">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {daysArray.map((dia) => {
              // Chequear si es fin de semana
              const dateObj = new Date(parseInt(data.anio), parseInt(data.mes) - 1, dia);
              const dayOfWeek = dateObj.getDay(); // 0 = Domingo, 6 = Sabado
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

              return (
                <tr key={dia} className={isWeekend ? "bg-slate-100 print:bg-slate-100 h-7" : "h-7"}>
                  <td className="border border-slate-800 font-bold">{dia}</td>
                  <td className="border border-slate-800">{isWeekend ? '-' : data.horaEntrada}</td>
                  <td className="border border-slate-800">{isWeekend ? '-' : data.horaSalida}</td>
                  <td className="border border-slate-800">{isWeekend ? '-' : ''}</td>
                  <td className="border border-slate-800">{isWeekend ? 'FIN DE SEMANA' : ''}</td>
                  <td className="border border-slate-800"></td>
                  <td className="border border-slate-800"></td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="mt-8 flex justify-between px-8 text-sm text-center">
          <div>
            <div className="border-b border-slate-800 w-48 mb-2"></div>
            <p className="font-bold">Firma Profesional</p>
            <p>Aclaración: {data.profNombre}</p>
          </div>
          <div>
            <div className="border-b border-slate-800 w-48 mb-2"></div>
            <p className="font-bold">Firma Institución / Familia</p>
            <p>Sello Aclaratorio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
