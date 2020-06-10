$(document).ready(function() {

    $('#table-services').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idServices = `idServices=${$(this).attr('id')}`

        Swal.fire({
            title: 'e-Academia',
            text: 'Deseja realmente excluir esse registro?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    async: true,
                    data: idServices,
                    url: 'src/services/model/delete-services.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Carros',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-services').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})