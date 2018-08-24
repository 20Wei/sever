

$(() => {
    $('#people_table').datagrid({
        url: '/getTableData',
        method: "get",
        pagination: true,
        columns: [[
            { field: 'name', title: '姓名', width: 100 },
            { field: 'sex', title: '性别', width: 100 },
            { field: 'year', title: '年龄', width: 100 },
            { field: 'marry', title: '婚否', width: 100 },
            { field: 'money', title: '工资', width: 100 },
            { field: 'city', title: '籍贯', width: 100 },

        ]],
        fitColumns: true,
        striped: true,
        rownumbers: true,
        toolbar: [{
            iconCls: 'icon-add',
            text: "增加",
            handler: adduser
        }, '-', {
            iconCls: 'icon-remove',
            text: "删除",
            handler: updatauser
        }, '-', {
            iconCls: 'icon-edit',
            text: "修改",
            handler: removeuser
        }, '-', {
            iconCls: 'icon-search',
            text: "搜索",
            handler: searchuser
        }]

    });



});

// 增加
function adduser() {
    $.get('/addData', {

    }, (data) => {
        $('#dd').dialog({
            title: '添加信息',
            width: 400,
            height: 400,
            // closed: false,
            // cache: false,
            // href: 'get_content.php',
            modal: true
        });
        $('#dd').dialog('');

    });
};

// 修改
function updatauser() {

}

// 删除
function removeuser() {
    let _id = $('#people_table').datagrid('getSelected');
    $.get('/delData', { _id }, () => {

    });

}

// 搜索

function searchuser() {

}








// Session添加文字

$.get('/getSession', (data) => {
    if (data == '') {
        $("#username").html(`<a href = "./login.html">请点击登录进入</a>`);
    } else {
        $("#username").html(`欢迎:${data}来到我们美丽的泰国`);
    }
});