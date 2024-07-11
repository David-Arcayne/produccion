import { divisasconfig } from "../formularios/divisas.js";


const formularios = {
    'divisas': (codigo, permisos, refrescar) => divisasconfig(codigo, permisos, refrescar),

};

export function cargarFormulario(code, codigo, permisos, menuprimario, menusegundario, refrescar) {
    formularios[code](codigo, permisos, menuprimario, menusegundario, refrescar);
}
