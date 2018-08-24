// 当前页数
let curpage = 1;
// 最大页数
let maxpage = 0;
// 行
let pagerows = 10;
// 修改增加初始值
let isSearch = false;
//是否为修改框
let isupdataB = false

$(() => {

    // 点击上下页    
    $("#up_bth").on("click", upclick);
    // 下一页
    $("#next_bth").on("click", nextclick);
    // 增加信息按钮
    $("#add_addButton").on('click', addContent);
    //增加返回按钮

    // 返回按钮
    // 搜索按钮
    $("#find_button").on('click', findContent)
    //搜索返回
    $("#next_text").on('click', cleanContent)
    content(1);

    $.get('/getSession', (data) => {
        if (data == '') {
            $("#text_user").html(`<a href = "./login.html">请点击登录进入</a>`);
        } else {
            $("#text_user").html(`欢迎:${data}来到我们美丽的泰国`);
        }
    });
})

// $.get('/searchName', (data) => {
//     refreshList(data.rows);
// });
//刷新搜索列表
function refreshList(data) {

    // let str = '';
    // for (let movie of data) {
    //     str += `<tr>
    //     <td>${(curpage - 1) * pagerows + i + 1}</td>
    //     <td>${movie.name}</td>
    //     <td>${movie.sex}</td>
    //     <td>${movie.marry}</td>
    //     <td>${movie.year}</td> 
    //     <td>${movie.money}</td>
    //     <td>${movie.city}</td>  
    //     </tr>`
    // }
    // $("#user_list").html(str);
    $("#user_list").html(data.map((movie, i) => {
        return `<tr id = "aqqq">
        <td>${(curpage - 1) * pagerows + i + 1}</td>        
                <td>${movie.name}</td>
                <td>${movie.sex}</td>
                 <td>${movie.marry}</td>
                 <td>${movie.year}</td>
                 <td>${movie.money}</td>
                 <td>${movie.city}</td>
                 <td><button id = '${movie._id}' onclick = "del_onclick()">删除</button>
                    <button data-movie = ${JSON.stringify(movie)} onclick = "update_onclick()">修改</button>
                 </td>
                 </tr>
        `
    }).join(""));
}


// 函数包 
function content(page, searchName = '', searchSex = '') {
    let param = { rows: pagerows, page: page };
    if (searchName != '') {
        param.name = searchName;
    }
    if (searchSex != '') {
        param.sex = searchSex;
    }
    $.get('/getTableData', param, (data) => {
        maxpage = data.maxpage;
        refreshList(data.rows);
        $("#lable_span").html(`${page}/${maxpage}`)
    });
}


//————————————————————————————————————————————删除——————————————————————————————————————-
function del_onclick() {
    $.ajax({
        type: 'get',
        url: "/delData",
        data: { _id: event.target.id },
        success: (data) => {
            content(curpage);
        }
    });
}
//------------------------------------------------增加--------------------------------------
function addContent() {
    if (isupdataB) {
        updatasenter()
    } else {
        $.ajax({
            type: 'get',
            url: "/addData",
            data: {
                name: $("#addsuer").val(),
                sex: $("#addsex").val(),
                marry: $("#addmarry").val(),
                year: $("#addgender").val(),
                money: $("#addmoney").val(),
                city: $("#addcity").val()
            },
            success: (data) => {
                content(curpage);
                $("#add_div").css({
                    display: "none"
                });
            }
        });
    }

}
let updataId;

//---------------------------------------------修改-----------------------------------------
function update_onclick() {
    isupdataB = true;
    $("#add_div").css({ display: "block" });
    let obj = JSON.parse(event.target.dataset.movie);
    $("#addsuer").val(obj.name);
    $("#addsex").val(obj.sex);
    $("#addmarry").val(obj.marry);
    $("#addgender").val(obj.year);
    $("#addmoney").val(obj.money);
    $("#addcity").val(obj.city);
    updataId = obj._id;
}


// 修改里面的增加按钮
function updatasenter() {
    $.ajax({
        type: 'get',
        url: '/updataData',
        data: {
            _id: updataId,
            name: $("#addsuer").val(),
            sex: $("#addsex").val(),
            marry: $("#addmarry").val(),
            year: $("#addgender").val(),
            money: $("#addmoney").val(),
            city: $("#addcity").val()
        },
        success: (data) => {
            content(curpage);
            $("#add_div").css({
                display: "none"
            });
        }
    })
}


//=============================================查询=======================================
function findContent() {
    isSearch = true;
    curpage = 1;
    content(curpage, $("#nameText").val(), $("#sexText").val());
}

// ===================================================查询返回=========================
function cleanContent() {
    isSearch = false;
    $("#nameText").val('')
    $("#sexText").val('');
    curpage = 1;
    content(curpage);
}


// 上一页函数
function upclick() {
    if (curpage - 1 >= 1) {
        if (isSearch) {
            content(--curpage, $("#nameText").val(), $("#sexText").val());
        } else {
            content(--curpage);
        }
    }
}
// 下一页函数
function nextclick() {
    if (curpage + 1 <= maxpage) {
        if (isSearch) {
            content(--curpage, $("#nameText").val(), $("#sexText").val());
        } else {
            content(++curpage);
        }
    }
}
// 修改按钮
$("#add_button").on('click', function () {
    isupdataB = false;
    $("#add_div").css({
        display: "block"
    });
});
$("#cancel").on('click', function () {
    $("#add_div").css({
        display: "none"
    });
})


