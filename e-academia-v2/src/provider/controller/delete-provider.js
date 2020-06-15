$(document).ready(function() {

    $('#table-provider').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idProvider = `idProvider=${$(this).attr('id')}`

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
                    data: idProvider,
                    url: 'src/provider/model/delete-provider.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Carros',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-provider').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})