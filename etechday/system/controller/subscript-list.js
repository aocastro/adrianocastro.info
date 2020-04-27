$(document).ready(function() {

    var url = 'participants/model/list-participant.php'

    $('tbody').empty()

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
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

                let status
                let btnLabel
                switch (dados[i].status) {
                    case '0':
                        status = 'btn-secoundary'
                        btnLabel = 'Inscrito'
                        break
                    case '1':
                        status = 'btn-warning'
                        btnLabel = 'Selecionado'
                        break
                    case '2':
                        status = 'btn-success'
                        btnLabel = 'Confirmado'
                        break
                }

                let participants = `
                <tr>
                    <td scope="row">` + dados[i].nome + `</td>
                    <td scope="row">` + dados[i].email + `</td>
                    <td class="text-center" scope="row">` + dados[i].modulo + `</td>
                    <td scope="row">` + perfil + `</td>
                    <td class="text-center" scope="row">
                        <button id="` + dados[i].id + `" class="btn btn-primary btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                        <button id="` + dados[i].id + `" class="btn ` + status + ` btn-sm"><i class="mdi mdi-check-circle"></i> ` + btnLabel + `</button>
                    </td>
                </tr>
                `
                $('tbody').append(participants)
            }
            $('body').append('<script src="system/controller/view-participant.js"></script>')
            $('body').append('<script src="system/controller/promoted.js"></script>')
        }
    })
})