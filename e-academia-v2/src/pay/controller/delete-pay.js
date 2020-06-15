$(document).ready(function() {

    $('#table-pay').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idPay = `idPay=${$(this).attr('id')}`

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
                    data: idPay,
                    url: 'src/pay/model/delete-pay.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Carros',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-pay').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})