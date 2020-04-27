$('.btn-edit').click(function() {
    var dados = 'idTeacher='
    dados += $(this).attr('id')
    url = 'teacher/model/list-teacher.php'
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        data: dados,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                var user
                var option
                var type
                if (dados[i].typeUser == 1) {
                    user = 'Administrador'
                    option = '2'
                    type = 'Avaliador'
                } else {
                    user = 'Avaliador'
                    option = '1'
                    type = 'Administrador'
                }
                let view = `
                <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
                    <form id="update-teacher">
                        <div class="form-group">
                            <label><strong>Nome do professor</strong></label>
                            <input type="text" value="${dados[i].nameTeacher}" name="nameTeacher" class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Login do professor</strong></label>
                            <input type="text" value="${dados[i].loginTeacher}" name="loginTeacher" class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Senha do professor</strong></label>
                            <input type="password" value="${dados[i].passwordTeacher}" name="passwordTeacher" class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Tipo de Usuário</strong></label>
                            <select name="typeUser" class="form-control input-lg">
                                <option value="${dados[i].typeUser}">${user}</option>
                                <option value="${option}">${type}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><strong>Unidade escolar</strong></label>
                            <select name="work_school_idSchool" id="school" class="form-control input-lg">
                                <option value="${dados[i].idSchool}">${dados[i].nameSchool}</option>
                                
                            </select>
                        </div>
                        <input type="hidden" name="idTeacher" value="${dados[i].idTeacher}">
                        <button class="btn btn-success btn-block btn-lg btn-update"><i class="mdi mdi-content-save-settings"></i> Salvar Alterações</button>
                        <button class="btn btn-avaliation btn-lg btn-block btn-close"><i class="mdi mdi-close-circle"></i> Fechar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-teacher').fadeOut(1500)
                $('body').append('<script src="teacher/controller/update-teacher.js"></script>')
            }

            $('.btn-close').click(function(e) {
                e.preventDefault()
                $('#new').fadeOut(1500)
                $('#list-teacher').fadeIn(1500)
            })
        }
    })

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: 'school/model/list-school.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let school = `
                <option value="${dados[i].idSchool}">${dados[i].nameSchool}</option>
                `
                $('#school').append(school)
            }
        }
    })


})