$(document).ready(function() {

    $.ajax({
        dataType: 'Json',
        type: 'POST',
        assync: true,
        url: 'system/model/validate.php',
        success: function(dados) {
            if (dados.msg == false) {
                window.location.href = '../../index'
            }
        }
    })
})