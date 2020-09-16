$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Gerar mensalidade</h4>')

        $('.modal-body').load('src/tuition/view/generate-tuition.html')

        $('.btn-save').hide()

        $('.btn-generate').show()

        $('#modal-tuition').modal('show')
    })
})