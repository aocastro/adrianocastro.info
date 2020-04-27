$('.btn-search').click(function() {
    let status = $('#form-search').attr('data-status')
        // status == '0' ? $('#form-search').removeClass('hide') : $('#form-search').addClass('hide')
    if (status == '0') {
        $('#form-search').removeClass('hide')
        $('#form-search').attr('data-status', '1')
    } else {
        $('#form-search').addClass('hide')
        $('#form-search').attr('data-status', '0')
    }

})

$(document).ready(function() {
    $('#search').keyup(function() {
        let dados = 'search='
        dados += $('#search').val()

        $('#list-question').empty()

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            data: dados,
            url: 'question/model/list-question.php',
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let question = `
                <div class="col-md-3 col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title text-center">
                                <strong>${dados[i].categoryItem_avaliation} | ${dados[i].subgroupItem_avaliation}</strong><br>
                                ${dados[i].descriptionItem_avaliation}
                            </p>
                            <button id="${dados[i].idItem_avaliation}" class="btn btn-info btn-block btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                            <button id="${dados[i].idItem_avaliation}" class="btn btn-primary btn-block btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i> Editar</button>
                        </div>
                    </div>
                </div>
                `
                    $('#list-question').append(question)
                }
                $('body').append('<script src="question/controller/view-question.js"></script>')
                $('body').append('<script src="question/controller/edit-question.js"></script>')
            }
        })
    })
})