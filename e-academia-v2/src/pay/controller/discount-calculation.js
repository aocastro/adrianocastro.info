$('#discountPay').focusout(function() {
    var discount = $('#discountPay').val()
    var amountPaid = $('#amountPaid').val()

    amountPaid = parseFloat(amountPaid) - parseFloat(discount)

    amountPaid = parseFloat(amountPaid).toFixed(2).replace('.', ',')

    $('#amountPaid').empty()
    $('#amountPaid').val(amountPaid.toString())
})

$('#additionPay').focusout(function() {
    var discount = $('#discountPay').val()
    var additionPay = $('#additionPay').val()
    var amountPaid = $('#amountPaid').val()

    amountPaid = (parseFloat(amountPaid) - parseFloat(discount)) + parseFloat(additionPay)

    amountPaid = parseFloat(amountPaid).toFixed(2).replace('.', ',')

    $('#amountPaid').empty()
    $('#amountPaid').val(amountPaid.toString())
})