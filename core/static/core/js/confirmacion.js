function confirmarEliminacion(id){
    
    Swal.fire({
        title: 'Esta seguro que desea eliminar el producto?',
        text: "No podras deshaser esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
            //redirigir al usuario a la ruta de eliminar
            window.location.href = "/eliminar-producto/"+id+"/";
        }
      })   
}