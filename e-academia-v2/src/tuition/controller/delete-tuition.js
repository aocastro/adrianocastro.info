$(document).ready(function() {
    $('#table-tuition').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idTuition = `idTuition=${$(this).attr('id')}`

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
                    data: idTuition,
                    url: 'src/tuition/model/delete-tuition.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Academia',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-tuition').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})