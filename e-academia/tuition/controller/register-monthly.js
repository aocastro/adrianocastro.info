$(document).ready(function() {
    $('.receive').click(function(e) {
        e.preventDefault()
        $('.receive').hide()
        $('#modal-tuition').modal('hide')
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#receive-monthly').serialize()
        var url = 'tuition/model/receive-monthly.php'

        console.log(dados)

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                if (dados.mensagem == true) {
                    Swal.fire({
                        title: 'e-Academia Informa:',
                        text: 'Mensalidade baixada com sucesso!',
                        type: 'success',
                        confirmButtonText: 'Feito!'
                    })
                    $('#nameStudents').empty()
                    $('#vencimento').empty()
                    $('#grossValue').empty()
                    $('#idTuition').val("")
                    $('#idStudents').val("")
                    $('#amountPaid').val("")
                    hideLoading()
                    $('#receive-monthly').fadeOut('slow')
                } else {
                    hideLoading()
                    Swal.fire({
                        title: 'e-Academia Informa:',
                        text: dados.mensagem,
                        type: 'error',
                        confirmButtonText: 'Tente novamente...!'
                    })
                }
                $('body').append('<script src="tuition/controller/receive-monthly.js"></script>')
            }
        })
    })
})