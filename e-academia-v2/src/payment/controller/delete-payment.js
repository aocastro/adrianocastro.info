$(document).ready(function() {

    $('#table-payment').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idPayment = `idPayment=${$(this).attr('id')}`

        Swal.fire({
            title: 'e-Academia',
            text: 'Deseja realmente excluir esse registro?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    async: true,
                    data: idPayment,
                    url: 'src/payment/model/delete-payment.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Carros',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-payment').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})