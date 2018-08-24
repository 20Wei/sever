$("#long_btn").on('click', function (e) {
    if ($("#usName").val() == '' || $("#usPwd").val() == '') {
        e.preventDefault();
    }
});