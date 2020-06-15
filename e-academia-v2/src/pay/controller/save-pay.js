$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-pay').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/pay/model/save-pay.php',
            success: function(dados) {
                Swal.fire({
                    title: 'e-Academia',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-pay').modal('hide')
                $('#table-pay').DataTable().ajax.reload()
            }
        })

    })

})