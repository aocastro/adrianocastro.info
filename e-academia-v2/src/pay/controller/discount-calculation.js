$('#discountPay').focusout(function() {
    var discount = $('#discountPay').val()
    var amountPaid = $('#amountPaid').val()

    amountPaid = parseFloat(amountPaid) - parseFloat(discount)

    $('#amountPaid').empty()
    $('#amountPaid').val(parseFloat(amountPaid))
})

$('#additionPay').focusout(function() {
    var discount = $('#discountPay').val()
    var additionPay = $('#additionPay').val()
    var amountPaid = $('#amountPaid').val()

    amountPaid = (parseFloat(amountPaid) - parseFloat(discount)) + parseFloat(additionPay)

    $('#amountPaid').empty()
    $('#amountPaid').val(parseFloat(amountPaid))
})