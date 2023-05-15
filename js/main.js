//----------Datos para mostrar u ocultar las distintas secciones del DOM
// Obtengo los botones y las secciones de contenido


const btnSeccion1 = document.getElementById("btn-seccion-1");
const btnSeccion2 = document.getElementById("btn-seccion-2");
const btnSeccion3 = document.getElementById("btn-seccion-3");
const seccion1 = document.getElementById("seccion-1");
const seccion2 = document.getElementById("seccion-2");
const seccion3 = document.getElementById("seccion-3");

// Añado los event listeners para los botones
btnSeccion1.addEventListener("click", function() {
	// Ocultamos todas las secciones excepto la primera
	seccion1.style.display = "block";
	seccion2.style.display = "none";
	seccion3.style.display = "none";
});

btnSeccion2.addEventListener("click", function() {
	// Ocultamos todas las secciones excepto la segunda
	seccion1.style.display = "none";
	seccion2.style.display = "block";
	seccion3.style.display = "none";
});

btnSeccion3.addEventListener("click", function() {
	// Ocultamos todas las secciones excepto la segunda
	seccion1.style.display = "none";
	seccion2.style.display = "none";
	seccion3.style.display = "block";
});

//-------------------Clases---------------------------
class Punto {
    constructor(x, y, z, d) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.d = d;
    }
}

class Linea {
    constructor(pinicial , pfinal){
        this.pinicial = pinicial;
        this.pfinal = pfinal;
    }
    getDist(){
        let xf = this.pfinal.x;
        let yf = this.pfinal.y;
        let xi = this.pinicial.x;
        let yi = this.pinicial.y;
        return parseFloat(Math.sqrt(Math.pow(xf-xi , 2)+Math.pow(yf - yi , 2)).toFixed(3));
    }

    getpendiente(input_pendiente){
        let horiz = this.getDist();                     //obtengo la distancia horizontal
        let vert = this.pfinal.z - this.pinicial.z;     //obtengo la distancia vertical 
        let salida = vert / horiz ;
        if (horiz == 0) {
             salida = "Vertical";
            if (vert == 0) {
                salida = "Son Iguales";
            }
                
        }else{
            switch (input_pendiente) {
                case 1: //en porcentaje
                    salida = (vert / horiz *100).toFixed(5); 
                    break;    
                case 2: //en y/x
                    salida = (vert / horiz).toFixed(5); 

                    break;    
                case 3: //en grados
                    salida = (180 * Math.atan(vert / horiz) / Math.PI).toFixed(5);
                    break;    
                default:
                    break;
            }
        }

        return salida;
    }
}


class Conjunto {
    constructor(){
        this.arrayPuntos = [];
        this.arrayLineas = [];
    }

    //guardo en mis arrays de puntos y lineas los datos correspondientes
    nuevoDato(x,y,z,d) { 
        if (!isNaN(x)) {
            if (!isNaN(y)) {
                if (!isNaN(z)) {
                    let point = new Punto (parseFloat(x), parseFloat(y), parseFloat(z), d);
                    this.arrayPuntos.push (point);
                    if (this.arrayPuntos.length > 1) {
                        let linea = new Linea (this.arrayPuntos[this.arrayPuntos.length - 2] , this.arrayPuntos[this.arrayPuntos.length - 1]);
                        this.arrayLineas.push(linea);
                    }
                }    
            }   
        }
    }

    lineaDistancia() {
        return this.arrayLineas.map((element) => element.getDist());
    }
    lineaPendiente() {
        let select_html = parseInt(document.getElementById("slc_Pendiente").value); //selecciono el formato (%, y/x, grados)

        return this.arrayLineas.map((element) => element.getpendiente(select_html));
    }

    consoleLog() {
        console.log(this.arrayPuntos);
        console.log(this.arrayLineas);
        console.table(this.lineaDistancia());
        console.table(this.lineaPendiente());
    }
    
    getPuntos(){
        return this.arrayPuntos;
    }
    getLineas(){
        return this.arrayLineas;
    }
    getArrayX(){
        return this.arrayPuntos.map(punto => punto.x);
    }
    getArrayY(){
        return this.arrayPuntos.map(punto => punto.y);
    }
    getArrayZ(){
        return this.arrayPuntos.map(punto => punto.z);
    }
    getArrayD(){
        return this.arrayPuntos.map(punto => punto.d);
    }
    getArrayXPerfil(){//obtengo un array con las distancias sumadas para cargar en mi perfil longitudinal
        let x = [0];
        for (let i = 0; i < this.lineaDistancia().length; i++) {
            x[i+1] = x[i]+this.lineaDistancia()[i];
        }
        return x;
    }
    getCantLineas(){
        return this.arrayLineas.length;
    }
    getCantPuntos(){
        return this.arrayPuntos.length;
    }
    limpiarDatos(){
        this.arrayPuntos = [];
        this.arrayLineas = [];
    }

    cargarDatos(array_puntos_in){
        for (const punto of array_puntos_in) {
            this.nuevoDato(punto.x, punto.y, punto.z, punto.d );
        }
    }
}

//--------------Botones-----------------------------------------------------------------------------------------------------------------------------------------
// accion del boton de cargar datos
document.getElementById('btnpunto').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const z = parseFloat(document.getElementById('z').value);
    const descripcion = document.getElementById('descripcion').value;

    console.clear();
    conjpuntos.nuevoDato (x, y, z, descripcion);
    lineasATabla();
    propATabla();
});

// accion del boton de guardar los datos en el local storage
document.getElementById('btnguardar').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    guardarLocal();
});

// accion del boton de Resutarar los datos desde el local storage
document.getElementById('btnrestaurar').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    restaurarLocal();
    lineasATabla();
});

// accion del boton Mostrar propiedad de Distancia y angulo entre lineas
document.getElementById('btnpropiedades').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    propATabla();
});


// accion del boton Mostrar propiedad de Distancia y angulo entre lineas
document.getElementById('slc_Pendiente').addEventListener( 'change', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    propATabla();
    // console.clear();
    // conjpuntos.consola();
    
});
// accion del boton Mostrar propiedad de Distancia y angulo entre lineas
document.getElementById('Json').addEventListener( 'change', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    CargarJson();
});




//--------------------funciones-------------------------------------------------------------------------------------

//cargo del archivo datos.json los puntos en forma asincronica
function CargarJson(){
    fetch("./datos.json")
    .then((res) => res.json())
    .then((data) => {
        conjpuntos.limpiarDatos();
        conjpuntos.cargarDatos(data);
        lineasATabla();
        propATabla();
    })
}
//imprimir en tablas HTML las lineas
function lineasATabla(){ 
    
    let tabla_pi_html = document.getElementById("table_pi");
    let tabla_pf_html = document.getElementById("table_pf");
    tabla_pf_html.innerHTML = ""; //limpio el cuerpo de la tabla
    tabla_pi_html.innerHTML = "";

    // Crear una nueva fila en las 2 tablas
    for (const lineas of conjpuntos.getLineas()) {
        let fila_pf = tabla_pf_html.insertRow();
        let celda1_pf = fila_pf.insertCell();
        let celda2_pf = fila_pf.insertCell();
        let celda3_pf = fila_pf.insertCell();
        let celda4_pf = fila_pf.insertCell();
        celda1_pf.innerHTML = lineas.pfinal.x;
        celda2_pf.innerHTML = lineas.pfinal.y;
        celda3_pf.innerHTML = lineas.pfinal.z;
        celda4_pf.innerHTML = lineas.pfinal.d;

        let fila_pi = tabla_pi_html.insertRow();
        let celda1_pi = fila_pi.insertCell();
        let celda2_pi = fila_pi.insertCell();
        let celda3_pi = fila_pi.insertCell();
        let celda4_pi = fila_pi.insertCell();
        celda1_pi.innerHTML = lineas.pinicial.x;
        celda2_pi.innerHTML = lineas.pinicial.y;
        celda3_pi.innerHTML = lineas.pinicial.z;
        celda4_pi.innerHTML = lineas.pinicial.d;
    }
}    
//imprime en tabla las propiedades de las lineas
function propATabla(){
    document.getElementById("t_prop").innerHTML = `
        <tr >
            <th colspan="2">Propiedades</th>
            </tr>
            <tr>
            <th>Distancia</th>
            <th id="pendiente">Pendiente</th>
            </tr>    
        <tbody id="tbody_prop">
        </tbody>
    `; //sobrescribo la tabla

    const tbodyProp_html = document.getElementById("tbody_prop");

    // Crear una nueva fila y agrega las propiedades
    for (let i = 0; i < conjpuntos.getCantLineas(); i++) {
        let fila = tbodyProp_html.insertRow();
        let cell1 = fila.insertCell();
        let cell2 = fila.insertCell();
        cell1.innerHTML = conjpuntos.lineaDistancia()[i] + " m";
        cell2.innerHTML = conjpuntos.lineaPendiente()[i];
    }
}

//Guardo los datos en mis arrays de puntos en el Local Storage
function guardarLocal() {
        if (conjpuntos.getCantLineas() > 1) {
            localStorage.removeItem("puntos");
            localStorage.setItem("puntos", JSON.stringify(conjpuntos.getPuntos()));
        }
    }

//restaulo los datos almacenados en el local Storage
function  restaurarLocal() { 
        if (localStorage.getItem("puntos") !== null) {
            conjpuntos.limpiarDatos();
            conjpuntos.cargarDatos(JSON.parse(localStorage.getItem("puntos")));
        }

    }



//--------------------------------------------------------------------------------------------
//------------------comandos utilizados-------------------

const conjpuntos = new Conjunto ();
