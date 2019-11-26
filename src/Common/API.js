/**
 * Common file for all APIs
 */
export default class API {

    constructor() {
        this.apiURL = "http://localhost:3001"
    }

    fetchAPI(url, method="GET", body={}) {
        if(method === "GET") {
            return (
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
            )
        } else if(method === "POST") {
            return (
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
            )
        }
    }

    // Registration API
    register( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/register`, "POST", payload);
    }

    // Login API
    login( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/auth/login`, "POST", payload);
    }

    // Add new Space
    addSpace( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/space/add`, "POST", payload);
    }

    // Get All Spaces APIs
    getSpaces() {
        return this.fetchAPI (`${this.apiURL}/api/space/get`, "GET");
    }

    // Get Single Space
    getSpaceById( spaceId ) {
        return this.fetchAPI (`${this.apiURL}/api/space/${spaceId}`, "GET");
    }

    // Save Application of User
    saveApplication( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/application/add`, "POST", payload);
    }

}