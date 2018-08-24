$('#fileElt').filebox({
    buttonText: '选择头像',
    buttonAlign: 'right'
})

$("#add_btn").on("click", function () {
    $.ajaxFileUpload({
        url: "/upFile",
        fileElementId: $("#fileElt").parent().find("input[type=file]").attr("id"),
        dataType: "JSON",
        success: function (data) {
            setTimeout(() => {
                $("#img_head").attr("src", data);
                alert('上传成功！')
            }, 300)
        }
    });
})

