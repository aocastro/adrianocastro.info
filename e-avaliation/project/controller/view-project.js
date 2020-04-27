$('.btn-view').click(function() {
    var dados = 'idProject='
    dados += $(this).attr('id')
    console.log(dados)
    url = 'project/model/list-project.php'
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
                            <label><strong>Nome do Projeto</strong></label>
                            <input type="text" value="${dados[i].nameProject}" disabled class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Resumo</strong></label>
                            <p>
                            ${dados[i].resumeProject}
                            </p>
                        </div>
                        <button class="btn btn-avaliation btn-lg btn-block btn-close"><i class="mdi mdi-close-circle"></i> Fechar</button>
                    </form>
                </div>
                        `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-project').fadeOut(1500)

                $('.btn-close').click(function(e) {
                    e.preventDefault()
                    $('#new').fadeOut(1500)
                    $('#list-project').fadeIn(1500)
                })
            }
        }
    })
})