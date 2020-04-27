$(document).ready(function() {

    var url = 'participants/model/list-participant.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let participants = `
                <div class="col-md-2 col-6 mt-3">
                    <div class="card">
                        <img src="participants/model/img/` + dados[i].foto + `" class="img-fluid img-card">
                        <div class="card-footer">
                            <p class="card-title text-center legend">` + dados[i].nome + `</p>
                        </div>
                    </div>
                </div>
                `
                $('#list-participant').append(participants)
            }
        }
    })
})