$(document).ready(function() {
    $('.btn-logout').click(function(e) {
        e.preventDefault()

        $.ajax({
            dataType: 'Json',
            type: 'POST',
            assync: true,
            url: 'system/model/logout.php',
            success: function(dados) {
                if (dados.msg == true) {
                    window.location.href = '../../index'
                }
            }
        })

    })
})