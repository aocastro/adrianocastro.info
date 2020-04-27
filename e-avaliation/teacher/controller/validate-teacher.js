$(document).ready(function() {
    $('.btn-validate').click(function(e) {
        e.preventDefault()
        var dados = $('#validate').serialize()
        var url = 'teacher/model/validate-teacher.php'
        $.ajax({
            dataType: 'json',
            type: 'POST',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                if (dados.return == 'AVA') {
                    $('#content').empty()
                    $('#content').load('evaluator')
                } else if (dados.return == 'ADM') {
                    $('#content').empty()
                    $('#content').load('administrator')
                } else {
                    let error = `
                    <div class="offset-md-4 col-md-4 col-12">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>${dados.return}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    `
                    $('#return').append(error)
                }
                $('#validate-adm input').val("")
            }
        })
    })
})