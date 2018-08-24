function random(start,end){
    if(!end){
        return parseInt(Math.random() * (start + 1));
    }else{
        return parseInt(Math.random() * (end - start + 1) + start);
    }
}

//保存数据到localStorage
function save(name,value){
    if(typeof value == "object"){
        localStorage[name] = JSON.stringify(value);
    }else{
        localStorage[name] = value;
    }
   
}
//从localStorage获取数据
function get(name,defaultValue){
    let value;
    if(!localStorage[name]){
        value = defaultValue;
    }else{       
        value = JSON.parse(localStorage[name]);
    }
    return value;
}