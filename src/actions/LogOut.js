import Cookies from "universal-cookie";

export const LOGOUT = 'LOGOUT'

export function UserLogout() {
    return function(dispatch) {
        //eslint-disable-next-line no-undef
        //VK.Auth.logout();

        //удаляем  в куки.
         const cookie = new Cookies();
        //

         cookie.set('token', '',{ path: 'https://warm-coast-80714.herokuapp.com' });
        // cookie.set('friends', '',{ path: 'https://warm-coast-80714.herokuapp.com' });


        window.location = '/'


    }
}