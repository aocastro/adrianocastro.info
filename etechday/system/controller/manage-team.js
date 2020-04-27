$(document).ready(function() {

    var url = 'system/model/manage-team.php'

    var teamController = 0

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {

                if (dados[i].TECHDAY_TEAM_id != teamController) {
                    let team = `
                        <div class="col-md-3 col-6 mt-2">
                            <div class="card">
                                <img class="card-img-top img-card" src="" alt="Logo da equipe">
                                <div class="card-body">
                                    <h5 class="card-title">` + dados[i].equipe + `</h5>
                                    <p class="card-text" id="team` + dados[i].TECHDAY_TEAM_id + `">` + dados[i].nome + `<br></p>
                                </div>
                            </div>
                        </div>
                    `
                    $('#list-team').append(team)
                } else {
                    $('#team' + dados[i].TECHDAY_TEAM_id).append(dados[i].nome + '<br>')
                }

                teamController = dados[i].TECHDAY_TEAM_id

            }
            // $('body').append('<script src="system/controller/view-participant.js"></script>')
            // $('body').append('<script src="system/controller/promoted.js"></script>')
        }
    })
})