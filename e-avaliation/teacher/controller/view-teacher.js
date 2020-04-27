$('.btn-view').click(function() {
    var dados = 'idTeacher='
    dados += $(this).attr('id')
    console.log(dados)
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
                if (dados[i].typeUser == 1) {
                    user = 'Administrador'
                } else {
                    user = 'Avaliador'
                }
                let view = `
                <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
                    <form>
                        <div class="form-group">
                            <label><strong>Nome do professor</strong></label>
                            <input type="text" value="${dados[i].nameTeacher}" disabled class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Login do professor</strong></label>
                            <input type="text" value="${dados[i].loginTeacher}" disabled class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Senha do professor</strong></label>
                            <input type="password" value="${dados[i].passwordTeacher}" disabled class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Tipo de Usuário</strong></label>
                            <input type="text" value="${user}" disabled class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Unidade escolar</strong></label>
                            <input type="text" value="${dados[i].nameSchool}" disabled class="form-control input-lg">
                        </div>
                        <button class="btn btn-avaliation btn-lg btn-block btn-close"><i class="mdi mdi-close-circle"></i> Fechar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-teacher').fadeOut(1500)

                $('.btn-close').click(function(e) {
                    e.preventDefault()
                    $('#new').fadeOut(1500)
                    $('#list-teacher').fadeIn(1500)
                })
            }
        }
    })
})