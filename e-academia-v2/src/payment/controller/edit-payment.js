$(document).ready(function() {

    $('#table-payment').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Editar forma de pagamento</h4>')

        let idPayment = `idPayment=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idPayment,
            url: 'src/payment/model/view-payment.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/payment/view/form-payment.html', function() {
                        $('#namePayment').val(dado.dados.namePayment)
                        $('#idPayment').val(dado.dados.idPayment)
                    })

                    $('.btn-save').show()
                    $('#modal-payment').modal('show')
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