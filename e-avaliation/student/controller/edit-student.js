$('.btn-edit').click(function() {
    var dados = 'idStudent='
    dados += $(this).attr('id')
    url = 'student/model/list-student.php'
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
                    <form id="update-student">
                        <div class="form-group">
                            <label><strong>Nome do Aluno</strong></label>
                            <input type="text" name="nameStudent" class="form-control input-lg" value="${dados[i].nameStudent}">
                        </div>
                        <div class="form-group">
                            <label><strong>Unidade escolar</strong></label>
                            <select name="work_school_idSchool" id="school" class="form-control input-lg">
                                <option value="${dados[i].work_school_idSchool}">${dados[i].nameSchool}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label><strong>Curso</strong></label>
                            <select name="work_course_idCourse" id="course" class="form-control input-lg">
                                <option value="${dados[i].work_course_idCourse}">${dados[i].nameCourse}</option>
                            </select>
                        </div>
                        <input type="hidden" name="idStudent" value="${dados[i].idStudent}"/>
                        <button class="btn btn-avaliation btn-block btn-lg btn-update"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
                    </form>
                </div>
                `
                $('#new').empty()
                $('#new').append(view)
                $('#new').fadeIn(1500)
                $('#list-student').fadeOut(1500)
                $('body').append('<script src="student/controller/update-student.js"></script>')
            }

            $('.btn-close').click(function(e) {
                e.preventDefault()
                $('#new').fadeOut(1500)
                $('#list-student').fadeIn(1500)
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

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: 'course/model/list-course.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let course = `
                <option value="${dados[i].idCouse}">${dados[i].nameCourse}</option>
                `
                $('#course').append(course)
            }
        }
    })


})