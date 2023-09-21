import DataValue from "../model/DataValue";

export class Api {

    static url = null;
    static loginPath = "/login";
    static appTokenPath = "/token?appId=";
    static dataPath = "/dataValues";

    static async login(username, password) {
        const path = Api.url + Api.loginPath;
        //return await fetch(path);

        console.log("Mocking " + path);
        return "WERIUJASDFLMBWERUISDFJKW";
    }

    static async appToken(masterToken, appId) {
        const path = Api.url + Api.appTokenPath + appId;
        //return await fetch(path);

        console.log("Mocking " + path);
        return "tokenfor" + appId;
    }

    static async getDataValues(appToken) {
        const path = Api.url + Api.dataPath;
        //return await fetch(path);

        console.log("Mocking " + path);
        return [
            new DataValue(50),
            new DataValue(60)
        ];
    }

    static async addDataValue(appToken, dataValue) {
        const path = Api.url + Api.dataPath;
        await fetch(path, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataValue), // body data type must match "Content-Type" header
        });
    }
}
