



function cargarGeneros() {
    var url = "https://cine.mycm.cl/api/genero";

    fetch(url)
        .then(function(result){
            return result.json();
        })
        .then(function(result) {
            
            var html = `<option value=''>Seleccionar</option>`;

            result.forEach(function(item) {
                html+=`<option value='${item.id}'>${item.nombre}</option>`;
            });

            document.getElementById("genero").innerHTML = html;

        });
}


function cargarPeliculas() {
    var url = "https://cine.mycm.cl/api/pelicula";

    fetch(url)
        .then(function (result) {
            return result.json();
        })
        .then(function (result) {

            var html = `
                <tr>
                    <th>Nombre</th>
                    <th>Duración</th>
                    <th>Clasificacion</th>
                    <th>¿Es estreno?</th>
                    <th>Genero</th>
                    <th>Sinopsis</th>
                </tr>
            `;

            result.forEach(function (item) {

                html += `
                    <tr>
                        <td>${item.nombre}</td>
                        <td>${item.duracion}</td>
                        <td>${item.clasificacion}</td>
                        <td>${(item.es_estreno) ? 'si' : 'no'}</td>
                        <td>${item.genero.nombre}</td>
                        <td>${item.sinopsis.substring(0, 20)}</td>
                    </tr>
                `;
            });


            document.getElementById("tablaPeliculas").innerHTML = html;

        });

}

var btnEnviar = document.getElementById("btnEnviar");

//agregamos un escuchador en el boton cuando hagan click
btnEnviar.addEventListener("click", function () {

    var nombre = document.getElementById("nombre").value;
    console.log(nombre);
    var genero = document.getElementById("genero").value;
    console.log(genero);
    var duracion = document.getElementById("duracion").value;
    console.log(duracion);

    var esEstreno = document.getElementById("esEstreno").checked;
    console.log(esEstreno);

    var sinopsis = document.getElementById("sinopsis").value;
    console.log(sinopsis);


    var clasificacion = "";

    document.getElementsByName("clasificacion")
        .forEach(function (item) {
            if (item.checked) {
                clasificacion = item.value;
            }
        });

    console.log(clasificacion);


    //document.getElementById("nombre").value = "nombre asignado desde js";

    var data = {
        "nombre": nombre,
        "duracion": duracion,
        "sinopsis": sinopsis,
        "es_estreno": esEstreno,
        "clasificacion": clasificacion,
        "genero_id": genero
    };

    var url = "https://cine.mycm.cl/api/pelicula";

    fetch(url, {
        method:"post",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(function(result) {
        return result.json();
    })
    .then(function(result){
        console.log(result);
        cargarPeliculas();
    });


});

//realizamos una llamada asincrona a la api de mindicador.cl

var url = "https://mindicador.cl/api";

fetch(url) // se hace la llamada
    .then(function (result) { //se espera a que la llamada termine y 
        //se convierte en json
        return result.json();
    })
    .then(function (result) {//se obtiene el json
        console.log(result);
        var uf = Math.round(result.uf.valor);
        document.getElementById("ufHoy").innerHTML = uf;
        var dolar = Math.round(result.dolar.valor);
        document.getElementById("dolarHoy").innerHTML = dolar;
        var utm = Math.round(result.utm.valor);
        document.getElementById("utmHoy").innerHTML = utm;
        var euro = Math.round(result.euro.valor);
        document.getElementById("euroHoy").innerHTML = euro;

    });


cargarPeliculas();
cargarGeneros();
