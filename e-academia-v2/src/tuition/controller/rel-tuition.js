$(document).ready(function() {
    $('.btn-filter').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#filter-tuition').serialize()
        var url = 'src/tuition/model/totaly-tuition.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let totaly = `
                        <div class="offset-md-2 col-md-8 col-12 alert alert-primary" role="alert">
                            <h1 class="text-agua text-center">Total recebido no período: R$ ${dados[i].total}</h1>
                        </div>
                    `
                    $('#rel-tuition').append(totaly)
                }
            }
        })

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: 'src/tuition/model/types-tuition.php',
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let types = `
                        <div class="alert alert-info" role="alert">
                            <h1 class="text-agua">Total em ${dados[i].namePayment}: R$ ${dados[i].total}</h1>
                        </div>
                    `
                    $('#rel-tuition').append(types)
                }
                hideLoading()
            }
        })
    })
})