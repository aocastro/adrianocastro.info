$('.btn-view').click(function() {
    var dados = 'idQuestion='
    dados += $(this).attr('id')
    console.log(dados)
    url = 'question/model/list-question.php'
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
                            <label><strong>Categoria</strong></label>
                            <input type="text" name="categoryItem_avaliation" disabled class="form-control" value="${dados[i].categoryItem_avaliation}">
                        </div>
                        <div class="form-group">
                            <label><strong>Sub-Categoria</strong></label>
                            <input type="text" name="subgroupItem_avaliation" disabled class="form-control" value="${dados[i].subgroupItem_avaliation}">
                        </div>
                        <div class="form-group">
                            <label><strong>Questão</strong></label>
                            <p>
                            ${dados[i].descriptionItem_avaliation}
                            </p>
                        </div>
                        <button class="btn btn-avaliation btn-lg btn-block btn-close"><i class="mdi mdi-close-circle"></i> Fechar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-question').fadeOut(1500)

                $('.btn-close').click(function(e) {
                    e.preventDefault()
                    $('#new').fadeOut(1500)
                    $('#list-question').fadeIn(1500)
                })
            }
        }
    })
})