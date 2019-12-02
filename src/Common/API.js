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
        } else if(method === "PUT") {
            return (
                fetch(url, {
                    method: 'PUT',
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

    /**
     * Get Current User Details
     */
    get isLoggedIn() {
        return localStorage.getItem('login');
    }
    get currentUserId() {
        return localStorage.getItem('current_user_id');
    }

    
    // Registration API
    register( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/register`, "POST", payload);
    }

    // Login API
    login( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/auth/login`, "POST", payload);
    }

    // Fetch all users data
    getUsers() {
        return this.fetchAPI (`${this.apiURL}/api/users/all`, "GET");
    }

    // Fetch single user data
    getCurrentUserData() {
        if( this.currentUserId ) {
            return this.fetchAPI (`${this.apiURL}/api/users/id/${this.currentUserId}`, "GET");
        }
        return false;
    }

    // Add new Space
    addSpace( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/space/add`, "POST", payload);
    }

    // Get All Spaces APIs
    getSpaces() {
        return this.fetchAPI (`${this.apiURL}/api/space/all`, "GET");
    }

    // Get Single Space
    getSpaceById( spaceId ) {
        return this.fetchAPI (`${this.apiURL}/api/space/${spaceId}`, "GET");
    }

    // Search my spaces
    searchMySpaces( term ) {
        const payload = { user_id: this.currentUserId, term }
        return this.fetchAPI (`${this.apiURL}/api/search/spaces`, "POST", payload)
    }

    // Search my applicants
    searchMyApplicants( term ) {
        const fullname = term.split(' ');
        const payload = {
            user_id: this.currentUserId,
            firstname: fullname[0],
            lastname: fullname[1] || ''
        }
        return this.fetchAPI (`${this.apiURL}/api/search/applicants`, "POST", payload)
    }
    
    // Get current user Spaces
    getMySpaces( spaceId='' ) {
        if( this.currentUserId ) {
            return (spaceId === '') ? (
                this.fetchAPI (`${this.apiURL}/api/space/my/all`, "POST", {user_id: this.currentUserId})
            ) : (
                this.fetchAPI (`${this.apiURL}/api/space/my/${spaceId}`, "POST", {user_id: this.currentUserId})
            );
        }
    }

    // Update space views
    getSpaceWithUpdateViews( spaceId ) {
        console.log('here in count');
        return this.fetchAPI (`${this.apiURL}/api/space/update/views/${spaceId}`, "PUT");
    }

    // Save Application of User
    saveApplication( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/application/add`, "POST", payload);
    }

    // Get current user applicants
    getMyApplicants() {
        if (this.currentUserId) {
            return this.fetchAPI (`${this.apiURL}/api/application/my/all`, "POST", {user_id: this.currentUserId});
        }
    }

    // Get current user applicants by space id
    getMyApplicantsBySpaceId( spaceId ) {
        return this.fetchAPI (`${this.apiURL}/api/application/my/space/${spaceId}`, "POST", {user_id: this.currentUserId});
    }

}