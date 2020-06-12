$(document).ready(function() {

    $('#table-tuition').on('click', 'button.btn-receive', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Recebimento de mensalidade</h4>')

        let idTuition = `idTuition=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idTuition,
            url: 'src/tuition/model/view-tuition.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/tuition/view/form-tuition.html', function() {
                        $('#nameStudents').val(dado.dados.nameStudents)
                        $('#dueDate').val(dado.dados.vencimento)
                        $('#grossValue').val(dado.dados.grossValue)
                        $('#amountPaid').val(dado.dados.grossValue)

                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            async: false,
                            url: 'src/payment/model/all-payment.php',
                            success: function(dados) {
                                for (const dado of dados) {
                                    $('#AGUAVIVA_PAYMENT_METHODS_idPayment').append(`<option value="${dado.idPayment}">${dado.namePayment}</option>`)
                                }

                            }
                        })
                    })

                    $('.btn-save').show()
                    $('#modal-tuition').modal('show')
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