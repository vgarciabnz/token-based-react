import React from "react";
import {Button} from '@dhis2-ui/button'
import AppModel from "../model/AppModel";

class AppMenu extends React.Component {

    static visualizerApp = new AppModel("visualization", "Visualizer app", null);
    static dataEntryApp = new AppModel("dataEntry", "Data Entry app", null);

    // eslint-disable-next-line no-use-before-define
    appList = [AppMenu.visualizerApp, AppMenu.dataEntryApp];

    launchApp = async ({value, name}, event) => {
        console.log(value);
        const app = this.appList.find(a => a.id === value);
        this.props.onAppSelected(app)
    }

    render() {
        return (
            <div className="apps">
                <h2>App menu:</h2>
                <Button name={AppMenu.dataEntryApp.id}
                        className="appButton"
                        primary
                        value={AppMenu.dataEntryApp.id}
                        onClick={this.launchApp}>
                    {AppMenu.dataEntryApp.name}
                </Button>
                <Button name={AppMenu.visualizerApp.id}
                        className="appButton"
                        primary
                        value={AppMenu.visualizerApp.id}
                        onClick={this.launchApp}>
                    {AppMenu.visualizerApp.name}
                </Button>
            </div>
        );
    }
}

export default AppMenu;
