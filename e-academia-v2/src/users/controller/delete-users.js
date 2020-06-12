$(document).ready(function() {

    $('#table-users').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idUsers = `idUsers=${$(this).attr('id')}`

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
                    data: idUsers,
                    url: 'src/users/model/delete-users.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Carros',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-users').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})