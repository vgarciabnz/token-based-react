import React from "react";
import {Api} from "../api/Api";
import {InputField} from '@dhis2-ui/input'
import {Button} from '@dhis2-ui/button';
import {Menu, MenuDivider, MenuItem} from '@dhis2-ui/menu';
import {NoticeBox} from '@dhis2-ui/notice-box'

import DataValue from "../model/DataValue";

class AppView extends React.Component {

    state = {
        newValue: null,
        responseCode: null,
        dataValues: []
    }


    valueChanged = ({name, value}, event) => {
        this.setState({newValue: value});
    }

    postValue = () => {
        const newValue = new DataValue("dataValueUid", this.state.newValue);

        Api.addDataValue(this.props.app.token, newValue)
            .then(res => this.setState({responseCode: res.status}))
            .catch(res => this.setState({responseCode: 500}))
            .finally(() => this.props.onAddDataValue(this.props.app.token));
    }

    getDataValues = () => {
        return this.props.dataValues.reverse().map(dataValue => {
            return (
                <span>
                    <MenuItem label={dataValue.value}></MenuItem>
                    <MenuDivider/>
                </span>
            )
        });
    }

    getResponse = () => {
        if (this.state.responseCode == null) {
            return <span></span>
        } else if (this.state.responseCode === 200 || this.state.responseCode === 204) {
            return <NoticeBox valid title="Data value added successfully"></NoticeBox>
        } else {
            return <NoticeBox error title="Error updating value"></NoticeBox>
        }
    }

    render() {
        return (
            <div className="flex">
                <div className="appView">
                    <div className={this.props.app.id}>
                        <h1>{this.props.app.name}</h1>

                        <div>
                            <div className="dataValueInput">
                                <InputField className="valueInput"
                                            name="Value"
                                            value={this.state.newValue}
                                            onChange={this.valueChanged}>
                                </InputField>

                                <Button name="postValue"
                                        primary
                                        value="postValue"
                                        onClick={this.postValue}>
                                    Add value
                                </Button>

                                <div className="noticebox">{this.getResponse()}</div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="dataValueList">
                    <h3>Data values:</h3>
                    <Menu>
                        {this.getDataValues()}
                    </Menu>
                </div>
            </div>
        );
    }
}

export default AppView;
