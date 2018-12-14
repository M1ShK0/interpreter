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
function find_params(perem){
    for(let i=0;i<params.length;i++){
        if(params[i].name == perem) return params[i];
    }
    return null;
}
function start(trg){
    $('#result').val(v(trg.target.value));
}

function v(code){
    params=[];
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
        case "print":{
            if(com.length ==2) {
                let perem = find_params(com[1]);
                if (perem != null)
                    return _res(true, com[1] + " = " + perem.value);
                else
                    return _res(false, "Переменная не надена");
            }
            else{
                return _res(false,"Переменная не найдена")
            }
        }
        default:{
            if(find_params(com[0])!=null){
                var param =   find_params(com[0]);
                if(com[1] == "="){
                    let value = ras(com.slice(2));
                    param.value = value;
                    if(value.status) {
                        param.value = value.res;
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

function ras(data){
    let _data =data.map((el)=>{return el.trim()}).join('');
    if(bracket(_data))
        return _res(true,_ras(_data));
    else
        return _res(false,"Ошибка в скобках");
}


function _ras(data){
        for(let h = 0;h<arr_command.length;h++)  data = find_com(data,arr_command[h]);
        try {
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
        newdata +=_rasc(func,incom);
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
     "asin(",
     "acos(",
     "atan(",
     "cosh(",
     "sinh(",
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
        case "asin(":{
            return Math.asin(+incom);
        }
        case "acos(":{
            return Math.acos(+incom);
        }
        case "atan(":{
            return Math.atan(+incom);
        }
        case "cosh(":{
            return Math.cosh(+incom);
        }
        case "sinh(":{
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