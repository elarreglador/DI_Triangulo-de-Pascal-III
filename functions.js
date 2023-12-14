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
// retorna el numero mas alto
function masGrande(matriz) {
    const filas = matriz.length;
    const columnas = matriz[0].length;
    let maximo = 0;
    for (let i = 0; i < filas; i++) {
        for (let f = 0; f < columnas; f++) {
            if (matriz[i][f] > maximo) {
                maximo = matriz[i][f];
            }
        }
    }
    return maximo;
}

// genera triangulo
function generaTabla(x,y){
    miHtml = '<table border="1">';
    for (let i=0; i<x ; i++){
        miHtml = miHtml + '<tr>';
        for (let f=0; f<y; f++){
            miHtml = miHtml + '<td id="f'+ i +'c'+ f +'"></td>';
        }
        miHtml = miHtml + '</tr>';
    }
}

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
    if (isNaN(alto) || alto <= 0) {
        alert("Por favor, ingresa un número válido mayor que 0.");
        return;
    }
    //Creamos un array
    miArray = nuevoArray(alto, ancho);
    //Ponemos a 1 la esquina superior del triangulo 
    miArray[0][alto] = 1;
    //Generamos el triangulo
    miArray = genera(miArray);
    //Eliminamos los ceros
    miArray = limpia(miArray);
    //creamos la tabla
    contenido.innert = generaTabla(alto,ancho);  
})