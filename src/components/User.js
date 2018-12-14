import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';


export class User extends React.Component {
    renderTemplate = () => {
        const { name, error, isFetching, isFetchingFriends, friends } = this.props

        if (error) {
            return <p>Во время запроса произошла ошибка, обновите страницу</p>
        }

        if (isFetching) {
            return <p>Загружаю...</p>
        }

        if (name) {
            return (
                <div>
                    <p>Привет, {name}!</p>
                    <Button variant="outlined" color="secondary" onClick={this.props.handleLogOut} >
                        Выход
                    </Button>
                    {
                        (()=>{
                            if(isFetchingFriends){
                                return <p>Загружаю список твоих друзей</p>
                            }else return (
                                <div>
                                    <p>Вот пять твоих друзей:</p>
                                    {
                                        friends.map(item=>{
                                            return(

                                                    <Button key ={item.id} className={"friend"} variant="contained" color="primary" href={"http://vk.com/id"+item.id}  >
                                                        {item.first_name+" "+item.last_name}
                                                    </Button>


                                            )
                                        })
                                    }
                                </div>
                            )
                        })()
                    }
                </div>


         )
        } else {

            return (
                <div>
                    <p>Привет, Webim! Я - тестовое задание от Михаила</p>
                    <p><a href={"http://spb.hh.ru/resume/35a4985fff0436d6360039ed1f377651424247"}>Резюме</a></p>
                    <p>Авторизация в ВК:</p>
                    <Button variant="outlined" color="primary" onClick={this.props.handleLogin} >
                            Авторизоваться
                    </Button>
                </div>
            )
        }
    }
    render() {
        return <div className="ib user">{this.renderTemplate()}</div>
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired,
    friends:PropTypes.array.isRequired,
}