import React, { useState } from 'react';

export default function PresupuestoView() {
  const [data, setData] = useState({
    profNombre: '',
    profEspecialidad: 'Maestro/a de Apoyo a la Inclusión',
    profCuit: '',
    profMatricula: '',
    profDireccion: '',
    profTelefono: '',
    profEmail: '',
    pacNombre: '',
    pacDni: '',
    pacObraSocial: '',
    pacAfiliado: '',
    prestacion: 'Módulo de Apoyo a la Integración Escolar',
    cantidadModulos: '1',
    valorModulo: '300000',
    bancoNombre: '',
    bancoCbu: '',
    bancoAlias: '',
    bancoTipo: 'Caja de Ahorro',
    fecha: new Date().toLocaleDateString('es-AR')
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  const subtotal = parseFloat(data.cantidadModulos || 0) * parseFloat(data.valorModulo || 0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(val);
  };

  const inputClass = "w-full rounded-md border border-slate-300 p-2 text-sm bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide";

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Formulario (Oculto al imprimir) */}
      <div className="w-full lg:w-1/3 no-print bg-slate-50 border border-slate-200 rounded-xl p-6 h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Generar Presupuesto</h2>
          <button 
            onClick={handlePrint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Imprimir / PDF
          </button>
        </div>

        <div className="space-y-6">
          {/* Seccion Profesional */}
          <div>
            <h3 className="text-sm font-bold text-indigo-900 border-b border-indigo-200 pb-1 mb-3">Datos del Profesional</h3>
            <div className="space-y-3">
              <div><label className={labelClass}>Nombre y Apellido</label><input type="text" name="profNombre" value={data.profNombre} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Especialidad</label><input type="text" name="profEspecialidad" value={data.profEspecialidad} onChange={handleChange} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={labelClass}>CUIT</label><input type="text" name="profCuit" value={data.profCuit} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Matrícula</label><input type="text" name="profMatricula" value={data.profMatricula} onChange={handleChange} className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>Dirección</label><input type="text" name="profDireccion" value={data.profDireccion} onChange={handleChange} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={labelClass}>Teléfono</label><input type="text" name="profTelefono" value={data.profTelefono} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Email</label><input type="email" name="profEmail" value={data.profEmail} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>
          </div>

          {/* Seccion Alumno */}
          <div>
            <h3 className="text-sm font-bold text-indigo-900 border-b border-indigo-200 pb-1 mb-3">Datos del Beneficiario</h3>
            <div className="space-y-3">
              <div><label className={labelClass}>Nombre del Alumno/a</label><input type="text" name="pacNombre" value={data.pacNombre} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>DNI</label><input type="text" name="pacDni" value={data.pacDni} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Obra Social / Prepaga</label><input type="text" name="pacObraSocial" value={data.pacObraSocial} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Nº de Afiliado</label><input type="text" name="pacAfiliado" value={data.pacAfiliado} onChange={handleChange} className={inputClass} /></div>
            </div>
          </div>

          {/* Seccion Presupuesto */}
          <div>
            <h3 className="text-sm font-bold text-indigo-900 border-b border-indigo-200 pb-1 mb-3">Detalle del Presupuesto</h3>
            <div className="space-y-3">
              <div><label className={labelClass}>Prestación (Ej: Módulo MAI)</label><input type="text" name="prestacion" value={data.prestacion} onChange={handleChange} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={labelClass}>Cantidad (Módulos/Hs)</label><input type="number" name="cantidadModulos" value={data.cantidadModulos} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Valor Unitario ($)</label><input type="number" name="valorModulo" value={data.valorModulo} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>
          </div>

          {/* Seccion Bancos */}
          <div>
            <h3 className="text-sm font-bold text-indigo-900 border-b border-indigo-200 pb-1 mb-3">Datos Bancarios para Cobro</h3>
            <div className="space-y-3">
              <div><label className={labelClass}>Banco</label><input type="text" name="bancoNombre" value={data.bancoNombre} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Tipo de Cuenta</label><input type="text" name="bancoTipo" value={data.bancoTipo} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>CBU</label><input type="text" name="bancoCbu" value={data.bancoCbu} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Alias</label><input type="text" name="bancoAlias" value={data.bancoAlias} onChange={handleChange} className={inputClass} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vista Previa del PDF (Papel A4) */}
      <div className="w-full lg:w-2/3 flex justify-center bg-slate-200 p-8 rounded-xl overflow-hidden no-print">
        {/* La "Hoja" */}
        <div className="bg-white shadow-lg w-full max-w-[210mm] min-h-[297mm] p-12 text-slate-900 print:shadow-none print:p-0 print:max-w-none print:min-h-0 print-break-inside-avoid" id="presupuesto-hoja">
          
          <div className="text-center mb-10 pb-6 border-b-2 border-slate-800">
            <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-800">Presupuesto de Honorarios</h1>
            <p className="text-sm text-slate-500 mt-2">Fecha de emisión: {data.fecha}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-bold border-b border-slate-300 pb-1 mb-3 uppercase text-sm text-slate-600">Datos del Profesional</h4>
              <p className="font-bold text-lg">{data.profNombre || 'Nombre del Profesional'}</p>
              <p>{data.profEspecialidad}</p>
              <p className="mt-2"><span className="font-semibold">CUIT:</span> {data.profCuit}</p>
              <p><span className="font-semibold">Matrícula:</span> {data.profMatricula}</p>
              <p><span className="font-semibold">Dirección:</span> {data.profDireccion}</p>
              <p><span className="font-semibold">Tel:</span> {data.profTelefono} | <span className="font-semibold">Email:</span> {data.profEmail}</p>
            </div>
            <div>
              <h4 className="font-bold border-b border-slate-300 pb-1 mb-3 uppercase text-sm text-slate-600">Datos del Alumno</h4>
              <p className="font-bold text-lg">{data.pacNombre || 'Nombre del Alumno'}</p>
              <p className="mt-2"><span className="font-semibold">DNI:</span> {data.pacDni}</p>
              <p><span className="font-semibold">Obra Social:</span> {data.pacObraSocial}</p>
              <p><span className="font-semibold">Nº Afiliado:</span> {data.pacAfiliado}</p>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="font-bold border-b border-slate-300 pb-1 mb-4 uppercase text-sm text-slate-600">Detalle de la Prestación</h4>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-y border-slate-300">
                  <th className="py-3 px-4 font-bold text-slate-700">Descripción</th>
                  <th className="py-3 px-4 font-bold text-slate-700 text-center">Cantidad</th>
                  <th className="py-3 px-4 font-bold text-slate-700 text-right">Valor Unit.</th>
                  <th className="py-3 px-4 font-bold text-slate-700 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-4 font-medium">{data.prestacion || 'Especificar Prestación'}</td>
                  <td className="py-4 px-4 text-center">{data.cantidadModulos}</td>
                  <td className="py-4 px-4 text-right">{formatCurrency(data.valorModulo)}</td>
                  <td className="py-4 px-4 text-right font-bold">{formatCurrency(subtotal)}</td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex justify-end mt-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 w-1/2">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>TOTAL ESTIMADO MENSUAL:</span>
                  <span className="text-indigo-900">{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-xs text-slate-500 text-right mt-1">* Valores sujetos a actualización del Nomenclador Nacional.</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h4 className="font-bold border-b border-slate-300 pb-1 mb-3 uppercase text-sm text-slate-600">Datos Bancarios para Pago</h4>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded text-sm">
              <p><span className="font-semibold">Banco:</span> {data.bancoNombre}</p>
              <p><span className="font-semibold">Tipo de Cuenta:</span> {data.bancoTipo}</p>
              <p><span className="font-semibold">CBU:</span> {data.bancoCbu}</p>
              <p><span className="font-semibold">Alias:</span> {data.bancoAlias}</p>
              <p className="mt-2 text-slate-600 italic">Por favor, enviar comprobante de transferencia al email indicado arriba.</p>
            </div>
          </div>

          <div className="mt-24 pt-8 grid grid-cols-2 gap-12 text-center">
            <div>
              <div className="border-b border-slate-400 mb-2 h-16 w-full max-w-[250px] mx-auto"></div>
              <p className="text-sm font-bold">{data.profNombre}</p>
              <p className="text-xs text-slate-500">{data.profEspecialidad}</p>
            </div>
            <div>
              <div className="border-b border-slate-400 mb-2 h-16 w-full max-w-[250px] mx-auto"></div>
              <p className="text-sm font-bold">Firma de Conformidad</p>
              <p className="text-xs text-slate-500">Tutor / Responsable Legal</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
