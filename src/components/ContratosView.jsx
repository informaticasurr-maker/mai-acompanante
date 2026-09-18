import React, { useState } from 'react';

export default function ContratosView() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    maiNombre: '',
    maiDni: '',
    maiDomicilio: '',
    maiLocalidad: '',
    maiProfesion: '',
    maiMatricula: '',
    tutorNombre: '',
    tutorDni: '',
    tutorDomicilio: '',
    alumnoNombre: '',
    alumnoDni: '',
    escuelaNombre: '',
    escuelaDireccion: '',
    diasAsistencia: '',
    horarioInicio: '',
    horarioFin: '',
    horasExtra: '2',
    obraSocial: '',
    modalidadPago: 'Sistema de Reintegro',
    diasDemora: '60',
    anoLectivo: new Date().getFullYear().toString(),
    ciudadFirma: '',
  });

  const [contratoGenerado, setContratoGenerado] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarContrato = () => {
    const template = `
# CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES DE APOYO A LA INCLUSIÓN ESCOLAR (MAI)

Entre **${formData.maiNombre}**, DNI Nº ${formData.maiDni}, con domicilio en ${formData.maiDomicilio}, de la localidad de ${formData.maiLocalidad}, con título habilitante de ${formData.maiProfesion}${formData.maiMatricula ? ', Matrícula Profesional Nº ' + formData.maiMatricula : ''}, en adelante denominada **LA PRESTADORA**, por una parte; y el/la Sr./Sra. **${formData.tutorNombre}**, DNI Nº ${formData.tutorDni}, con domicilio en ${formData.tutorDomicilio}, en adelante denominado/a **EL RESPONSABLE**, por la otra parte; en relación al menor **${formData.alumnoNombre}**, DNI Nº ${formData.alumnoDni}, en adelante denominado **EL BENEFICIARIO**, se conviene celebrar el presente Contrato de Prestación de Servicios de conformidad con las siguientes cláusulas y condiciones:

**CLÁUSULA PRIMERA: OBJETO DEL SERVICIO**
LA PRESTADORA se compromete a brindar el servicio profesional de Maestro/a de Apoyo a la Inclusión (MAI) a favor de EL BENEFICIARIO para el Ciclo Lectivo ${formData.anoLectivo}. Las tareas específicas consistirán en el diseño y seguimiento del Proyecto Pedagógico Individual (PPI), la adaptación de contenidos curriculares y el andamiaje pedagógico dentro del aula, en articulación constante con los docentes de la institución educativa.

**CLÁUSULA SEGUNDA: ÁMBITO Y CARGA HORARIA**
Las prestaciones se desarrollarán de manera presencial en el establecimiento educativo ${formData.escuelaNombre}, ubicado en la calle ${formData.escuelaDireccion}.
El esquema de atención acordado será el siguiente:
- **Días de asistencia presencial:** ${formData.diasAsistencia}
- **Horario:** De ${formData.horarioInicio} a ${formData.horarioFin} horas.
- **Horas de articulación extra-áulica:** Se estipulan ${formData.horasExtra} horas mensuales destinadas exclusivamente a reuniones de equipo terapéutico/escolar, confección de informes y diseño de material adaptado.

**CLÁUSULA TERCERA: HONORARIOS Y NOMENCLADOR NACIONAL**
Las partes acuerdan que el valor del servicio se fijará de conformidad con el Módulo de Apoyo a la Integración Escolar del Nomenclador Nacional de Prestaciones Básicas para Personas con Discapacidad, vigente al momento de la facturación. Las actualizaciones que disponga el Ministerio de Salud de la Nación sobre dicho nomenclador se aplicarán de forma automática sobre los honorarios a devengar. LA PRESTADORA emitirá una factura legal mes vencido por la totalidad de las horas o módulo correspondientes.

**CLÁUSULA CUARTA: MODALIDAD DE PAGO Y RESPONSABILIDAD ANTE LA OBRA SOCIAL**
EL RESPONSABLE gestionará la cobertura total de la prestación ante la Obra Social o Prepaga ${formData.obraSocial}, bajo la modalidad de ${formData.modalidadPago}, presentando en tiempo y forma la facturación y documentación que LA PRESTADORA le facilite.
- **Resguardo de pago:** Queda expresamente pactado que EL RESPONSABLE es el obligado principal del pago de los honorarios profesionales.
- **Cláusula de demora:** Si la Obra Social/Prepaga rechazara, debitara de forma injustificada o demorara el pago/reintegro por un plazo mayor a ${formData.diasDemora} días corridos desde la fecha de presentación de la factura, EL RESPONSABLE asumirá la deuda y abonará los honorarios devengados de manera particular dentro de los 10 días posteriores al vencimiento de dicho plazo.

**CLÁUSULA QUINTA: RÉGIMEN DE INASISTENCIAS, PAROS Y FERIADOS**
- **Inasistencia de EL BENEFICIARIO:** Si el niño no asistiera a la escuela por razones de salud, viaje o motivos personales, el día se computará y facturará como trabajado, toda vez que LA PRESTADORA reservó su disponibilidad horaria.
- **Inasistencia de LA PRESTADORA:** En caso de enfermedad o fuerza mayor, LA PRESTADORA dará aviso inmediato a la familia y a la escuela. Las horas no trabajadas por su cuenta no serán facturadas o, en su defecto, serán recuperadas en días y horarios a coordinar.

**CLÁUSULA SEXTA: DOCUMENTACIÓN Y SEGUROS**
LA PRESTADORA se compromete a mantener vigente su inscripción en la AFIP, presentar título, analítico, certificado de reincidencia y contratar por su cuenta una póliza de Seguro de Accidentes Personales con cláusula de no repetición a favor del establecimiento educativo.

**CLÁUSULA SÉPTIMA: RESCISIÓN ANTICIPADA**
Cualquiera de las partes podrá dar por terminado este contrato notificando a la otra parte de manera fehaciente con una anticipación mínima de 30 días corridos.

En prueba de conformidad, se firman dos (2) ejemplares de un mismo tenor y a un solo efecto, en la localidad de ${formData.ciudadFirma}, a los ___ días del mes de ___________ de ${formData.anoLectivo}.
`;
    setContratoGenerado(template);
    setStep(3);
  };

  const inputClass = "w-full rounded-md border border-slate-300 p-2 text-sm bg-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Generador de Contratos MAI</h2>
        <div className="flex gap-2">
          <span className={"w-3 h-3 rounded-full " + (step >= 1 ? 'bg-indigo-600' : 'bg-slate-200')}></span>
          <span className={"w-3 h-3 rounded-full " + (step >= 2 ? 'bg-indigo-600' : 'bg-slate-200')}></span>
          <span className={"w-3 h-3 rounded-full " + (step >= 3 ? 'bg-indigo-600' : 'bg-slate-200')}></span>
        </div>
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">1. Datos de la Profesional (MAI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Nombre y Apellido</label><input type="text" name="maiNombre" value={formData.maiNombre} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>DNI</label><input type="text" name="maiDni" value={formData.maiDni} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Domicilio</label><input type="text" name="maiDomicilio" value={formData.maiDomicilio} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Localidad</label><input type="text" name="maiLocalidad" value={formData.maiLocalidad} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Profesión (Ej: Psicopedagoga)</label><input type="text" name="maiProfesion" value={formData.maiProfesion} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Matrícula (Opcional)</label><input type="text" name="maiMatricula" value={formData.maiMatricula} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">2. Datos de la Familia y Alumno</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Nombre del Tutor</label><input type="text" name="tutorNombre" value={formData.tutorNombre} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>DNI del Tutor</label><input type="text" name="tutorDni" value={formData.tutorDni} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Domicilio del Tutor</label><input type="text" name="tutorDomicilio" value={formData.tutorDomicilio} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Nombre del Alumno</label><input type="text" name="alumnoNombre" value={formData.alumnoNombre} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>DNI del Alumno</label><input type="text" name="alumnoDni" value={formData.alumnoDni} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button onClick={() => setStep(2)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Siguiente Paso &rarr;
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">3. Escuela y Horarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Nombre de Escuela</label><input type="text" name="escuelaNombre" value={formData.escuelaNombre} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Dirección Escuela</label><input type="text" name="escuelaDireccion" value={formData.escuelaDireccion} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Días de asistencia (Ej: Lunes, Miércoles y Viernes)</label><input type="text" name="diasAsistencia" value={formData.diasAsistencia} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Horario Entrada</label><input type="time" name="horarioInicio" value={formData.horarioInicio} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Horario Salida</label><input type="time" name="horarioFin" value={formData.horarioFin} onChange={handleChange} className={inputClass} /></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">4. Obra Social y Pagos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelClass}>Obra Social / Prepaga</label><input type="text" name="obraSocial" value={formData.obraSocial} onChange={handleChange} className={inputClass} /></div>
                <div>
                  <label className={labelClass}>Modalidad de Pago</label>
                  <select name="modalidadPago" value={formData.modalidadPago} onChange={handleChange} className={inputClass}>
                    <option value="Sistema de Reintegro">Reintegro a Familia</option>
                    <option value="Pago Directo al Prestador">Pago Directo a MAI</option>
                  </select>
                </div>
                <div><label className={labelClass}>Ciudad de Firma</label><input type="text" name="ciudadFirma" value={formData.ciudadFirma} onChange={handleChange} className={inputClass} placeholder="Ej: Córdoba Capital" /></div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-sm text-blue-800">
                  <strong>Tip de Facturación:</strong> ¿Querés saber si la Superintendencia ya derivó los fondos a la obra social? <a href="https://www.sssalud.gob.ar/index.php?page=integracion&utm_source=gemini" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-900">Consultá el Mecanismo de Integración aquí.</a>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 px-6 rounded-lg transition-colors">
                &larr; Volver
              </button>
              <button onClick={generarContrato} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Generar Contrato
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-semibold">Contrato generado exitosamente</span>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(contratoGenerado);
                  alert("¡Contrato copiado al portapapeles!");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Copiar Texto
              </button>
            </div>
            
            <div className="bg-white border border-slate-300 rounded-lg p-8 shadow-inner overflow-auto whitespace-pre-wrap text-slate-800 text-sm font-serif max-h-[500px]">
              {contratoGenerado}
            </div>

            <div className="flex justify-center mt-4">
              <button onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline">
                Crear otro contrato
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
