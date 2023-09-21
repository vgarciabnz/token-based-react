import './App.css';
import Login from "./pages/Login";
import React from "react";
import AppMenu from "./pages/AppMenu";
import AppView from "./pages/AppView";
import {Api} from "./api/Api";

class App extends React.Component {

    state = {
        masterToken: null,
        loadedApp: null,
        dataValues: []
    }

    getMasterToken = (token) => {
        this.setState({masterToken: token});
    }

    loadApp = async (app) => {
        app.token = await Api.appToken(this.state.masterToken, app.id);
        this.setState({loadedApp: app});
        this.updateDataValues(app.token);
    }

    updateDataValues = async (token) => {
        const dataValues = await Api.getDataValues(token);
        this.setState({dataValues: dataValues})
    }

    getLoadedApp() {
        if (this.state.loadedApp != null) {
            return <AppView key={this.state.loadedApp.id}
                            className={this.state.loadedApp.id}
                            app={this.state.loadedApp}
                            dataValues={this.state.dataValues}
                            onAddDataValue={this.updateDataValues}></AppView>
        } else {
            return <span></span>
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.masterToken == null ?
                    <Login onToken={this.getMasterToken}></Login> :
                    <AppMenu onAppSelected={this.loadApp}></AppMenu>
                }
                {this.getLoadedApp()}
            </div>
        );
    }
}

export default App;
