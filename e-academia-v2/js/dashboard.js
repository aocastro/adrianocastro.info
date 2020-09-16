$(document).ready(function() {
    // Carregando as informações de alunos cadastrados...
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: false,
        url: 'src/students/model/count-students.php',
        success: function(dados) {
            $('#students').empty()
            $('#students').append(dados[0].resultado)
        }
    })

    // Carregando as informações de mensalidades em aberto...
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: false,
        url: 'src/tuition/model/now-open-tuition.php',
        success: function(dados) {
            $('#tuition').empty()
            let total = dados[0].total
            if (total == '') {
                $('#tuition').append('R$ 0,00')
            } else {
                total = parseFloat(total).toFixed(2).replace(".", ",")
                $('#tuition').append('R$ ' + total)
            }
        }
    })

    // Carregando as informações de mensalidades em aberto...
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: false,
        url: 'src/pay/model/now-open-pay.php',
        success: function(dados) {
            $('#pay').empty()
            let total = dados[0].total
            if (total == '') {
                $('#pay').append('R$ 0,00')
            } else {
                total = parseFloat(total).toFixed(2).replace(".", ",")
                $('#pay').append('R$ ' + total)
            }
        }
    })

    $('#card-tuition').click(function(e) {
        e.preventDefault()
        $('#content').empty()
        $('#content').load('src/tuition/view/list-open-tuition.html')
    })
})