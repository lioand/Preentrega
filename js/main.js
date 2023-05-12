//construye puntos con x,y,z y descripcion(d)

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
        return Math.sqrt(Math.pow(xf-xi , 2)+Math.pow(yf - yi , 2)).toFixed(3);
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
<<<<<<< HEAD
                    salida = salida *100 + " %" 
                    break;    
                case 2: //en y/x
                    break;    
                case 3: //en grados
                    salida = 180 * Math.atan(salida) / Math.PI + " °";
=======
                    salida = (vert / horiz *100).toFixed(5); 
                    break;    
                case 2: //en y/x
                    salida = (vert / horiz).toFixed(5); 

                    break;    
                case 3: //en grados
                    salida = (180 * Math.atan(vert / horiz) / Math.PI).toFixed(5);
>>>>>>> 23c831b8294b2d9af3fdc7372ff9b350f2169d7a
                    break;    
                default:
                    break;
            }
        }
<<<<<<< HEAD
=======

>>>>>>> 23c831b8294b2d9af3fdc7372ff9b350f2169d7a
        return salida;
    }
}


class Conjunto {
    constructor(){
        this.array_puntos = [];
        this.array_lineas = [];
    }
    inputdatoshard(){
        //input datos de prueba hardcodeados
            this.array_puntos.push(
            new Punto (0,0,4.25, "punto1"),
            new Punto (0,0,4.15, "punto2"),
            new Punto (2,2,5.5, "punto3"),
            new Punto (2,2,5.5, "punto4"),
            new Punto (2,-2,0, "punto5"),
            new Punto (-2,-2,0, "punto6"),
        )
        for (let i = 0; i < this.array_puntos.length-1; i++) {
            let linea = new Linea (this.array_puntos[i + 1] , this.array_puntos[i]);
            this.array_lineas.push(linea);
        }  
    }

    new_point(x,y,z,d) {
        if (!isNaN(x)) {
            if (!isNaN(y)) {
                if (!isNaN(z)) {
                    let point = new Punto (x, y, z, d );
                    this.array_puntos.push (point);
                    if (this.array_puntos.length > 1) {
                        let linea = new Linea (this.array_puntos[this.array_puntos.length - 2] , this.array_puntos[this.array_puntos.length - 1]);
                        this.array_lineas.push(linea);
                    }
            
                }    
            }   
        }
    }

<<<<<<< HEAD
    inputdatosDOM() {



    }

    lineaDistancia(){
=======

    lineaDistancia() {
>>>>>>> 23c831b8294b2d9af3fdc7372ff9b350f2169d7a
        return this.array_lineas.map((element) => element.getDist());
    }
    lineaPendiente() {
        let select_html = parseInt(document.getElementById("slc_Pendiente").value);

        return this.array_lineas.map((element) => element.getpendiente(select_html));
    }

    consola() {
        console.log(this.array_puntos);
        console.log(this.array_lineas);
        // console.table(this.lineaDistancia());
        // console.table(this.lineaPendiente());
    }
    
    //imprimir en tablas HTML
    lineas_to_table(){
        
        let tabla_pi_html = document.getElementById("table_pi");
        let tabla_pf_html = document.getElementById("table_pf");
        tabla_pf_html.innerHTML = ""; //limpio el cuerpo de la tabla
        tabla_pi_html.innerHTML = "";

        // Crear una nueva fila en las 2 tablas
        for (const lineas of this.array_lineas) {
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
    prop_to_table(){
        document.getElementById("t_prop").innerHTML = `
            <tr >
                <th colspan="2">Propiedades</th>
                </tr>
                <tr>
                <th>Distancia</th>
                <th>Pendiente</th>
                </tr>    
            <tbody id="tbody_prop">
            </tbody>
        `; //sobrescribo la tabla

        const tbodyProp_html = document.getElementById("tbody_prop");

        // Crear una nueva fila y agrega las propiedades
        for (let i = 0; i < this.array_lineas.length; i++) {
            let fila = tbodyProp_html.insertRow();
            let cell1 = fila.insertCell();
            let cell2 = fila.insertCell();
            cell1.innerHTML = this.lineaDistancia()[i] + " m";
            cell2.innerHTML = this.lineaPendiente()[i];
        }
    }

    //Local Storage
    guardarlocal() {
        if (this.array_lineas.length > 1) {
            localStorage.removeItem("puntos");
            localStorage.setItem("puntos", JSON.stringify(this.array_puntos));
        }
    }
    restaurarlocal() {
        let array_puntos_stg = JSON.parse(localStorage.getItem("puntos"));
        this.array_puntos = [];
        this.array_lineas = [];
        for (const punto of array_puntos_stg) {
            let point = new Punto( punto.x, punto.y, punto.z, punto.d );
            this.array_puntos.push(point);
        }
        for (let i = 0; i < this.array_puntos.length-1; i++) {
            let linea = new Linea (this.array_puntos[i] , this.array_puntos[i + 1]);
            this.array_lineas.push(linea);
        }  
    }
}

const conjpuntos = new Conjunto ();

<<<<<<< HEAD
conjpuntos.inputdatoshard(); //prueba con datos hardcodeados
// conjpuntos.inputdatosDOM();
// conjpuntos.consola();

const button = document.getElementById('btnpunto');
button.addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

=======
// accion del boton de cargar datos
document.getElementById('btnpunto').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
>>>>>>> 23c831b8294b2d9af3fdc7372ff9b350f2169d7a
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const z = parseFloat(document.getElementById('z').value);
    const descripcion = document.getElementById('descripcion').value;
<<<<<<< HEAD
    const datos = new Punto(x, y, z, descripcion);
    
    console.log(datos);

});
=======

    console.clear();
    conjpuntos.new_point (x, y, z, descripcion);
    conjpuntos.lineas_to_table();

    conjpuntos.consola();
});

// accion del boton de guardar los datos en el local storage datos
document.getElementById('btnguardar').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    conjpuntos.guardarlocal();

});


// accion del boton de Resutarar los datos desde el local storage
document.getElementById('btnrestaurar').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    conjpuntos.restaurarlocal();
    conjpuntos.lineas_to_table();
    // console.clear();

    // conjpuntos.consola();
});
// accion del boton Mostrar propiedad de Distancia y angulo entre lineas
document.getElementById('btnpropiedades').addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    conjpuntos.prop_to_table();
    // console.clear();
    // conjpuntos.consola();

});


// accion del boton Mostrar propiedad de Distancia y angulo entre lineas
document.getElementById('slc_Pendiente').addEventListener( 'change', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    conjpuntos.prop_to_table();
    // console.clear();
    // conjpuntos.consola();
    
});


>>>>>>> 23c831b8294b2d9af3fdc7372ff9b350f2169d7a
