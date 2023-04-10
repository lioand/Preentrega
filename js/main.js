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
}


class Conjunto {
    constructor(){
        this.array_puntos = [];
        this.array_lineas = [];
    }
    inputdatos() {
        // this.array_puntos.push(
        //     new Punto (0,0,4.25, "punto1"),
        //     new Punto (3,6,4.15, "punto2"),
        //     new Punto (3,7,4.3, "punto3"),
        // )
        let inputPrompt;
        do {
            inputPrompt = prompt("Ingrese un punto (x,y,z,descripción) \no cancele para terminar",'0,0,0,tn');

            if (inputPrompt !== null) {
                inputPrompt = inputPrompt.split(",");
                if (inputPrompt.length==3 || inputPrompt.length==4) {
                    if (!isNaN(inputPrompt[0]) && !isNaN(inputPrompt[1]) && !isNaN(inputPrompt[2])) {
                        console.log("son numeros");
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

    consola() {
        console.table(this.array_puntos);
        console.table(this.array_lineas);
    }
}

const conjpuntos = new Conjunto ();

conjpuntos.inputdatos();
// conjpuntos.consola()
conjpuntos.consola();


// console.log(isNaN(inputPrompt[0]));
// console.log(isNaN(inputPrompt[1]));
// console.log(isNaN(inputPrompt[2]));
// console.log(isNaN(inputPrompt[3]));

//console.table(array);


//array[2].x;
//console.log(array[2].x);










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
