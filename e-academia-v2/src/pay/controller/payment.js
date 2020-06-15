$(document).ready(function() {

    $('#table-pay').on('click', 'button.btn-pay', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Visualizar conta a pagar</h4>')

        let idPay = `idPay=${$(this).attr('id')}`

        const dateNow = new Date().toLocaleString()

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
                        $('#AGUAVIVA_PROVIDER_idProvider').append(`<option value="${dado.dados.idProvider}">${dado.dados.nameProvider}</option>`)
                        $('#datePay').val(dado.dados.datePay)
                        $('#datePay').attr('readonly', 'true')
                        $('#valuePay').val(dado.dados.valuePay)
                        $('#valuePay').attr('readonly', 'true')
                        $('#discountPay').val(dado.dados.discountPay)
                        $('#additionPay').val(dado.dados.additionPay)
                        $('#amountPaid').val(dado.dados.valuePay)
                        $('#idPay').val(dado.dados.idPay)
                        $('#idPay').after(`
                                <div class="form-group">
                                    <label>Data de pagamento</label>
                                    <input type="text" class="form-control text-danger" readonly name="dateRegister" value="${dateNow}">
                                </div>
                            `)
                    })

                    $('.btn-save').show()
                    $('.btn-save').removeAttr('data-operation')
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