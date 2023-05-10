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
        return Math.sqrt(Math.pow(xf-xi , 2)+Math.pow(yf - yi , 2));;
    }

    getpendiente(inputPrompt){
        let horiz = this.getDist();                     //obtengo la distancia horizontal
        let vert = this.pfinal.z - this.pinicial.z;     //obtengo la distancia vertical 
        let salida = vert / horiz ;
        if (horiz == 0) {
             salida = "Vertical:";
            if (vert == 0) {
                salida = "Los puntos son iguales";3
            }
                
        }else{
            switch (inputPrompt) {
                case 1: //en porcentaje
                    salida = salida *100 + " %" 
                    break;    
                case 2: //en y/x
                    break;    
                case 3: //en grados
                    salida = 180 * Math.atan(salida) / Math.PI + " °";
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
    inputdatos() {
        let inputPrompt;
        do {
            inputPrompt = prompt("Ingrese un punto (x,y,z,descripción) \no cancele para terminar",'0,0,0,tn');

            if (inputPrompt !== null) {
                inputPrompt = inputPrompt.split(",");
                if (inputPrompt.length==3 || inputPrompt.length==4) {
                    if (!isNaN(inputPrompt[0]) && !isNaN(inputPrompt[1]) && !isNaN(inputPrompt[2])) {
                        //si pasa las condiciones se crea el punto y lo agrego al array de puntos
                        this.array_puntos.push( 
                            new Punto ( parseFloat(inputPrompt[0]) , parseFloat(inputPrompt[1]) , parseFloat(inputPrompt[2]) , inputPrompt[3]));
                        //chequeo si tengo mas de 2 puntos en array_puntos, creo una linea
                        if (this.array_puntos.length > 1) {
                            let linea = new Linea (this.array_puntos[this.array_puntos.length - 2] , this.array_puntos[this.array_puntos.length - 1]);
                            this.array_lineas.push(linea);
                        }
                    }    
                }   
            }

        } while (inputPrompt !== null)
    }

    inputdatosDOM() {



    }

    lineaDistancia(){
        return this.array_lineas.map((element) => element.getDist());
    }
    lineaPendiente(){
        let inputPrompt;
        do{
            inputPrompt = parseInt(prompt("Ingrese el numero segun el formato de pendiente que desea: \n 1. Porcentaje   \n 2. y/x \n 3. Angulo"));
        } while (inputPrompt != 1 && inputPrompt !=  2 && inputPrompt !=  3);
        return this.array_lineas.map((element) => element.getpendiente(inputPrompt));
    }

    consola() {
        console.table(this.array_puntos);
        console.table(this.array_lineas);
        console.table(this.lineaDistancia());
        console.table(this.lineaPendiente());

    }
}

const conjpuntos = new Conjunto ();

conjpuntos.inputdatoshard(); //prueba con datos hardcodeados
// conjpuntos.inputdatosDOM();
// conjpuntos.consola();

const button = document.getElementById('btnpunto');
button.addEventListener( 'click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const z = parseFloat(document.getElementById('z').value);
    const descripcion = document.getElementById('descripcion').value;
    const datos = [x, y, z, descripcion];
    console.log(datos);

});