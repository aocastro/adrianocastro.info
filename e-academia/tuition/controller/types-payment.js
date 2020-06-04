$(document).ready(function() {
    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: 'payment/model/list-payment.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let methods = `
                    <option value="${dados[i].idPayment}">${dados[i].namePayment}</option>
                `
                $('#methods').append(methods)
            }
        }
    })
})