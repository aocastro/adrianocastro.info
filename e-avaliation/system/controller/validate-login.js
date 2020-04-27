$('.btn-login').click(function(e) {
    e.preventDefault()
    var dados = $('#validate-adm').serialize()
    var url = 'system/model/validate-login.php'
    $.ajax({
        url: url,
        type: "POST",
        data: dados,
        assync: true,
        dataType: 'json',
        success: function(dados) {
            if (dados.return == true) {
                $('#system').empty();
                $('#system').load('system/view/system.html')
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