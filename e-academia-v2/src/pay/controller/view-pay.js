$(document).ready(function() {

    $('#table-pay').on('click', 'button.btn-view', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Visualizar conta a pagar</h4>')

        let idPay = `idPay=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idPay,
            url: 'src/pay/model/view-pay.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/pay/view/form-pay.html', function() {
                        $('#AGUAVIVA_PROVIDER_idProvider').empty()
                        $('#AGUAVIVA_PROVIDER_idProvider').append(`<option value="">${dado.dados.nameProvider}</option>`)
                        $('#datePay').val(dado.dados.vencimento)
                        $('#datePay').attr('readonly', 'true')
                        $('#valuePay').val(parseFloat(dado.dados.valuePay).toFixed(2).replace('.', ','))
                        $('#valuePay').attr('readonly', 'true')
                        dado.dados.discountPay == "" ? $('#discountPay').val('00,00') : $('#discountPay').val(parseFloat(dado.dados.discountPay).toFixed(2).replace('.', ','))
                        $('#discountPay').attr('readonly', 'true')
                        dado.dados.additionPay == "" ? $('#additionPay').val('00,00') : $('#additionPay').val(parseFloat(dado.dados.additionPay).toFixed(2).replace('.', ','))
                        $('#additionPay').attr('readonly', 'true')
                        dado.dados.amountPaid == "" ? $('#amountPaid').val('00,00') : $('#amountPaid').val(parseFloat(dado.dados.amountPaid).toFixed(2).replace('.', ','))
                        $('#amountPaid').attr('readonly', 'true')
                        if (dado.dados.status == 1) {
                            $('#idPay').after(`
                                <div class="form-group">
                                    <label>Status</label>
                                    <input type="text" class="form-control text-danger" readonly value="ABERTO">
                                </div>
                            `)
                        } else {
                            $('#idPay').after(`
                                <div class="form-group">
                                    <label>Status</label>
                                    <input type="text" class="form-control text-success" readonly value="PAGO">
                                </div>
                            `)
                        }

                    })

                    $('.btn-save').hide()
                    $('#modal-pay').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'e-Academia', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // Tipo de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})