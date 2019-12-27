/**
 * Common file for all APIs
 */
import { Config } from './Config';

export default class API {

    constructor() {
        this.apiURL = Config.server.url;
        this.spacePath = '/images/space/';
        this.avatarPath = '/images/avatar/';
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }

    fetchAPI(url, method="GET", body={}, headers=this.headers) {
        if(method === "GET") {
            return (
                fetch(url, {
                    method: 'GET',
                    headers
                })
            )
        } else if(method === "PUT") {
            return (
                fetch(url, {
                    method: 'PUT',
                    headers,
                    body
                })
            )
        } else if(method === "POST") {
            return (
                fetch(url, {
                    method: 'POST',
                    headers,
                    body
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

    // Get images URLs
    get spaceImageUrl() {
        return `${this.apiURL}${this.spacePath}`;
    }
    get avatarUrl() {
        return `${this.apiURL}${this.avatarPath}`;
    }

    // Get Gallery for space
    getSpaceGallery(gallery) {
        if(typeof gallery === 'undefined' || gallery === '') {
            return [];
        }
        const images = JSON.parse(gallery);
        return images.map(img => this.spaceImageUrl + img);
    }
    
    // Registration API
    register( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/register`, "POST", JSON.stringify(payload));
    }

    // Login API
    login( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/auth/login`, "POST", JSON.stringify(payload));
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

    // Get my profile info
    myProfile() {
        return this.fetchAPI (`${this.apiURL}/api/users/profile`, "POST", JSON.stringify({userId: this.currentUserId}));
    }

    // Upload user avatar
    uploadAvatar( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/users/upload/${this.currentUserId}/avatar`, "POST", payload, {});
    }

    // Update user info
    updateUserInfo( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/users/update/info/${this.currentUserId}`, "PUT", JSON.stringify(payload));
    }

    // Update user info
    updatePassword( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/users/update/password/${this.currentUserId}`, "PUT", JSON.stringify(payload));
    }

    // Add new Space
    addSpace( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/space/add`, "POST", JSON.stringify(payload));
    }

    // Upload space images
    uploadSpaceImage( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/space/upload`, "POST", payload, {});
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
        return this.fetchAPI (`${this.apiURL}/api/search/spaces`, "POST", JSON.stringify(payload))
    }

    // Search my applicants
    searchMyApplicants( term ) {
        const payload = {
            user_id: this.currentUserId,
            fullname: term
        }
        return this.fetchAPI (`${this.apiURL}/api/search/applicants`, "POST", JSON.stringify(payload))
    }
    
    // Get current user Spaces
    getMySpaces( spaceId='' ) {
        if( this.currentUserId ) {
            return (spaceId === '') ? (
                this.fetchAPI (`${this.apiURL}/api/space/my/all`, "POST", JSON.stringify({user_id: this.currentUserId}))
            ) : (
                this.fetchAPI (`${this.apiURL}/api/space/my/${spaceId}`, "POST", JSON.stringify({user_id: this.currentUserId}))
            );
        }
    }

    // Update space changes
    updateSpaceById( spaceId, payload ) {
        console.log('pay', payload);
        return this.fetchAPI (`${this.apiURL}/api/space/my/update/${spaceId}`, "PUT", JSON.stringify(payload));
    }

    // Update space views
    getSpaceWithUpdateViews( spaceId ) {
        return this.fetchAPI (`${this.apiURL}/api/space/update/views/${spaceId}`, "PUT", JSON.stringify({}));
    }

    // Save Application of User
    saveApplication( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/application/add`, "POST", JSON.stringify(payload));
    }

    // Get current user applicants
    getMyApplicants() {
        if (this.currentUserId) {
            return this.fetchAPI (`${this.apiURL}/api/application/my/all`, "POST", JSON.stringify({user_id: this.currentUserId}));
        }
    }

    // Get current user applicants by space id
    getMyApplicantsBySpaceId( spaceId ) {
        return this.fetchAPI (`${this.apiURL}/api/application/my/space/${spaceId}`, "POST", JSON.stringify({user_id: this.currentUserId}));
    }

    /**
     * Plaid APIs
     */
    getPlaid() {
        return this.fetchAPI (`${this.apiURL}/api/plaid/`, "GET");
    }

    getPlaidAccessToken( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/plaid/get_access_token`, "POST", JSON.stringify(payload));
    }

    // Stripe ACH Payment using Plaid Link
    stripePayment( payload ) {
        return this.fetchAPI (`${this.apiURL}/api/plaid/stripe/payment`, "POST", JSON.stringify(payload));
    }

    // Get Stripe transactions using pay id
    getStripeTransaction( payId ) {
        return this.fetchAPI (`${this.apiURL}/api/plaid/stripe/transaction/${payId}`, "GET");
    }

}