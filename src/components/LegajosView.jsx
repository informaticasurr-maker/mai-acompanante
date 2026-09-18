import React, { useState } from 'react';
import { useLegajos } from '../context/LegajosContext';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function LegajosView() {
  const { legajos, addLegajo, updateLegajo, deleteLegajo } = useLegajos();
  const { currentUser } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentLegajo, setCurrentLegajo] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  const emptyForm = {
    pacNombre: '',
    pacDni: '',
    pacObraSocial: '',
    pacAfiliado: '',
    institucion: '',
    diagnostico: '',
    perfil: '',
    bitacoraUrl: ''
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleEdit = (legajo) => {
    setCurrentLegajo(legajo.id);
    setFormData(legajo);
    setFileToUpload(null);
    setIsEditing(true);
  };

  const handleNew = () => {
    setCurrentLegajo(null);
    setFormData(emptyForm);
    setFileToUpload(null);
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let finalData = { ...formData };

    if (fileToUpload && currentUser) {
      setIsUploading(true);
      try {
        const fileRef = ref(storage, `bitacoras/${currentUser.uid}/${Date.now()}_${fileToUpload.name}`);
        await uploadBytes(fileRef, fileToUpload);
        const url = await getDownloadURL(fileRef);
        finalData.bitacoraUrl = url;
      } catch (error) {
        console.error("Error subiendo archivo:", error);
        alert("No se pudo subir la bitácora.");
      }
      setIsUploading(false);
    }

    if (currentLegajo) {
      updateLegajo(currentLegajo, finalData);
    } else {
      addLegajo(finalData);
    }
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Estás segura de que quieres eliminar este legajo?')) {
      deleteLegajo(id);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const inputClass = "w-full rounded-md border border-slate-300 p-2 text-sm bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide mt-3";

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Directorio de Alumnos</h2>
          <p className="text-sm text-slate-500">Administra los perfiles de tus alumnos para autocompletar documentos y adecuar tareas.</p>
        </div>
        {!isEditing && (
          <button onClick={handleNew} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Nuevo Alumno
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-lg font-bold text-indigo-900">{currentLegajo ? 'Editar Legajo' : 'Crear Nuevo Legajo'}</h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-2">Datos Personales y Escolares</h4>
              <label className={labelClass}>Nombre Completo</label>
              <input type="text" name="pacNombre" value={formData.pacNombre} onChange={handleChange} className={inputClass} required />
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelClass}>DNI</label>
                  <input type="text" name="pacDni" value={formData.pacDni} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Institución / Escuela</label>
                  <input type="text" name="institucion" value={formData.institucion} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <label className={labelClass}>Obra Social o Prepaga</label>
              <input type="text" name="pacObraSocial" value={formData.pacObraSocial} onChange={handleChange} className={inputClass} />
              
              <label className={labelClass}>Nº de Afiliado</label>
              <input type="text" name="pacAfiliado" value={formData.pacAfiliado} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <h4 className="font-bold text-slate-700 mb-2">Perfil Pedagógico</h4>
              <label className={labelClass}>Diagnóstico principal</label>
              <select name="diagnostico" value={formData.diagnostico} onChange={handleChange} className={inputClass} required>
                <option value="">Seleccionar...</option>
                <option value="Dislexia">Dislexia / DEA</option>
                <option value="TEA">Trastorno del Espectro Autista (TEA)</option>
                <option value="Motriz">Discapacidad Motriz</option>
                <option value="TDAH">TDAH</option>
                <option value="Intelectual">Discapacidad Intelectual</option>
                <option value="Otro">Otro / Múltiple</option>
              </select>

              <label className={labelClass}>Estilo de Aprendizaje / Notas para adecuar</label>
              <textarea 
                name="perfil" 
                value={formData.perfil} 
                onChange={handleChange} 
                className={`${inputClass} h-32 resize-none`} 
                placeholder="Ej: Se beneficia de textos cortos, viñetas, esquemas visuales. Requiere instrucciones dadas paso a paso..."
              ></textarea>

              <div className="mt-6 border-t pt-4">
                <h4 className="font-bold text-slate-700 mb-2">Bitácora del Alumno</h4>
                <p className="text-xs text-slate-500 mb-3">Sube informes, entrevistas familiares o PDF con la trayectoria escolar.</p>
                
                {formData.bitacoraUrl && (
                  <div className="mb-3 p-3 bg-blue-50 rounded-md border border-blue-200 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Ya existe una bitácora guardada</span>
                    <a href={formData.bitacoraUrl} target="_blank" rel="noopener noreferrer" className="text-sm bg-white border border-blue-200 px-3 py-1 rounded text-blue-600 hover:bg-blue-100 font-semibold transition-colors">
                      Ver/Descargar
                    </a>
                  </div>
                )}

                <label className={labelClass}>{formData.bitacoraUrl ? 'Reemplazar bitácora actual' : 'Subir nuevo archivo'}</label>
                <input 
                  type="file" 
                  accept=".pdf, .jpg, .jpeg, .png" 
                  onChange={(e) => setFileToUpload(e.target.files[0])}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg" disabled={isUploading}>Cancelar</button>
            <button type="submit" disabled={isUploading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center gap-2">
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando y Subiendo...
                </>
              ) : (
                "Guardar Legajo"
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legajos.length === 0 ? (
            <div className="col-span-full text-center p-12 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-500 mb-4">No tienes alumnos cargados todavía.</p>
              <button onClick={handleNew} className="text-indigo-600 font-bold hover:underline">¡Crea tu primer legajo!</button>
            </div>
          ) : (
            legajos.map(legajo => (
              <div key={legajo.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-50 border-b border-indigo-100 p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-indigo-900">{legajo.pacNombre}</h3>
                    <span className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded mt-1 font-medium">
                      {legajo.diagnostico || 'Sin diagnóstico'}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(legajo)} className="p-1 text-slate-400 hover:text-indigo-600" title="Editar">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => handleDelete(legajo.id)} className="p-1 text-slate-400 hover:text-red-600" title="Eliminar">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <div className="p-4 text-sm text-slate-600 space-y-2">
                  <p><span className="font-semibold">O. Social:</span> {legajo.pacObraSocial}</p>
                  <p><span className="font-semibold">Escuela:</span> {legajo.institucion}</p>
                  <p className="pt-2 border-t mt-2 text-xs italic text-slate-500 line-clamp-3">
                    "{legajo.perfil}"
                  </p>
                  
                  {legajo.bitacoraUrl && (
                    <div className="mt-3 pt-3 border-t flex justify-end">
                      <a 
                        href={legajo.bitacoraUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        Ver Bitácora / Informe
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
