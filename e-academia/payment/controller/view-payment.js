$(document).ready(function() {
    $('.btn-view').click(function(e) {
        e.preventDefault()
        var dados = 'idPayment='
        dados += $(this).attr('id')
        url = 'payment/model/list-payment.php'
        $('#modal-title').empty()
        $('#modal-body').empty()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let form = `
                    <form id="add-payment">
                        <div class="form-group">
                            <label>Nome da forma de pagamento</label>
                            <input type="text" name="namePayment" class="form-control" value="${dados[i].namePayment}" readonly>
                        </div>
                    </form>
                    `

                    $('#modal-title').append('FICHA DE FORMAS DE PAGAMENTO')
                    $('#modal-body').append(form)
                    $('#modal-payments').modal('show')
                }
            }
        })
    })
})