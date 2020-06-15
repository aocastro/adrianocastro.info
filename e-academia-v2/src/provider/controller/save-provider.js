$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-provider').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/provider/model/save-provider.php',
            success: function(dados) {
                Swal.fire({
                    title: 'e-Academia',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-provider').modal('hide')
                $('#table-provider').DataTable().ajax.reload()
            }
        })

    })

})