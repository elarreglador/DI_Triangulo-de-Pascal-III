//CREAMOS UN TRIANGULO DE PASCAL Y LO MOSTRAMOS EN LA APP
/*
                  1          
                 1  1         
               1  2  1        
             1  3   3  1       
           1  4   6   4  1      
         1  5  10   10  5  1     
       1  6  15   20  15   6  1    
     1  7  21   35  35   21  7  1   
   1  8  28  56   70   56  28  8  1  
 1  9  36  84  126  126  84  36  9  1 
*/

//FILESYSTEM

//DEFINICIONES
let texto = document.getElementById("texto");
let boton = document.getElementById("boton");
let contenido = document.getElementById("contenido");

let miArray;
let alto = 10;
let ancho = (alto * 2) + 1;

//MAIN


//FUNCIONES
// crea una tabla con alto x y ancho
// las celdas se llaman x0y0, x0y1, x1y0, x1y1, ...
function creaTabla(x, y) {
    let html = '<table id="tabla" border="0">\n';
    for (let h = 0; h < x; h++) {
        html = html + ' <tr>\n';
        for (let l = 0; l < y; l++) {
            html = html + '     <td id="x' + h + 'y' + l + '">';
            html = html + '</td>\n';
        }
        html = html + ' </tr>\n';
    }
    html = html + '</table>\n';
    //console.log(html);
    return html;
}

// genera triangulo en un array a partir de la esquina superior
function genera(matriz) {
    // el calculo de las siguientes lineas va desde la posicion alto-numFila
    // hasta alto+numFila+1, asi evitamos los bordes del array y calculos innecesarios.
    // solo haremos el calculo si en la casilla inmediatamente superior vale 0
    for (let numFila = 1; numFila < alto; numFila++) {
        let primera = alto - numFila;
        let ultima = alto + numFila + 1;
        for (let numColumna = primera; numColumna < ultima; numColumna++) {
            if (matriz[numFila - 1][numColumna] == 0) {
                matriz[numFila][numColumna] = valor(numFila, numColumna);
            }
        }
    }
    return matriz;
}

function matrizATabla(matriz) {
    // el calculo de las siguientes lineas va desde la posicion alto-numFila
    // hasta alto+numFila+1, asi evitamos los bordes del array y calculos innecesarios.
    // solo haremos el calculo si en la casilla inmediatamente superior vale 0
    for (let numFila = 1; numFila < alto; numFila++) {
        let primera = alto - numFila;
        let ultima = alto + numFila + 1;

        // el vertice superior se introduce a mano
        let inicioTriangulo = 'x0y' + ((ancho - 1) / 2);
        let celdaTop = document.getElementById(inicioTriangulo);
        celdaTop.innerText = "1";

        // el resto se obtiene del array
        for (let numColumna = primera; numColumna < ultima; numColumna++) {
            if (matriz[numFila - 1][numColumna] == 0) {
                //Estas dos lineas son interesantes porque 'obtenmos' la ID de celda a partir de dos variables
                let id = 'x' + numFila + 'y' + numColumna;
                let elemento = document.getElementById(id);
                elemento.innerHTML = valor(numFila, numColumna);
            }
        }
    }
    return matriz;
}

// Devuelve al valor de una posicion siempre
// que la linea superior este completa
function valor(x, y) {
    return miArray[x - 1][y - 1] + miArray[x - 1][y + 1];
}

// Crear array bidimensional
function nuevoArray(x, y) {
    const miArray = new Array(2);
    for (let i = 0; i < x; i++) {
        miArray[i] = new Array(y);
        for (let f = 0; f < y; f++) {
            miArray[i][f] = 0;
        }
    }
    return miArray;
}

// Imprimir array bidimensional
function print(matriz) {
    let triangulo = "";
    const alto = matriz.length;
    for (let i = 0; i < alto; i++) {
        triangulo = triangulo + matriz[i].join(" ") + "<br>";
    }
    return triangulo;
}

// Elimina los ceros de un array
function limpia(matriz) {
    const filas = matriz.length;
    const columnas = matriz[0].length;

    for (let i = 0; i < filas; i++) {
        for (let f = 0; f < columnas; f++) {
            if (matriz[i][f] === 0) {
                matriz[i][f] = " ";
            }
        }
    }
    return matriz;
}

//LISTENERS

boton.addEventListener('click', () => {
    alto = parseInt(texto.value);
    ancho = (alto * 2) + 1;
    // Verificar si la conversión es exitosa y alto es un número
    if (isNaN(alto) || alto <= 1) {
        alert("Por favor, ingresa un numero valido mayor que 1.");
        return;
    }

    //Creamos un array
    miArray = nuevoArray(alto, ancho);
    //Ponemos a 1 la esquina superior del triangulo en el array
    miArray[0][alto] = 1;
    //Generamos el triangulo en el array a partir de la esquina sup.
    miArray = genera(miArray);
    //Eliminamos los ceros del array
    miArray = limpia(miArray);
    //creamos la tabla
    miTabla = creaTabla(alto, ancho);
    contenido.innerHTML = miTabla;
    //rellenamos la tabla
    matrizATabla(miArray);
})