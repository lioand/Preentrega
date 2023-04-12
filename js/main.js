//construye puntos con x,y,z y descripcion(d)

class Punto {
    constructor(x, y, z, d) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.d = d;
    }
    consolaP() { console.log(`x: ${this.x} y: ${this.y} z: ${this.z} descripcion: ${this.d}`) };
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
            return salida;    
        }else{
            switch (inputPrompt) {
                case 1: //en porcentaje
                    salida = salida *100 + " %" 
                    return salida;    
                case 2: //en y/x
                    return salida;    
                case 3: //en grados
                    salida = 180 * Math.atan(salida) / Math.PI + " °";
                    return salida;    
                default:
                break;
            }
        }
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

// conjpuntos.inputdatoshard(); //prueba con datos hardcodeados
conjpuntos.inputdatos();
conjpuntos.consola();










// 
//     do {
//         ingreso = parseInt(prompt("Numero de ENTRADA: \n 1. Porcentaje   \n 2. y/x \n 3. Angulo  "));
//         salida = parseInt(prompt("Numero de SALIDA: \n 1. Porcentaje     \n 2. y/x \n 3. Angulo  "));
//         if (ingreso == salida) {
//             alert("No se realizara ninguna conversion, ambos formatos son iguales");
//             salida = 0;
//             ingreso = 0;     //hago reiniciar al ciclo
//         }
//     } while (ingreso != 1 && ingreso !=  2 && ingreso !=  3 &&
//             salida != 1 && salida !=  2 && salida !=  3);
    
//     switch (ingreso) {
//         case 1: //en porcentaje
//             porc = parseFloat(prompt("Ingrese la pendiente en porcentaje(%):"));
//             salida = Porcentaje(porc,salida);
//             break;
//         case 2: //en y/x
//             gr_y = parseFloat(prompt("Ingrese el valor de la altura Y:", 1));
//             gr_x = parseFloat(prompt("Ingrese el valor de la horizontal X:", 1));
//             salida = Grade (gr_y,gr_x,salida);
//         break;
//         case 3: //en grados
//             grados = parseFloat(prompt("Ingrese la pendiente en grados(º):"));
//             salida = Angulo(grados,salida);
//         break;
//         default:
//         break;
//     }

// console.log(salida);
// console.log(ingreso);

// function Grade (y,x,formatosalida) { //Convierte de [y/x] 
//     let sal_g;
    
//     if (formatosalida == 1) { //a porcentaje
//         sal_g = y/x*100 + " %";    
//     }
//     else if (formatosalida == 3) {  //a grados °
//         sal_g = 180 * Math.atan(y/x) / Math.PI + "°";
//     }
//     return sal_g;
// }
// function Porcentaje (porc,formatosalida) { //Convierte de porcentaje[%] 
//     let sal_p;    //salida

//     if (formatosalida == 2) { //a [y respecto al valor de x]
//         let x = parseFloat(prompt("Ingrese el valor de la horizontal X [en m]:","100"));
//         sal_p = porc * x / 100 + " m";    
//     }
//     else if (formatosalida == 3) {  //a grados °
//         sal_p = 180 * Math.atan(porc/100) / Math.PI + "°";
//     }
//     return sal_p;
// }
// function Angulo (ang,formatosalida) { //Convierte de angulo[º] 
//     let sal_a;    //salida

//     if (formatosalida == 1) { //a porcentaje [%]
//         sal_a = Math.tan(ang / 180 * Math.PI)*100 + " %";
//     }
//     else if (formatosalida == 2) {  //a [y respecto al valor de x]
//         let x = parseFloat(prompt("Ingrese el valor de la horizontal X [en m]:", 100));
//         sal_a = Math.tan(ang / 180 * Math.PI)*x + " m";
//     }
//     return sal_a;
// }
