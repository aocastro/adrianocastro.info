function selectStudent() {
    $('.alert-link').click(function(e) {
        e.preventDefault()

        let name = $(this).attr('data-name')
        let id = $(this).attr('id')

        $('#nameStudents').val(name)
        $('#idStudents').val(id)
        $('#result').hide()
    })
}

$(document).ready(function() {

    $('#nameStudents').keyup(function() {

        let search = $(this).val()

        var dados = `nameStudents=${search}`

        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: false,
            data: dados,
            url: 'src/students/model/find-students.php',
            success: function(dados) {
                for (const dado of dados) {
                    $('#result').empty()
                    $('#result').show()
                    $('#result').append(`
                        <div class="alert alert-primary mt-1" role="alert">
                            <a href="${dado.idStudents}" class="alert-link" data-name="${dado.nameStudents}">${dado.idStudents} - ${dado.nameStudents}</a>
                        </div>
                    `)

                    selectStudent()
                }
            }
        })
    })
})