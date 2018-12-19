import   Cookies  from 'universal-cookie';


export const GET_FRIENDS_REQUEST = 'GET_FRIENDS_REQUEST'
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS'
export const GET_FRIENDS_FAIL = 'GET_FRIENDS_FAIL'




export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export function handleLogin() {
    return function(dispatch) {




        dispatch({
            type: LOGIN_REQUEST,
        })
        let link ='https://oauth.vk.com/authorize?client_id=6727909&display=page&redirect_uri=https://warm-coast-80714.herokuapp.com/&scope=friends,offline&response_type=token&v=5.52'
        window.location = link;




        // //Сообщение, о начале аутентификации
        // dispatch({
        //     type: LOGIN_REQUEST,
        // })
        //
        //     //oauth
        // //eslint-disable-next-line no-undef
        // VK.Auth.login(r => {
        //     //если сессия была создана
        //     if (r.session) {
        //         let username = r.session.user.first_name + " " + r.session.user.last_name;
        //         // пользователь успешно залогинился, выводим его имя
        //         dispatch({
        //             type: LOGIN_SUCCESS,
        //             payload: username,
        //         })
        //
        //         //запрос списка друзей
        //         dispatch({
        //             type: GET_FRIENDS_REQUEST,
        //             payload: [],
        //         })
        //
        //         //eslint-disable-next-line no-undef
        //         VK.Api.call(
        //             'friends.get',
        //             {extended: 1, count: 5, offset: 0, v: '5.80'},
        //             r => {
        //
        //                 if(r.response) {
        //
        //                     console.log(1, r);
        //                     window.VK.Api.call('users.get', {user_ids: r.response.items, v: "5.73"}, function (r) {
        //                         if (r.response) {
        //                             console.log(2, r.response);
        //                             //Выводим список друзей
        //                             dispatch({
        //                                 type: GET_FRIENDS_SUCCESS,
        //                                 payload: r.response,
        //                             })
        //
        //                             //сохраняем в куки.
        //                             const cookie = new Cookies();
        //
        //                             const current = new Date();
        //                             const _next = new Date();
        //                             _next.setFullYear(current.getFullYear() + 100);
        //
        //                             cookie.set('name', username,{ path: 'https://warm-coast-80714.herokuapp.com' ,expires: _next });
        //                             cookie.set('friends', JSON.stringify(r.response),{ path: 'https://warm-coast-80714.herokuapp.com', expires: _next});
        //
        //                         }
        //                     });
        //
        //
        //
        //                 }else {
        //                     //список друзей не получен
        //                     dispatch({
        //                         type: GET_FRIENDS_FAIL,
        //                         error: true,
        //                         payload: new Error('Невозможно получить список друзей'),
        //                     })
        //
        //                 }
        //
        //
        //
        //             }
        //         )
        //
        //     } else {
        //         //если сессия не была создана, обрабатываем ошибку
        //         dispatch({
        //             type: LOGIN_FAIL,
        //             error: true,
        //             payload: new Error('Ошибка авторизации'),
        //         })
        //     }
        // }, 2)



    }
}