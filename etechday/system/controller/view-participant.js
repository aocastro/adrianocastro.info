$(document).ready(function() {
    $('.btn-view').click(function(e) {
        e.preventDefault()
        var dados = 'id='
        dados += $(this).attr('id')
        var url = 'system/model/view-participant.php'

        $('.modal-title').empty()
        $('.modal-body').empty()

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let perfil
                    switch (dados[i].perfil) {
                        case '1':
                            perfil = 'Desenvolvedor Front-End';
                            break;
                        case '2':
                            perfil = 'Desenvolvedor Back-End';
                            break;
                        case '3':
                            perfil = 'Desenvolvedor Arduíno';
                            break;
                        case '4':
                            perfil = 'Criativo/Comunicativo';
                            break;
                    }

                    let participant = `
                    <div class="card mb-3">
                        <img class="card-img-top" src="participants/model/img/` + dados[i].foto + `" alt="Participante">
                        <div class="card-body">
                            <h5 class="card-title">Dados do participante</h5>
                            <p class="card-text"><strong>Email: </strong>` + dados[i].email + `</p>
                            <p class="card-text"><strong>Módulo: </strong>` + dados[i].modulo + `</p>
                            <p class="card-text"><strong>Perfil: </strong>` + perfil + `</p>
                        </div>
                    </div>
                    `
                    $('.modal-title').append(dados[i].nome)
                    $('.modal-body').append(participant)
                    $('#modal-participant').modal('show')
                }
            }
        })
    })
})