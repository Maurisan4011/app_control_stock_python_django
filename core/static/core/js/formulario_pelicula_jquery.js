
jQuery.extend(jQuery.validator.messages, {
    required: "Este campo es obligatorio.",
    remote: "Por favor, rellena este campo.",
    email: "Por favor, escribe una dirección de correo válida",
    url: "Por favor, escribe una URL válida.",
    date: "Por favor, escribe una fecha válida.",
    dateISO: "Por favor, escribe una fecha (ISO) válida.",
    number: "Por favor, escribe un número entero válido.",
    digits: "Por favor, escribe sólo dígitos.",
    creditcard: "Por favor, escribe un número de tarjeta válido.",
    equalTo: "Por favor, escribe el mismo valor de nuevo.",
    accept: "Por favor, escribe un valor con una extensión aceptada.",
    maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
    rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
    range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
    max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
    min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
});

var validator = $("#formularioPelicula").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 80
            //email:true,
            //date:true
        },
        genero: {
            required: true
        },
        duracion: {
            required: true,
            number: true,
            min: 1,
            max: 500
        },
        sinopsis:{
            required:true,
            minlength:10,
            maxlength:200
        }

    },
    messages: {
        nombre: {
            minlength: "Debe tener 3 caracteres!!!!!!!!"
        }
    }
});

function cargarPeliculas() {
    var url = "https://cine.mycm.cl/api/pelicula";


    $.get(url, function (result) {
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


        //document.getElementById("tablaPeliculas").innerHTML = html;
        $("#tablaPeliculas").html(html);
    });



}



function cargarGeneros() {
    var url = "https://cine.mycm.cl/api/genero";

    fetch(url)
        .then(function (result) {
            return result.json();
        })
        .then(function (result) {

            var html = `<option value=''>Seleccionar</option>`;

            result.forEach(function (item) {
                html += `<option value='${item.id}'>${item.nombre}</option>`;
            });

            document.getElementById("genero").innerHTML = html;

        });
}

$("#btnEnviar").click(function () {

    if (validator.form()) {
        var nombre = $("#nombre").val();
        console.log(nombre);
        var duracion = $("#duracion").val();
        var genero = $("#genero").val();
        var sinopsis = $("#sinopsis").val();

        var esEstreno = $("#esEstreno").is(":checked");

        var clasificacion = $("input[name='clasificacion']:checked").val();

        var data = {
            "nombre": nombre,
            "duracion": duracion,
            "sinopsis": sinopsis,
            "es_estreno": esEstreno,
            "clasificacion": clasificacion,
            "genero_id": genero
        };

        var url = "https://cine.mycm.cl/api/pelicula";

        $.ajax({
            'url': url,
            'data': JSON.stringify(data),
            'type': 'post',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'success': function (result) {
                
                /*Swal.fire({
                    title:'Felicitaciones',
                    text:'La pelicula fue guardada correctamente',
                    //type:'success',
                    imageUrl:'img/gatito.jpg',
                    timer:2000
                });*/

                toastr.success("Pelicula guardada correctamente", "Felicitaciones",{
                    'positionClass':'toast-bottom-right'
                });

                //error
                //warning
                //info

                cargarPeliculas();
            },
            'error': function () {
                console.log("ha fallado!!! :c");
            }
        });

    }



});


cargarGeneros();
cargarPeliculas();