 //  Este script permite ingresoesar un valor de pendiente en y/x, % o angulo
    let ingreso;
    let salida;

    do {
        ingreso = parseInt(prompt("Numero de ENTRADA: \n 1. Porcentaje   \n 2. y/x \n 3. Angulo  "));
        salida = parseInt(prompt("Numero de SALIDA: \n 1. Porcentaje     \n 2. y/x \n 3. Angulo  "));
        if (ingreso == salida) {
            alert("No se realizara ninguna conversion, ambos formatos son iguales");
            salida = 0;
            ingreso = 0;     //hago reiniciar al ciclo
        }
    } while (ingreso != 1 && ingreso !=  2 && ingreso !=  3 &&
            salida != 1 && salida !=  2 && salida !=  3);
    
    switch (ingreso) {
        case 1: //en porcentaje
            porc = parseFloat(prompt("Ingrese la pendiente en porcentaje(%):"));
            salida = porcentaje(porc,salida);
            break;
        case 2: //en y/x
            gr_y = parseFloat(prompt("Ingrese el valor de la altura Y:", 1));
            gr_x = parseFloat(prompt("Ingrese el valor de la horizontal X:", 1));
            salida = grade (gr_y,gr_x,salida);
        break;
        case 3: //en grados
            grados = parseFloat(prompt("Ingrese la pendiente en grados(º):"));
            salida = angulo(grados,salida);
        break;
        default:
        break;
    }

console.log(salida);
console.log(ingreso);

function grade (y,x,formatosalida) { //Convierte de [y/x] 
    let sal_g;
    
    if (formatosalida == 1) { //a porcentaje
        sal_g = y/x*100 + " %";    
    }
    else if (formatosalida == 3) {  //a grados °
        sal_g = 180 * Math.atan(y/x) / Math.PI + "°";
    }
    return sal_g;
}
function porcentaje (porc,formatosalida) { //Convierte de porcentaje[%] 
    let sal_p;    //salida

    if (formatosalida == 2) { //a [y respecto al valor de x]
        let x = parseFloat(prompt("Ingrese el valor de la horizontal X [en m]:","100"));
        sal_p = porc * x / 100 + " m";    
    }
    else if (formatosalida == 3) {  //a grados °
        sal_p = 180 * Math.atan(porc/100) / Math.PI + "°";
    }
    return sal_p;
}
function angulo (ang,formatosalida) { //Convierte de angulo[º] 
    let sal_a;    //salida

    if (formatosalida == 1) { //a porcentaje [%]
        sal_a = Math.tan(ang / 180 * Math.PI)*100 + " %";
    }
    else if (formatosalida == 2) {  //a [y respecto al valor de x]
        let x = parseFloat(prompt("Ingrese el valor de la horizontal X [en m]:", 100));
        sal_a = Math.tan(ang / 180 * Math.PI)*x + " m";
    }
    return sal_a;
}

