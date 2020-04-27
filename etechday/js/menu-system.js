$(document).ready(function() {
    $('.validate').click(function() {
        $('#system').empty()
        $('#system').load('system/view/subscript_validate.html')
    })

    $('.list').click(function() {
        $('#system').empty()
        $('#system').load('system/view/subscript-list.html')
    })

    $('.add-team').click(function() {
        $('#system').empty()
        $('#system').load('system/view/create-team.html')
    })

    $('.manage-team').click(function() {
        $('#system').empty()
        $('#system').load('system/view/manage-team.html')
    })

    $('.create-proof').click(function() {
        $('#system').empty()
        $('#system').load('proof/view/create-proof.html')
    })

})