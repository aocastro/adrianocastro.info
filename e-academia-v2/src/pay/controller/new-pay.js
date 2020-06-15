$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Adicionar nova conta a pagar</h4>')

        $('.modal-body').load('src/pay/view/form-pay.html', function() {
            $('#discountPay').attr('readonly', 'true')
            $('#additionPay').attr('readonly', 'true')
            $('#amountPaid').attr('readonly', 'true')
            $.ajax({
                type: 'POST',
                dataType: 'json',
                async: false,
                url: 'src/provider/model/all-provider.php',
                success: function(dados) {
                    for (const dado of dados) {
                        $('#AGUAVIVA_PROVIDER_idProvider').append(`<option value="${dado.idProvider}">${dado.nameProvider}</option>`)
                    }

                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-pay').modal('show')
    })
})