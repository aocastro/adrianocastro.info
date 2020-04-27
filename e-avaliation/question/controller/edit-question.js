$('.btn-edit').click(function() {
    var dados = 'idQuestion='
    dados += $(this).attr('id')
    url = 'question/model/list-question.php'
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
                    <form id="update-question">
                        <div class="form-group">
                            <label><strong>Categoria</strong></label>
                            <input type="text" name="categoryItem_avaliation" class="form-control" value="${dados[i].categoryItem_avaliation}">
                        </div>
                        <div class="form-group">
                            <label><strong>Sub-Categoria</strong></label>
                            <input type="text" name="subgroupItem_avaliation" class="form-control" value="${dados[i].subgroupItem_avaliation}">
                        </div>
                        <div class="form-group">
                            <label><strong>Questão</strong></label>
                            <textarea name="descriptionItem_avaliation" cols="30" rows="3" class="form-control">
                            ${dados[i].descriptionItem_avaliation}
                            </textarea>
                        </div>
                        <input type="hidden" name="idItem_avaliation" value="${dados[i].idItem_avaliation}">
                        <button class="btn btn-avaliation btn-block btn-lg btn-update"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
                    </form>
                </div>
                        `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-quesion').fadeOut(1500)
                $('body').append('<script src="question/controller/update-question.js"></script>')
            }

            $('.btn-close').click(function(e) {
                e.preventDefault()
                $('#new').fadeOut(1500)
                $('#list-question').fadeIn(1500)
            })
        }
    })
})