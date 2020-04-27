$('.btn-view').click(function() {
    var dados = 'idCourse='
    dados += $(this).attr('id')
    console.log(dados)
    url = 'course/model/list-course.php'
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
                            <label><strong>Nome do Curso</strong></label>
                            <input type="text" name="nameCourse" class="form-control input-lg" value="${dados[i].nameCourse}">
                        </div>
                        <button class="btn btn-avaliation btn-lg btn-block btn-close"><i class="mdi mdi-close-circle"></i> Fechar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-course').fadeOut(1500)

                $('.btn-close').click(function(e) {
                    e.preventDefault()
                    $('#new').fadeOut(1500)
                    $('#list-course').fadeIn(1500)
                })
            }
        }
    })
})