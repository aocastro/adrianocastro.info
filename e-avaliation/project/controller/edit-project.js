$('.btn-edit').click(function() {
    var dados = 'idProject='
    dados += $(this).attr('id')
    url = 'project/model/list-project.php'
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        data: dados,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let view = `
                <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
                    <form id="update-project">
                        <div class="form-group">
                            <label><strong>Nome do Projeto</strong></label>
                            <input type="text" name="nameProject" value="${dados[i].nameProject}" class="form-control input-lg">
                        </div>
                        <div class="form-group">
                            <label><strong>Resumo</strong></label>
                            <textarea name="resumeProject" class="form-control" cols="30" rows="3">
                            ${dados[i].resumeProject}
                            </textarea>
                        </div>
                        <input type="hidden" name="idProject" value="${dados[i].idProject}"/>
                        <button class="btn btn-avaliation btn-block btn-lg btn-update"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-project').fadeOut(1500)
                $('body').append('<script src="project/controller/update-project.js"></script>')
            }

            $('.btn-close').click(function(e) {
                e.preventDefault()
                $('#new').fadeOut(1500)
                $('#list-project').fadeIn(1500)
            })
        }
    })
})