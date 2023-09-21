import React from "react";
import {Button} from '@dhis2-ui/button'
import AppModel from "../model/AppModel";

class AppMenu extends React.Component {

    visualizerApp = new AppModel("visualizer", "Visualizer", null);
    dataEntryApp = new AppModel("dataentry", "Data Entry", null);

    appList = [this.visualizerApp, this.dataEntryApp];

    launchApp = async ({value, name}, event) => {
        console.log(value);
        const app = this.appList.find(a => a.id === value);
        this.props.onAppSelected(app)
    }

    render() {
        return (
            <div className="apps">
                <Button name={this.dataEntryApp.id}
                        primary
                        value={this.dataEntryApp.id}
                        onClick={this.launchApp}>
                    {this.dataEntryApp.name}
                </Button>
                <Button name={this.visualizerApp.id}
                        primary
                        value={this.visualizerApp.id}
                        onClick={this.launchApp}>
                    {this.visualizerApp.name}
                </Button>
            </div>
        );
    }
}

export default AppMenu;
