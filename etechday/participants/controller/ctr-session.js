$(document).ready(function() {

    var url = 'participants/model/ctr-session.php'

    $.ajax({
        url: url,
        type: "POST",
        assync: true,
        dataType: 'json',
        success: function(dados) {
            if (dados.mensagem == true) {
                $('#content').load('participants/view/area-participant.html')
            }
        }
    })
})