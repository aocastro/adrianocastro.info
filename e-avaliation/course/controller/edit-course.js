$('.btn-edit').click(function() {
    var dados = 'idCourse='
    dados += $(this).attr('id')
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
                    <form id="update-course">
                        <div class="form-group">
                            <label><strong>Nome do Curso</strong></label>
                            <input type="text" name="nameCourse" class="form-control input-lg" value="${dados[i].nameCourse}">
                        </div>
                        <input type="hidden" value="${dados[i].idCourse}" name="idCourse"/>
                        <button class="btn btn-avaliation btn-block btn-lg btn-update"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-course').fadeOut(1500)
                $('body').append('<script src="course/controller/update-course.js"></script>')
            }

            $('.btn-close').click(function(e) {
                e.preventDefault()
                $('#new').fadeOut(1500)
                $('#list-course').fadeIn(1500)
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