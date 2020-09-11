$(document).ready(function() {
    $('#discount').focusout(function() {
        var discount = $('#discount').val()
        var amountPaid = $('#amountPaid').val()

        amountPaid = parseFloat(amountPaid) - parseFloat(discount)

        console.log(amountPaid)

        amountPaid = parseFloat(amountPaid).toFixed(2).replace('.', ',')

        console.log(amountPaid)

        $('#amountPaid').val('')

        console.log(amountPaid.toString())

        $('#amountPaid').val(amountPaid.toString())
            // alert(amountPaid)
            // alert(amountPaid.toString())
    })
})