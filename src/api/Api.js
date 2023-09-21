export class Api {

    static url = null;
    static loginPath = "/login";

    static appTokenPath(appId) {
        return Api.url + "/token?id=" + appId
    }

    static dataPath(token) {
        return Api.url + "/dataValues?token=" + token;
    }

    static headers(token) {
        return {
            "Content-Type": "application/json",
            "Authentication": 'Bearer ' + token
        }
    }

    static async login(username, password) {
        const path = Api.url + Api.loginPath;
        const data = {
            name: username,
            pwd: password
        }
        const result = await fetch(path, {
            method: "POST",
            headers: {
                "Authorization": 'Basic ' + btoa(username + ":" + password),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const json = await result.json();
        return json.jwtToken;
    }

    static async appToken(masterToken, appId) {
        const path = Api.appTokenPath(appId);
        const response = await fetch(path, {headers: Api.headers(masterToken)});
        const json = await response.json();
        return json.jwtToken;
    }

    static async getDataValues(appToken) {
        const path = Api.dataPath(appToken);
        const response = await fetch(path, {headers: Api.headers(appToken)});
        return await response.json();
   }

    static async addDataValue(appToken, dataValue) {
        const path = Api.dataPath(appToken)
        return await fetch(path, {
            method: "POST",
            mode: "cors",
            headers: Api.headers(appToken),
            body: JSON.stringify(dataValue)
        });
    }
}
