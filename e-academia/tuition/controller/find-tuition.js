$(document).ready(function() {

    $('.btn-find').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#find-tuition').serialize()
        var url = 'tuition/model/list-tuition.php'
        $('#list-tuition').empty()
        $('#receive-monthly').hide('slow')
        $('#list-tuition').show('slow')

        console.log(dados)

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let tuition = `
                        <div class="col-md-6 col-12 mt-1">
                            <button id="${dados[i].idTuition}" title="Receber" class="btn btn-agua btn-sm btn-block btn-lg btn-cash">${dados[i].nameStudents} - ${dados[i].vencimento}</button>
                        </div>
                    `
                    $('#list-tuition').append(tuition)
                }
                $('body').append('<script src="tuition/controller/receive-monthly.js"></script>')
                hideLoading()
            }
        })
    })
})