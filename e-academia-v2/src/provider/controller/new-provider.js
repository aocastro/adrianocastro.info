$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Adicionar novo forncedores</h4>')

        $('.modal-body').load('src/provider/view/form-provider.html')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-provider').modal('show')
    })
})