var nombre = "pino";
var edad = 20;

if (edad >= 18 && edad <= 30) {
    // alert("es mayor de edad");
    console.log("es mayor de edad");
} else if (edad > 30 && edad < 65) {
    console.log("es un adulto joven")
} else {
    console.log("edad invalida")
}

//for


for (i = 0; i < 10; i++) {
    console.log(i);
}

//arreglo
var nombres = ["ariel", "ivan", "heman", "pinoman"];

nombres.forEach(function (item) {
    console.log(item);
});

//JSON
var personas = [
    {
        "id":1,
        "nombre": "isrrael",
        "edad": 99,
        "sexo": true
    },
    {
        "id":2,
        "nombre": "benito",
        "edad": 20,
        "sexo": true
    }
]



console.log(personas[0].nombre);

personas.forEach(function(item) {
    console.log(item.edad); 
});




