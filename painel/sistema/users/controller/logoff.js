$(document).ready(function () {
    $('.logoff').click(function (e) {

        e.preventDefault()
        var url = '../model/logoffUsuario.php'

        $.ajax({
			type: 'POST',
            dataType: 'json',
            url: url,
            async: true,
            success: function (dados) {
                if (dados.return == true) {
					let url = '../../index.html'
					$(location).attr('href',url)
                } else {
                    alert('ATENÇÃO: Ocorreu um erro durante o Logoff, por favor informe a um técnico.')
                }
            }
        })
    })
})