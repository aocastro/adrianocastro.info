$(document).ready(function() {
    $('.btn-edit').click(function(e) {
        e.preventDefault()
        var dados = 'idPayment='
        dados += $(this).attr('id')
        $('#modal-title').empty()
        $('#modal-body').empty()

        $.ajax({
            url: 'payment/model/list-payment.php',
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let form = `
                    <form id="update-payment">
                        <div class="form-group">
                            <label>Nome da forma de pagamento</label>
                            <input type="text" name="namePayment" class="form-control" value="${dados[i].namePayment}">
                        </div>
                        <div class="form-group row">
                            <div class="offset-md-9 col-md-3 col-12">
                                <input type="hidden" name="idPayment" value="${dados[i].idPayment}"/>
                                <button class="btn btn-agua btn-block btn-update"><i class="mdi mdi-content-save"></i> Salvar</button>
                            </div>
                        </div>
                    </form>
                    `
                    $('#modal-title').append('ATUALIZAÇÃO DE CADASTRO DA FORMA DE PAGAMENTO')
                    $('#modal-body').append(form)
                    $('#modal-payments').modal('show')
                }
                $('body').append('<script src="payment/controller/update-payment.js"></script>')
            }
        })
    })
})