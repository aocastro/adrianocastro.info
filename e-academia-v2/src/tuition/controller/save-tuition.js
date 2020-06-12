$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-tuition').serialize()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/tuition/model/save-tuition.php',
            success: function(dados) {
                Swal.fire({
                    title: 'e-Academia',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-tuition').modal('hide')
                $('#table-tuition').DataTable().ajax.reload()
            }
        })

    })

})