$(document).ready(function() {

    var url = 'participants/model/list-participant.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                switch (dados[i].perfil) {
                    case '1':
                        $('#front-end').append('<option value="' + dados[i].id + '">' + dados[i].nome + '</option>')
                        break
                    case '2':
                        $('#back-end').append('<option value="' + dados[i].id + '">' + dados[i].nome + '</option>')
                        break
                    case '3':
                        $('#arduino').append('<option value="' + dados[i].id + '">' + dados[i].nome + '</option>')
                        break
                    case '4':
                        $('#criativo').append('<option value="' + dados[i].id + '">' + dados[i].nome + '</option>')
                        break
                }
            }
            // $('body').append('<script src="system/controller/view-participant.js"></script>')
            // $('body').append('<script src="system/controller/promoted.js"></script>')
        }
    })
})