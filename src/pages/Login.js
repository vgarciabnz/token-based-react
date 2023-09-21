import React from "react";
import {InputField} from '@dhis2-ui/input'
import {Button} from '@dhis2-ui/button'
import {Api} from "../api/Api";

class Login extends React.Component {

    state = {
        url: "http://localhost:8080",
        username: "",
        password: ""
    };

    changeUrl = ({ name, value }, event) => {
        this.setState({url: value});
    }

    changeUsername = ({ name, value }, event) => {
        this.setState({username: value});
    }

    changePassword = ({ name, value }, event) => {
        this.setState({password: value});
    }

    login = async ({ value, name }, event) =>  {
        Api.url = this.state.url;
        const token = Api.login(this.state.username, this.state.password);
        this.props.onToken(token);
    }

    render() {
        return (
            <div className="login">
                <InputField label="Url" name="url" value={this.state.url} onChange={this.changeUrl}></InputField>
                <InputField label="Username" name="username" value={this.state.username} onChange={this.changeUsername}></InputField>
                <InputField label="Password" name="password" value={this.state.password} onChange={this.changePassword}></InputField>

                <Button name="login"
                        primary
                        value="default"
                        onClick={this.login}>
                    Login
                </Button>
            </div>
        );
    }
}

export default Login;
