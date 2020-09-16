$(document).ready(function() {
    $('.btn-generate').click(function(e) {
        e.preventDefault()

        let dados = $('#generate-tuition').serialize()

        console.log(dados)

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/tuition/model/save-generate-tuition.php',
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