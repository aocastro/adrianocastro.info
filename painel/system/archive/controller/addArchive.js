$(document).ready(function () {

    $('.btn-addArchive').click(function (e) {

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()
        $('.modal-footer').empty()

        let newArchive = `

            <form id="add-archive" enctype="multipart/form-data">

                <div class="form-group">
                    <label for="txtTitulo" style="margin-bottom: -5px;">Foto</label>
                    <input id="txtTitulo" class="form-control" type="file" name="img">
                </div>

            </form>

            `
        $('.modal-title').append('<h3 class="modal-title font-weight-bold" id="TituloModal">New Archive</h3>')
        $('.modal-body').append(newArchive)
        $('.modal-footer').append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button><button class="btn btn-success btn-add" data-dismiss="modal">Conclude</button>')
        $('#modal').modal('show')
    })
    
    $('btn-add').click(function (e) {
        e.preventDefault()
        var url = '../../archive/model/addArchive.php'        
        var arc = document.getElementById('add-archive');
        var formData = new FormData(arc)
        $.ajax({

            url: url,
            type: 'POST',
            data: formData,
            mimeType: 'multipart/form-data',
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function (arc) {
                if (arc.return == true) {
                    $('#modal').modal('hide')
                    function update(){
                        $('#painel').load('../../archive/view/panelArchive.html')
                    }
                    setTimeout(update, 500)
                } else {
                    $('#modal').modal('hide')
                    alert('ATTENTION: An error occurred while adding new files, please inform a technician.')
                    $('#painel').load('../../archive/view/panelArchive.html')
                }
                $('#add-archive input').val("")

            }

        })
    })

})