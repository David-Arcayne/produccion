let ukS=localStorage.getItem("yofinanciero");
let uk=JSON.parse(ukS);
let app="";

const codigo = (Math.floor(Math.random() * (1000 - 100 + 1)) + 100)+"divisas";

export function divisasconfig(code, permisos, refrescar) {
    app=document.querySelector(`.p-2[data-value="${code}"] .card-body`);
    sitio();    
    
}

function menudivisas(event){
    const dataid = event.currentTarget.getAttribute('data-id');
    const [funcion, id, ids] = dataid.split(',');
    
    switch (funcion) {
        case "eliminardivisa":
            eliminardivisa(id,ids);
            break;
        case "editardivisa":
            editardivisa(id);
            break;
        // Agrega otros casos según sea necesario
        default:
            // Manejo para casos no coincidentes
            sitio();
            break;
    }

}
function eliminardivisa(id,ids){
    console.log(id,ids);
}
function editardivisa(id){
    console.log(id);
}

function sitio(){
    let view=`
        <div class="container">
        <h2 class="text-center">Registrar divisa</h2>
        <form id="formulario${codigo}">
         <input type="hidden" name="ver" value="registrodivisas">
        <input type="hidden" name="empresa" value="${uk[0].empresa.idempresa}">

          <div class="row">
            <div class="col-md-6">
              <label for="currencyName">Nombre moneda</label>
              <input type="text" class="form-control" id="currencyName" placeholder="Bolivianos" name="nombre">
            </div>
            <div class="col-md-6">
              <label for="isocode">Iso code</label>
              <input type="text" class="form-control" id="isocode" placeholder="Bs" name="isocode">
            </div>
          </div>
          
          <button class="btn btn-outline-success mr-1" id="agre" href="#">Guardar</button>

         
           
        </form>
      
        <table class="table">
          <thead>
              <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Moneda</th>
                  <th scope="col">Iso code</th>
                  <th scope="col">Fecha Registro</th>
                  <th scope="col">Funciones</th>
              </tr>
          </thead>
          <tbody id="listamonedas">
              
             
              <!-- Filas de datos aquí -->
          </tbody>
      </table>
        
      </div>
    `;
    app.innerHTML=view;

    listamonedas();
    const forme = document.querySelector(`#formulario${codigo}`);
    forme.addEventListener("submit", (e) => sendform(e, forme));
    // let searchInput = document.getElementById("buscarclientes");
// searchInput.addEventListener("input", buscarclientes);
}
function buscarclientes(dato) {
    console.log(dato);
      var input, filter, table, tr, i,j;
      input = document.getElementById("buscarclientes");
      filter = input.value.toUpperCase();
      console.log(filter);
      table = document.getElementById("listamoneda");
      tr = table.getElementsByTagName("tr");
      console.log(tr);
      for (i = 0; i < tr.length; i++) {
        let tds = tr[i].getElementsByTagName("td");
        console.log(tds)
        let flag=false;
        for (j=0;j<tds.length;j++){
            let td=tds[j];
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                flag = true;
              } 
        }
        if(flag){
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
      }
    }
function listamonedas(){
    const cl=document.querySelector("#listamonedas");
    
    fetch(`./api/listamonedas/${uk[0].empresa.idempresa}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        // const jsonString = JSON.stringify(data);
        // localStorage.setItem("clientes", jsonString);
        let resu="";
        data.map(lista=>{
            resu+=`<tr>
            <td>${lista.nombre}</td>
            <td>${lista.isocode}</td>
            <td><a data-id="eliminardivisa,${lista.id}" class="btn btn-danger"><i class="bi bi-trash"></i></a> <a data-id="editardivisa,${lista.id}" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></a></td>
            </tr>`;
        })
        cl.innerHTML=resu;

        const enlaces = document.querySelectorAll(".btn");
        enlaces.forEach(enlace => {
            enlace.addEventListener("click", menudivisas);
        });
    })
}

function eliminarCliente(dato){
if(confirm("Desea Eliminar..?")){
    fetch(`./api/eliminarcliente/${dato}`)
    .then(res=>res.json())
    .then(data=>{
        listaclientes();
    })
}
}

function buscador(dato) {
  
    var input, filter, table, tr, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById(dato);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      let tds = tr[i].getElementsByTagName("td");
      let flag=false;
      for (j=0;j<tds.length;j++){
          let td=tds[j];
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              flag = true;
            } 
      }
      if(flag){
          tr[i].style.display = "";
      }
      else {
          tr[i].style.display = "none";
      }
    }
  }

  
function editarCliente(dato){
    let clis=localStorage.getItem("clientes");
    let objcliente=JSON.parse(clis);
    console.log(objcliente)
    const cl=objcliente.filter(x=>x.id==dato);
    console.log(cl);
     let view=``;
    

    view+=` 
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a data-id="sitio" class="btn btn-success"><i class="bi bi-rewind-circle"></i>Volver</a></li>
    <li class="breadcrumb-item active" aria-current="page">Editar ${cl[0].nsocial}</li>
  </ol>
</nav>
    <h4>Clientes:</h4>
    <form id="formulario${codigo}">
    <input name="ver" type="hidden" value="registroclientef5">
    <input name="empresa" type="hidden" value="${uk[0].empresa.idempresa}">
    <input name="idc" type="hidden" value="${dato}">

    <div class="row">
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Razon Social*</label><input type="text" name="nombre" id="nombre" class="form-control" placeholder="Razón Social*" value="${cl[0].nsocial}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Nombre Comercial*</label><input type="text" name="nombrecomercial" id="nombrecomercial" class="form-control" placeholder="Nombre Comercial*" value="${cl[0].ncomercial}"></div>
    </div>
    <div class="col-md-6">
        <div class="mb-3"><label class="form-label" for="first_name">Tipo de Cliente*</label><select name="tipo" id="tipo" class="form-select" required=""><option value="">Escoja el tipo</option><option value="0" selected>Cliente</option></select></div>
    </div>
    <div class="col-md-6">
        <div class="mb-3"><label class="form-label" for="first_name">Tipo de documento*</label>
            <select name="tipodocumento" id="tipodocumento" class="form-select" required="">
                <option value="" >Elija un el tipo de documento</option>
                <option value="1">CI - Cedula de identidad</option>
                <option value="2">CEX - Cedula de identidad de extranjero</option>
                <option value="3">PAS - Pasaporte</option>
                <option value="4">OD - Otro documento de identidad</option>
                <option value="5" selected>NIT - Número de identificación</option>
            </select>
        </div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Nro de documento*</label><input type="text" name="nit" id="nit" class="form-control" placeholder="NIT/CI/CEX/PAS/OD" value="${cl[0].nit}"></div>
    </div>
    <div class="col-md-6">
        <div class="mb-3"><label class="form-label" for="first_name">Email</label><input type="email" name="email" id="email" class="form-control" placeholder="Email" value="${cl[0].email}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Dirección*</label><input type="text" name="direccion" id="direccion" class="form-control" placeholder="Direccion*" value="${cl[0].direccion}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Telefono*</label><input type="text" name="telefono" id="telefono" class="form-control" placeholder="Telefono" value="${cl[0].telefono}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Movil*</label><input type="text" name="mobil" id="mobil" class="form-control" placeholder="Mobil*" value="${cl[0].mobil}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Pais*</label><input type="text" name="pais" id="pais" value="Bolivia" class="form-control" placeholder="Pais*" value="${cl[0].pais}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Ciudad*</label><input type="text" name="ciudad" id="ciudad" class="form-control" placeholder="Ciudad*" value="${cl[0].ciudad}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Zona</label><input type="text" name="zona" id="zona" class="form-control" placeholder="Zona" value="${cl[0].zona}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Web</label><input type="text" name="web" id="web" class="form-control" placeholder="Pagina WEB" value="${cl[0].web}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Contacto</label><input type="text" name="contacto" id="contacto" class="form-control" placeholder="Nombre Contacto" value="${cl[0].contacto}"></div>
    </div>
    <div class="col-md-6 text-start">
        <div class="mb-3"><label class="form-label" for="username">Detalle del Cliente</label><textarea type="text" name="detalle" id="detalle" rows="1" class="form-control" placeholder="Detalle del Cliente">${cl[0].detalle}</textarea></div>
    </div>
    <div class="col-md-6" style="text-align: left;margin-top: 5px;">

    </div>
    <div class="col-md-2 d-grid" style="text-align: right;margin-top: 5px;"><button id="submitBtn" class="btn btn-outline-primary" type="submit">Actualizar..</button></div>
</div>


    </form>
    <hr>
    <div class="table-responsive">
    <input type="text" id="buscarclientes" class="form-control"  placeholder="Buscar ">
    <table class="table">
    <thead>
    <th>Nombre Social</th>
    <th>Nombre Comercial</th>
    <th>NIT</th>
    <th>Pais</th>
    <th>Ciudad</th>
    <th>Zona/Barrio</th>
    <th>Direccion</th>
    <th>Telefono</th>
    <th>Mobil</th>
    <th>Detalle</th>
    <th></th>
    </thead>
    <tbody id="listaclientes"></tbody>
    </table>
    </div>
    `;
    app.innerHTML=view;

    listaclientes();
    const forme = document.querySelector(`#formulario${codigo}`);
    forme.addEventListener("submit", (e) => sendform(e, forme));
    let searchInput = document.getElementById("buscarclientes");
    searchInput.addEventListener("input", buscarclientes);
    const enlaces = document.querySelectorAll(".btn");
        enlaces.forEach(enlace => {
            enlace.addEventListener("click", menuempresa);
        });

}

function sendform(e,form){
        e.preventDefault();
        const dato=new FormData(form);
        fetch(`./api/`,{
            method:"POST",
            body:dato
        })
        .then(res=>res.json())
        .then(data=>{

            if(data[0]=="ok"){
                if(data[2]=="registrodivisa"){
                    form.innerHTML=`<div class="alert alert-success" id="alerta">${data[1]}</div>`;
                    
                    setTimeout(() => {
                        
                        form.reset();
                        sitio();
                    }, 2000);
                    return;
                }
               
            }else{
                form.innerHTML=`<div class="alert alert-danger" id="alerta">${data[1]}</div>`;
                
                
                setTimeout(() => {
                    form.remove();
                    sitio();
                }, 3000);
                return;
            }
        })
    
}