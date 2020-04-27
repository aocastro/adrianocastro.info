$(document).ready(function() {
    $('.btn-filter').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#filter-tuition').serialize()
        var url = 'tuition/model/totaly-tuition.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
            url: url,
            data: dados,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let totaly = `
                        <div class="offset-md-2 col-md-8 col-12 alert alert-primary mt-5" role="alert">
                            <h5 class="text-agua text-center">Total recebido no período: R$ ${dados[i].total}</h5>
                        </div>
                    `
                    $('#rel-tuition').append(totaly)
                }
            }
        })

        // $.ajax({
        //     dataType: 'json',
        //     type: 'post',
        //     assync: true,
        //     url: url,
        //     data: 'tuition/model/detail-tuition.php',
        //     success: function(dados) {
        //         for (var i = 0; i < dados.length; i++) {
        //             let types = `
        //                 <div class="alert alert-info" role="alert">
        //                     <div class="col-md-6 col-12 text-center">
        //                         ${dados[i].nameStudents}
        //                     </div>
        //                     <div class="col-md-3 col-12 text-center">
        //                         ${dados[i].namePayment}
        //                     </div>
        //                     <div class="col-md-2 col-12 text-center">
        //                         R$ ${dados[i].amountPaid}
        //                     </div>
        //                     <p class="text-agua"></p>
        //                 </div>
        //             `
        //             $('#rel-tuition').append(types)
        //         }
        //         hideLoading()
        //     }
        // })
    })
})