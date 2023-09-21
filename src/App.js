import './App.css';
import Login from "./pages/Login";
import React from "react";
import AppMenu from "./pages/AppMenu";
import AppView from "./pages/AppView";
import {Api} from "./api/Api";

class App extends React.Component {

    state = {
        masterToken: null,
        loadedApp: null
    }

    getMasterToken = (token) => {
        this.setState({masterToken: token});
    }

    loadApp = async (app) => {
        app.token = await Api.appToken(this.state.masterToken, app.id);
        this.setState({loadedApp: app});
    }

    render() {
        return (
            <div className="App">
                {this.state.masterToken == null ?
                    <Login onToken={this.getMasterToken}></Login> :
                    <AppMenu onAppSelected={this.loadApp}></AppMenu>
                }
                {this.state.loadedApp != null ?
                    <AppView app={this.state.loadedApp}></AppView> :
                    <span>No app selected</span>
                }
            </div>
        );
    }
}

export default App;
