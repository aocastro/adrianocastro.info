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

        $('#list-teacher').empty()

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            data: dados,
            url: 'teacher/model/list-teacher.php',
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    var user
                    if (dados[i].typeUser == 1) {
                        user = 'Administrador'
                    } else {
                        user = 'Avaliador'
                    }
                    let teacher = `
                    <div class="col-md-3 col-12 mt-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title text-center"><strong>${dados[i].nameTeacher}</strong></h5>
                                <p class="card-body text-center">
                                    ${dados[i].nameSchool} <br>
                                    ${user}
                                </p>
                                <button id="${dados[i].idTeacher}" class="btn btn-info btn-block btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                                <button id="${dados[i].idTeacher}" class="btn btn-primary btn-block btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i> Editar</button>
                                <button id="${dados[i].idTeacher}" class="btn btn-danger btn-block btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i> Excluir</button>
                            </div>
                        </div>
                    </div>
                    `
                    $('#list-teacher').append(teacher)
                }
                $('body').append('<script src="teacher/controller/view-teacher.js"></script>')
                $('body').append('<script src="teacher/controller/edit-teacher.js"></script>')
            }
        })
    })
})