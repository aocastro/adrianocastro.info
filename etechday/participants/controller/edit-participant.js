$(document).ready(function() {
    $('.edit-perfil').click(function(e) {
        e.preventDefault()
        var dados = 'id='
        dados += $(this).attr('id')
        var url = 'participants/model/edit-participant.php'

        $('#participant').empty()

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let participant = `
                    <div class="col-md-12 col-12 bg-danger">
                        <h1 class="text-center text-white">Atualização Cadastral</h1>
                    </div>
                    <div class="col-md-12 col-12 mt-4">
                        <form id="update-participant">
                            <div class="form-group row">
                                <label class="col-md-3 col-12 col-form-label">Nome completo</label>
                                <div class="col-md-9 col-12">
                                    <input type="text" name="nome" class="form-control" maxlength="150" value="${dados[i].nome}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-12 col-form-label">E-mail</label>
                                <div class="col-md-9 col-12">
                                    <input type="email" name="email" class="form-control" maxlength="255" value="${dados[i].email}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-12 col-form-label">Nome do Responsável</label>
                                <div class="col-md-9 col-12">
                                    <input type="text" name="responsavel" class="form-control" maxlength="150" value="${dados[i].responsavel}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-12 col-form-label">Data de nascimento</label>
                                <div class="col-md-3 col-12">
                                    <input type="date" name="nascimento" class="form-control" value="${dados[i].nascimento}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-12 col-form-label">Login</label>
                                <div class="col-md-5 col-12">
                                    <input type="text" name="login" class="form-control" maxlength="16" value="${dados[i].login}">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-12 col-form-label">Senha</label>
                                <div class="col-md-5 col-12">
                                    <input type="password" name="senha" class="form-control" maxlength="32">
                                </div>
                            </div>
                            <input type="hidden" name="id" value="${dados[i].id}"/>
                            <button class="btn btn-outline-success btn-block btn-update"><i class="mdi mdi-content-save"></i> Salvar</button>
                        </form>
                    </div>
                    `
                    $('#participant').append(participant)
                }
                $('body').append('<script src="participants/controller/update-participant.js"></script>')
            }
        })
    })
})