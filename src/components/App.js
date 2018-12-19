import React, { Component } from 'react'
import UserContainer from '../containers/UserContainer'


class App extends Component {
    render() {
        return (
            <div className="app">
                <UserContainer />
            </div>
        )
    }
}

export default App