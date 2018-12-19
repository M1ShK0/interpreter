import {GET_FRIENDS_FAIL, GET_FRIENDS_REQUEST, LOGIN_SUCCESS} from './UserAction'
import {GET_FRIENDS_SUCCESS} from "./UserAction";
import   Cookies  from 'universal-cookie';
import $ from 'jquery';

export function UserGetStatus() {
    return function(dispatch) {


        let href = window.location.href;
        let GETtoken = href.substr(href.indexOf('#')+1,href.indexOf('&') -href.indexOf('#')-1).split('=')[1];
        console.log(GETtoken);
        let cookie = new Cookies();
        if(GETtoken && GETtoken.length > 0 ) {



            const current = new Date();
            const _next = new Date();
            _next.setFullYear(current.getFullYear() + 100);
            cookie.set('token', GETtoken, {path: 'https://warm-coast-80714.herokuapp.com', expires: _next});
            window.location='/';
        }

           let tok =  cookie.get('token');
              if(tok && tok.length>0){
                  $.ajax({
                      url: 'https://api.vk.com/method/users.get?access_token='+tok+'&v=5.52',
                      method:'GET',
                      dataType:'JSONP',
                      success:function(r){

                          let username =r.response[0].first_name+ " " + r.response[0].last_name;
                          dispatch({

                              type: LOGIN_SUCCESS,
                              payload:username,
                          })

                          dispatch({
                              type: GET_FRIENDS_REQUEST,
                              payload: [],
                          })

                          $.ajax({
                              url: 'https://api.vk.com/method/friends.search?count=5&access_token='+tok+'&v=5.52',
                              method:'GET',
                              dataType:'JSONP',
                              success:function(r){


                                  console.log(1, r);
                                  dispatch({
                                      type: GET_FRIENDS_SUCCESS,
                                      payload: r.response.items,
                                  })








                              }
                          })
                      }
                  })
              }








        // const cookie = new Cookies();
        //
        // let username = cookie.get('name',{ path: 'https://warm-coast-80714.herokuapp.com' });
        // let friends = cookie.get('friends',{ path: 'https://warm-coast-80714.herokuapp.com' });
        // if( username!=='' && username ){
        //     dispatch({
        //         type: LOGIN_SUCCESS,
        //         payload: username,
        //     })
        //
        //     dispatch({
        //         type: GET_FRIENDS_SUCCESS,
        //         payload: friends,
        //     })
        // }
        /*
        window.VK.Auth.getLoginStatus(
            r => {
                if (r.session) {
                    window.VK.Api.call('users.get', {user_ids: +r.session.mid, v:"5.73"}, function(r) {
                        if(r.response) {
                            let username =r.response[0].first_name+ " " + r.response[0].last_name;
                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: username,
                            })
                            //запрос списка друзей
                            dispatch({
                                type: GET_FRIENDS_REQUEST,
                                payload: [],
                            })



                            //eslint-disable-next-line no-undef
                            VK.Api.call(
                                'friends.get',
                                {extended: 1, count: 5, offset: 0, v: '5.80'},
                                r => {

                                    if(r.response) {

                                        console.log(1, r);
                                        window.VK.Api.call('users.get', {user_ids: r.response.items, v: "5.73"}, function (r) {
                                            if (r.response) {
                                                console.log(2, r.response);
                                                //Выводим список друзей
                                                dispatch({
                                                    type: GET_FRIENDS_SUCCESS,
                                                    payload: r.response,
                                                })
                                            }
                                        });



                                    }else {
                                        //список друзей не получен
                                        dispatch({
                                            type: GET_FRIENDS_FAIL,
                                            error: true,
                                            payload: new Error('Невозможно получить список друзей'),
                                        })

                                    }



                                }
                            )
                        }
                    });

                }
            }

        );

     */
    }
}