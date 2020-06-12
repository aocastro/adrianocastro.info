$(document).ready(function() {
    $('#discount').focusout(function() {
        var discount = $('#discount').val()
        var amountPaid = $('#amountPaid').val()

        amountPaid = amountPaid - discount

        $('#amountPaid').empty()
        $('#amountPaid').val(amountPaid)
    })
})