$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Adicionar novo aluno</h4>')

        $('.modal-body').load('src/students/view/form-students.html', function() {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                async: false,
                url: 'src/services/model/all-services.php',
                success: function(dados) {
                    for (const dado of dados) {
                        $('#AGUAVIVA_SERVICES_idServices').append(`<option value="${dado.idServices}">${dado.nameServices}</option>`)
                    }

                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-students').modal('show')
    })
})