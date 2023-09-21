import React from "react";
import {InputField} from '@dhis2-ui/input'
import {Button} from '@dhis2-ui/button'
import {Api} from "../api/Api";
import {Card} from '@dhis2-ui/card'

class Login extends React.Component {

    state = {
        url: "http://localhost:8080",
        username: "username",
        password: "password"
    };

    changeUrl = ({name, value}, event) => {
        this.setState({url: value});
    }

    changeUsername = ({name, value}, event) => {
        this.setState({username: value});
    }

    changePassword = ({name, value}, event) => {
        this.setState({password: value});
    }

    login = async ({value, name}, event) => {
        Api.url = this.state.url;
        const token = Api.login(this.state.username, this.state.password);
        this.props.onToken(token);
    }

    render() {
        return (
            <div className="login">
                <Card>
                    <InputField label="Url" name="url" value={this.state.url}
                                onChange={this.changeUrl}></InputField>

                    <InputField label="Username" name="username" value={this.state.username}
                                onChange={this.changeUsername}></InputField>

                    <InputField label="Password" name="password" value={this.state.password} type="password"
                                onChange={this.changePassword}></InputField>

                    <Button name="login"
                            className="loginButton"
                            primary
                            value="default"
                            onClick={this.login}>
                        Login
                    </Button>
                </Card>
            </div>
        );
    }
}

export default Login;
