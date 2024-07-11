let ukS=localStorage.getItem("yofinanciero");
let uk=JSON.parse(ukS);
let app="";

const codigo = (Math.floor(Math.random() * (1000 - 100 + 1)) + 100)+"clientes";
let obj=[];

export function empresa(code, permisos, refrescar) {
    app=document.querySelector(`.p-2[data-value="${code}"] .card-body`);
    sitio();    
    
}
function sitio(){
    let view=`
    <div class="card">
        <div class="card-header">
            Empresa
        </div>
        <div class="card-body">
            <div class="container my-3">
                <div class="row" >
                    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 py-4 bg-white" id="formulario">
                    
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 py-4 bg-white" id="listaempresa">
                    
                    </div>
                </div>
            </div>  
        </div>      
    </div>
    `;
    app.innerHTML=view;
    listaempresa();
    formulario();
}
function formulario(){
    const forme=document.querySelector("#formulario");
    let view=`
    <h2 class="">Registrar</h2>

    <form id="formulariotest" class="mt-4">
        <div class="mb-3">
            <label class="form-label" for="empresa">Empresa:</label>
            <input type="text" class="form-control" id="empresa">
        </div>
        <div class="mb-3">
            <label class="form-label" for="ubicacion">Ubicacion:</label>
            <input type="text" class="form-control" id="ubicacion">
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-success">Guardar</button>
            <button class="btn btn-secondary">Limpiar</button>
        </div>
    </form>
    
    
    `;
    forme.innerHTML=view;
    //const form=document.querySelector("#formulariotest");
    //form.addEventListener("submit",e=>enviar(e,form));

}



function listaempresa(){
    const lalumnos=document.querySelector("#listaempresa");

    let view=`
        <h5 class="">Lista de empresas</h5>

        <table class="table table-hover mt-4">
            <thead>
                <tr>
                    <th scope="">N°</th>
                    <th scope="">Empresa</th>
                    <th scope="">Ubicacion</th>
               
                    <th scope=" " class="text-center">Funciones</th>
                </tr>
            </thead>
            <tbody id="getempresa">
            </tbody>
        </table>
    `;
    lalumnos.innerHTML=view;
    getempresa();
}
function getempresa(){
    const emp=document.querySelector("#getempresa");
    
    
    fetch(`./api`)
    .then(res=>res.json())
    .then(data=>{
        console.log("datos:",data)
        let view=``,ban=0;

        data.map(lista=>{
            obj.push(lista);
            ban+=1;
            view+=`
            <tr>
                <td>${ban}</td>
                <td>${lista.nombre_emp}</td>
                <td>${lista.ubicacion}</td>
                <td>
                    <a onclick="actualizar(${lista.idempresa})" class="btn btn-primary">
                        <i class="bi bi-pencil-square"></i>
                    </a> 
                    <a  onclick="eliminar(${lista.idempresa})" class="btn btn-danger">
                        <i class="bi bi-calendar2-x"></i>
                    </a>
                </td>
            </tr>`;
        })
        emp.innerHTML=view;
    })
}

window.sitio = sitio;