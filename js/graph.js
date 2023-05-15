//-----------------------Dibujar Graficos en plotly------------------
const opciones = document.querySelectorAll('input[name="grafico"]');
let seleccionAnterior = null;

opciones.forEach(opcion => {
  opcion.addEventListener('click', e => {
    if (seleccionAnterior !== null) {
      seleccionAnterior.checked = false;
    }
    seleccionAnterior = e.target;
  });
});

//crep una funcion asincronica que genera un grafico 3d usando la libreria Plotly
async function grafico3d(){
    const mensajeCarga = document.getElementById("mensajeCarga");
    const graficoContainer = document.getElementById("graph");
  
    mensajeCarga.style.display = "block"; // Mostramos el mensaje de carga

    await new Promise((resolve) => setTimeout(resolve, 500));

    mensajeCarga.style.display = "none"; // Ocultamos el mensaje de carga

    let data=[
        {
            mode: "lines+text",
            type: 'scatter3d',
            x: conjpuntos.getArrayX(),
            y: conjpuntos.getArrayY(),
            z: conjpuntos.getArrayZ(),
            text: conjpuntos.getArrayD(),
            scene: "scene1",
            name: "Lower the view point",
            color: "lightblue",
            visible: true,
            legendwidth: 20
        }
    ];
    
    
    let layout = {
        scene: {
            xaxis:{title: 'X',
            nticks: 10,
            ticksuffix:'m'
        },
            yaxis:{title: 'Y',nticks: 10,
            ticksuffix:'m'
        },
            zaxis:{title: 'Z',nticks: 10,
            ticksuffix:'m'
        }
        },
        autosize: false,
        width: 1000,
        height: 750,
        plot_bgcolor: "#fff",
    }	 
    
    Plotly.newPlot('graph', data, layout, {displaylogo: false}, {responsive: true});
    graficoContainer.style.display = "block"; // Mostramos el contenedor del gráfico
}

//crep una funcion asincronica que genera un grafico visto desde arriba, en el plano x,y usando la libreria Plotly
async function graficoplanta(){
    const mensajeCarga = document.getElementById("mensajeCarga");
    const graficoContainer = document.getElementById("graph");
  
    mensajeCarga.style.display = "block"; // Mostramos el mensaje de carga

    await new Promise((resolve) => setTimeout(resolve, 500));

    mensajeCarga.style.display = "none"; // Ocultamos el mensaje de carga

    let linea ={
        x: conjpuntos.getArrayX(),
        y: conjpuntos.getArrayY(),
        text: conjpuntos.getArrayD(),
        mode: 'lines+markers',
        name: 'Scatter and Lines'
    }

    
    let data=[linea];
    
    
    let layout = {
        
        xaxis:{title: 'X',
        nticks: 10,
        ticksuffix:'m'
        },
        yaxis:{title: 'Y',nticks: 10,
        ticksuffix:'m'
        },
        title: 'Planta',
        width: 1300,
        height: 750

    };
     
    
    Plotly.newPlot('graph', data, layout, {displaylogo: false}, {responsive: true});
    graficoContainer.style.display = "block"; // Mostramos el contenedor del gráfico
}

//crep una funcion asincronica que genera un perfil longitudinal de los puntos usando la libreria Plotly
async function graficoperfil(){
    const mensajeCarga = document.getElementById("mensajeCarga");
    const graficoContainer = document.getElementById("graph");
    
    mensajeCarga.style.display = "block"; // Mostramos el mensaje de carga

    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(conjpuntos.getArrayXPerfil());
    mensajeCarga.style.display = "none"; // Ocultamos el mensaje de carga

    let linea ={
        x: conjpuntos.getArrayXPerfil(),
        y: conjpuntos.getArrayZ(),
        text: conjpuntos.getArrayD(),
        mode: 'lines+markers',
        name: 'Scatter and Lines'
    }

    
    let data=[linea];
    
    
    let layout = {
        
        xaxis:{title: 'X',
        nticks: 10,
        ticksuffix:'m'
        },
        yaxis:{title: 'Y',nticks: 10,
        ticksuffix:'m'
        },
        title: 'Planta',
        width: 1300,
        height: 750

    };
     
    
    Plotly.newPlot('graph', data, layout, {displaylogo: false}, {responsive: true});
    graficoContainer.style.display = "block"; // Mostramos el contenedor del gráfico
}

