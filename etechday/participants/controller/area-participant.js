$(document).ready(function() {

    var url = 'participants/model/area-participant.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                $('.edit-perfil').attr('id', dados[i].id)

                let status
                switch (dados[i].status) {
                    case '0':
                        status = 'Por enquanto aguarde, pois ainda teremos o processo de confirmação dos participantes ;)'
                        break
                    case '1':
                        status = 'Parabéns você foi selecionado para participar do evento eTechDay 2019 <br> <button id="' + dados[i].id + '" class="btn btn-outline-success btn-block btn-lg btn-confirmed mt-5"><i class="mdi mdi-hand-okay md-24px"></i> Confirmar minha participação</button>'
                        break
                    case '2':
                        status = '<h3 class="text-success">Parabéns sua participação no eTechDay 2019, já está confirmada <i class="mdi mdi-checkbox-marked-circle-outline"></i><h3>'
                        break
                }
                let participants = `
                <img src="participants/model/img/` + dados[i].foto + `" alt="` + dados[i].nome + `" class="img-thumbnail">
                <h2 class="text-dark text-center">Seja bem vindo, ` + dados[i].nome + `, ` + status + `
                </h2>
                `
                $('#participant').append(participants)
            }
            $('body').append('<script src="participants/controller/confirmed-participant.js"></script>')
            $('body').append('<script src="participants/controller/edit-participant.js"></script>')
        }
    })

    $('.view-proof').click(function() {
        $('#participant').load('proof/view/detail-proof.html')
    })

    $('#timeline').click(function() {
        $('#participant').load('timeline/view/upload-timeline.html')
    })

    $('#logout').click(function() {
        var url = 'participants/model/logout.php'

        $.ajax({
            url: url,
            type: "POST",
            assync: true,
            dataType: 'json',
            success: function(dados) {
                if (dados.mensagem == true) {
                    $('#content').load('participants/view/restrict-participant.html')
                }
            }
        })
    })

})