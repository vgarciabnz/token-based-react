import React from "react";
import {Api} from "../api/Api";
import {InputField} from '@dhis2-ui/input'
import {Button} from '@dhis2-ui/button'
import DataValue from "../model/DataValue";

class AppView extends React.Component {

    state = {
        newValue: null,
        dataValues: []
    }

    updateDataValues = async () => {
        const dataValues = await Api.getDataValues(this.props.app.id);
        this.setState({dataValues: dataValues})
    }

    valueChanged = ({ name, value }, event) => {
        this.setState({newValue: value});
    }

    postValue = () => {
        const newValue = new DataValue(this.state.newValue);

        Api.addDataValue(this.props.app.token, newValue);
    }

    render() {
        //this.updateDataValues();
        return (
            <div className="appView">
                <h1>Hello {this.props.app.name}</h1>

                <InputField label="value" name="Value" value={this.state.newValue} onChange={this.valueChanged}></InputField>

                <Button name="postValue"
                        primary
                        value="postValue"
                        onClick={this.postValue}>
                    Add value
                </Button>
            </div>
        );
    }
}

export default AppView;
