let nameUsers;
let namePwds;
let namePhones;
let nameCodes;
let nameEmails;

function init() {
    // 账号
    $('#nameUser').on('change', changeName);
    // 密码
    $('#namePwd').on('change', changPwd);
    // 电话号码
    $('#namePhone').on('change', changPhone);
    // 验证码
    $("#nameCode").on('change', changeCodeOne);
    // 发送验证码
    $('#button_code').on('click', changeCode);
    // 邮箱
    $("#nameEmail").on('change', changEmail);
    // 提交表单
    $("#reg_form").on('click', checkForm);
}
// 检测用户名
function changeName() {
    $.ajax({

        type: 'post',
        url: '/reg',
        data: { uname: event.target.value },
        success: function (data) {
            // console.log(data);
            // if(data == 'true'){
            //         $("#addSpan").html('该用户可以注册').css("color", 'green'); 
            // }else{
            //         $("#addSpan").html('X 该用户已经被注册').css("color", 'red');                
            // }
            if (/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/.test(nameUser.value)) {
                if (data == 'true') {
                    $("#addSpan").html('X 该用户已经被注册').css("color", 'red');
                    nameUsers = false;
                } else {
                    $("#addSpan").html('该用户可以注册').css("color", 'green');
                    nameUsers = true;
                }
            } else {
                $("#addSpan").html('X 格式错误').css("color", 'red');
                nameUsers = false;
            }
        }
    })
};
//检测密码
function changPwd() {
    if (/^\w{6}$/.test(this.value)) {
        $("#pwdSpan").html('正确').css("color", 'green');
        namePwds = true;
    } else {
        $("#pwdSpan").html('X  密码只能数字字母').css("color", 'red');
        namePwds = false;
    }
}
//验证手机号
function changPhone() {
    if (/^[1]\d{10}$/.test(this.value)) {
        $("#phoneSpan").html('正确').css("color", 'green');
        namePhones = true;
    } else {
        $("#phoneSpan").html('X 手机格式错误').css("color", 'red');
        namePhones = false;
    }
}
// 验证码
function changeCodeOne() {
    if (this.value == $("#button_span").text()) {
        $("#code_span").html('验证码正确').css("color", 'green');
        nameCodes = true;
    } else {
        $("#code_span").html('X 验证码错误').css("color", 'red');
        nameCodes = false;
    }
}
// 发送验证码
function changeCode() {
    $.get('./users/vfCode', function (data) {
        $("#button_span").html(data);
    });
}
// 验证邮箱
function changEmail() {
    if (/^\w+@\w+(\.\w+)+$/.test(this.value)) {
        $("#emailSpan").html('正确').css("color", 'green');
        nameEmails = true;
    } else {
        $("#emailSpan").html('X 邮箱格式为xxx@xxx.xx').css("color", 'red');
        nameEmails = false;
    }
}
// 表单验证
function checkForm(e) {
    if (nameUsers && namePwds && namePhones && nameCodes && nameEmails) {

    } else {
        e.preventDefault();

    }
}

init();