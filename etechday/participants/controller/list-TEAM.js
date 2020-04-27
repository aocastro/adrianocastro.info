$(document).ready(function() {

    var url = 'participants/model/list-TEAM.php'
        // $('#list-participant').append('<div class="row">')

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {

                // let controle

                // if (controle < dados[i].TECHDAY_TEAM_id) {
                //     $('#list-participant').append('</div><div class="row">')
                // }

                let participants = `
                    <div class="col-md-2 col-6 mt-3">
                        <div class="card">
                            <img src="participants/model/img/` + dados[i].foto + `" class="img-fluid img-card">
                            <div class="card-footer">
                                <p class="card-title text-center legend">` + dados[i].nome + `</p>
                                <p class="text-center border-top">` + dados[i].equipe + `</p>
                            </div>
                        </div>
                    </div>
                `
                $('#list-participant').append(participants)

                // controle = dados[i].TECHDAY_TEAM_id
            }
        }
    })
})