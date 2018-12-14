import React from 'react'
import { connect } from 'react-redux'
import { User } from '../components/User'
import TextField from '@material-ui/core/TextField';
import { handleLogin } from '../actions/UserAction'
import {UserGetStatus} from "../actions/UserGetStatus";
import {UserLogout} from "../actions/LogOut";
import $ from "jquery";
class UserContainer extends React.Component {

    constructor(props){
        super(props);
        // let {UserGetStatus} = props;
        //
        // console.log(123);
        // window.VK.Api.call('users.get', {user_ids: 84686388, v:"5.85"}, function(r) {
        //
        //     if(r.response) {console.log(222, r.response)} else {console.log(123,r)}}, (e)=>{console.log(e)});
        //
        //
        // window.VK.Api.call(
        //     'friends.get',
        //     {extended: 1, count: 5, offset: 0, v: '5.80'},
        //     r => {
        //
        //         if(r.response) {console.log(333, r.response)}});
        //
        //
        // UserGetStatus();
    }


    render() {
        const { user, handleLogin,UserLogout } = this.props

        return (
            <div>
                <TextField
                    id = "code"
                    label="Code"
                    variant="outlined"
                    multiline
                    rows="20"
                    style={{backgroundColor:'rgba(255,255,255,0.2)',margin:"20px",width:600}}
                    onChange={(target)=>start(target)}
                />
                <TextField

                    variant="outlined"
                    id="result"
                    multiline
                    rows="20"
                    style={{backgroundColor:'rgba(255,255,255,0.2)',margin:"20px",width:600}}
                />
                <div id="stack_graf">

                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: () => dispatch(handleLogin()),
        UserGetStatus: ()=>dispatch(UserGetStatus()),
        UserLogout: ()=>dispatch(UserLogout()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContainer)

let params=[];
let arrays=[];
function find_params(perem){
    for(let i=0;i<params.length;i++){
        if(params[i].name == perem) return params[i];
    }
    return null;
}
function find_arrays(perem){
    for(let i=0;i<arrays.length;i++){
        if(arrays[i].name == perem) return arrays[i];
    }
    return null;
}
function start(trg){
    $('#result').val(v(trg.target.value));
}

function v(code){
    params=[];
    arrays=[];
    window.chart.series.map((el)=>{return el.destroy()});
  let arrComand = code.split(';');
  let result ="";
  for(let i=0;i<arrComand.length;i++){
      let res = ob(arrComand[i]);

      if(res.status){
          result+=res.data+"\n";
      }else{
          return result+arrComand[i] +" - "+ res.error
      }
  }
  return result;
}

function  ob(commands) {
   // let res = {status:true,data:command};
    let  com = commands.trim().split(' ');
    switch (com[0]) {
        case "init":{
            if(com.length ==2)
            {
                init(com[1]);
                return _res(true,"Инициализация переменной "+com[1]);
            }
            else
                return _res(false,"Не могу создать переменную")
        }
        case "array_init":{
            if(com.length ==2)
            {
                array_init(com[1]);
                return _res(true,"Инициализация массива "+com[1]);
            }
            else
                return _res(false,"Не могу создать массив")
        }
        case "print":{
            if(com.length ==2) {
                let perem = find_params(com[1]);
                console.log(11,JSON.stringify(params));

                if (perem != null)
                    return _res(true, com[1] + " = " + perem.value);
                else
                    return _res(false, "Переменная не надена");
            }
            else{
                return _res(false,"Переменная не найдена")
            }
        }
        case "array_print":{
            if(com.length ==2) {
                let array = find_arrays(com[1]);
                console.log(11,JSON.stringify(array));
                if (array != null)
                    return _res(true, com[1] + " = " + JSON.stringify(array.value));
                else
                    return _res(false, "Массив не найден");
            }
            else{
                return _res(false,"Массив не найден")
            }
        }
        case "into_chart":{
            if(com.length ==2) {
                let array = find_arrays(com[1]);
                console.log(11,JSON.stringify(array));
                if (array != null) {
                    window.chart.addSeries({
                        name: array.name,
                        data: array.value,
                    });
                    return _res(true, com[1] + " done ");
                }
                else
                    return _res(false, "Массив не найден");
            }
            else{
                return _res(false,"Массив не найден")
            }
        }
        case "compare":{
            let perem = find_params(com[1]);
            if(com.length ==3) {
                let perem = find_params(com[1]);
                console.log(11,JSON.stringify(params));

                if (perem != null)
                {

                }
                else
                    return _res(false, "Переменная не надена");
            }
            else{
                return _res(false,"Переменная не найдена")
            }

            let perem2 = find_params(com[2]);
            if(com.length ==3) {

                console.log(11,JSON.stringify(params));

                if (perem2 != null)
                {

                }
                else
                return _res(false, "Переменная не надена");
            }
            else{
                return _res(false,"Переменная не найдена")
            }
            console.log(+com[1] )
            if(+perem.value > +perem2.value)
                return _res(true, com[1] + " > " + com[2]);
            if(+perem.value < +perem2.value)
                return _res(true, com[1] + " < " + com[2]);
            if(+perem.value == +perem2.value)
                return _res(true, com[1] + " = " + com[2]);
            return _res(true, "Я не знаю");

        }
        case "array_push":{
                let array = find_arrays(com[1]);
                console.log("array",JSON.stringify(array));
                if (array != null)
                {
                    if(array.value ==null){
                        array.value = [];
                    }
                    let value = ras(com.slice(2));
                    if(value.status) {
                        array.value.push(value.data);
                        return _res(true, com[1] + ".top = " + value.data);
                    }
                    else
                        return _res(false, value.error)
                }
                else
                    return _res(false, "Массив не найден");
        }

        case "array_map":{
            if(com.length!=2) {
                let array = find_arrays(com[1]);
                console.log("array", JSON.stringify(array));

                if (array != null) {
                    if (array.value == null) {
                        array.value = [];
                    }
                    
                    // let value = ras(com.slice(2));
                    // if (value.status) {
                    //     array.value.push(value.data);
                    //     return _res(true, com[1] + ".top = " + value.data);
                    // } else
                    //     return _res(false, value.error)
                } else
                    return _res(false, "Массив не найден");
            }else{
                return _res(false, "Массив не найден");
            }
        }

        case "array_concate":{


            let in_arr;
            if(com.length ==4) {

                in_arr = find_arrays(com[1]);
                console.log(11,JSON.stringify(in_arr));

                if (in_arr != null)
                {

                }
                else
                    return _res(false, "Массив не найден");
            }
            else{
                return _res(false,"Массив не найден")
            }

            let arr1;
            if(com.length ==4) {
                arr1 = find_arrays(com[2]);
                console.log(11,JSON.stringify(arr1));

                if (arr1 != null)
                {

                }
                else
                    return _res(false, "Массив не найден");
            }
            else{
                return _res(false,"Массив не найден")
            }

            let arr2;
            if(com.length ==4) {
                arr2 = find_arrays(com[3]);
                console.log(11,JSON.stringify(arr2));

                if (arr2 != null)
                {

                }
                else
                    return _res(false, "Массив не найден");
            }
            else{
                return _res(false,"Массив не найден")
            }
            try{
                var newarr= [];

                for(let i=0;i<arr1.value.length;i++){
                    newarr.push(arr1.value[i])
                }
                for(let i=0;i<arr2.value.length;i++){
                    newarr.push(arr2.value[i])
                }
                console.log('^^^^',  newarr,arr1.value,arr2.value );
                in_arr.value= newarr;
                return _res(true,in_arr.name+" = "+JSON.stringify(in_arr.value));
            }catch (e) {
                return _res(true, "Не получилось");
            }
        }
/*

            array_init arr1;
            array_init arr2;
            array_push arr1 123;
            array_push arr1 124;
            array_push arr1 125;
            array_push arr1 126;
            array_push arr2 124;
            array_push arr2 125;
            array_push arr2 126;
            array_push arr2 127;
            array_init arr3;
            array_concate arr3 arr1 arr2
            */
        default:{
            if(find_params(com[0])!=null){
                var param =   find_params(com[0]);


                if(com[1] == "="){
                    let value = ras(com.slice(2));
                    if(value.status) {
                        param.value = value.data;
                        return _res(true, com[0] + "=" + value.data);
                    }
                    else
                        return _res(false, value.error)
                }
            }
            if(com.length>0 && com[0]!="")
                return _res(false,"Неизвестная команда или переменная <<"+com[0]+">>");
            else
                return _res(true,"");
        }
    }

}

function _res(status,res){
    return status?{status:true,data:res}:{status:false,error:res};
}

function init(name){
    params.push({name:name,value:null});
}
function array_init(name){
    arrays.push({name:name,value:null});
}

function ras(data){
    let _data =data.map((el)=>{return el.trim()}).join('');
    if(bracket(_data))
        return _res(true,_ras(_data));
    else
        return _res(false,"Ошибка в скобках");
}


function _ras(data){
        for(let h = 0;h<arr_command.length;h++)
        {
            data = find_com(data,arr_command[h]);
        }
        try {

            for(let u =0;u<params.length;u++){
                if(data.indexOf(params[u].name)>=0){

                    for(let i=0;i<data.length;i++)
                    {
                        let idx = data.indexOf(params[u].name);
                        console.log(idx);
                        if(idx==-1) break;
                        if(
                            (
                                idx-1<0 ||
                                data[idx-1]=="+" ||
                                data[idx-1]=="-" ||
                                data[idx-1]=="/" ||
                                data[idx-1]=="*"
                            ) && (
                                idx+params[u].name.length > data.length-1||
                                data[idx+params[u].name.length]=="+" ||
                                data[idx+params[u].name.length]=="-" ||
                                data[idx+params[u].name.length]=="/" ||
                                data[idx+params[u].name.length]=="*"
                            )
                        ){
                           data = data.substring(0,idx) + params[u].value + data.substring(idx+params[u].name.length);
                        }
                    }
                }
            }
            return eval(data);
        }catch (e) {
            return "ОШИБКА";
        }
}

function find_com(data,func){
    let newdata="";
    var pos = 0;
    var end =0;
    let k=0;
    for(let y = 0; y < data.length;y++)
    {
        var foundPos = data.indexOf(func, pos);
        if(foundPos==-1) {
            newdata += data.substring(end);
            break;
        }
        k++;
        newdata += data.substring(end, foundPos);
        end = find_end(data,foundPos);
        // console.log(1,newdata);
        let comd_str = data.substring(foundPos, end);
        let incom= comd_str.substring(func.length,comd_str.length-1);
        incom =_ras(incom);
        newdata +="("+_rasc(func,incom)+")";
        pos = end + 1;
    }
    if(newdata == "") {
        newdata = data;
    }
    return newdata;

}

let arr_command = [
     "sin(",
     "cos(",
     "tan(",
     "log(",
     "asn(",
     "acs(",
     "atn(",
     "csh(",
     "snh(",
];
function _rasc(func,incom){
    switch (func) {
        case "sin(":{
            return Math.sin(+incom);
        }
        case "cos(":{
            return Math.cos(+incom);
        }
        case "tan(":{
            return Math.tan(+incom);
        }
        case "log(":{
            return Math.log(+incom);
        }
        case "asn(":{
            return Math.asin(+incom);
        }
        case "acs(":{
            return Math.acos(+incom);
        }
        case "atn(":{
            return Math.atan(+incom);
        }
        case "csh(":{
            return Math.cosh(+incom);
        }
        case "snh(":{
            return Math.sinh(+incom);
        }
    }
}
function find_end(data,foundPos){
    let cs = 1;
    for(let i=foundPos+4;i<data.length;i++){
        if(data[i]=='('){
            cs++;
        }
        if(data[i]==')'){
            cs--;
        }
        if(cs == 0) return i+1;
    }
}
function bracket(str) {
    var count = 0;
    for (var i = 0; i <= str.length; i++) {
        if (str[i] == "(") {
            count++;
        } else if (str[i] == ")") {
            count--;
            if(count<0) return false;
        }
    }
    if (count == 0) {
        return true;
    } else {
        return false;
    }
}