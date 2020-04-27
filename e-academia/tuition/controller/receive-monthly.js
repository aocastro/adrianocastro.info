$(document).ready(function() {
    $('.btn-cash').click(function(e) {
        e.preventDefault()
        $('#modal-title').empty()
        $('#modal-body').empty()
        var dados = "idTuition="
        dados += $(this).attr('id')
        var url = 'tuition/model/list-tuition.php'
        $('#receive-monthly').fadeIn('slow')

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    $('#nameStudents').append(dados[i].nameStudents)
                    $('#vencimento').append(dados[i].vencimento)
                    $('#grossValue').append(dados[i].grossValue)
                    $('#idTuition').val(dados[i].idTuition)
                    $('#idStudents').val(dados[i].idStudents)
                    $('#amountPaid').val(dados[i].grossValue)
                }
            }
        })

        $('#list-tuition').fadeOut('slow')

        $('body').append('<script src="tuition/controller/register-monthly.js"></script>')
    })

})