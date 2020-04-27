$(document).ready(function() {

    $('#btn-upload').click(function() {
        $.ajax({
            async: false,
            success: function() {
                let url = 'upload/view/sendUpload.html'
                $('#content').empty()
                console.log(url)
                $('#content').load(url)
            }
        })

    })

})