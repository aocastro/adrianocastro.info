$(document).ready(function() {
    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-payment').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/payment/model/save-payment.php',
            success: function(dados) {
                Swal.fire({
                    title: 'e-Academia',
                    text: dados.mensagem,
                    type: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-payment').modal('hide')
                $('#table-payment').DataTable().ajax.reload()
            }
        })

    })

})