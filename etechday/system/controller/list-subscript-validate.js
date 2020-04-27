$(document).ready(function() {

    var url = 'system/model/list-subscript-validate.php'

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
                        <img src="participants/model/img/` + dados[i].foto + `" class="img-fluid">
                        <div class="card-body">
                            <p class="card-title text-center legend">` + dados[i].nome + `</p>
                        </div>
                        <div class="card-footer">
                            <button id="` + dados[i].id + `" class="btn btn-primary btn-block btn-validate">Validar</button>
                            <button id="` + dados[i].id + `" data-foto="` + dados[i].foto + `" class="btn btn-danger btn-block btn-delete">Excluir</button>
                        </div>
                    </div>
                </div>
                `
                $('#list-participant').append(participants)
            }
            $('body').append('<script src="system/controller/subscript-delete.js"></script>')
            $('body').append('<script src="system/controller/subscript-validate.js"></script>')
        }
    })
})