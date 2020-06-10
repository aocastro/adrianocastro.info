$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-services').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/services/model/save-services.php',
            success: function(dados) {
                Swal.fire({
                    title: 'e-Academia',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-services').modal('hide')
                $('#table-services').DataTable().ajax.reload()
            }
        })

    })

})