export const Config = {
    server : {
        url: (process.env.NODE_ENV === 'production') ? "https://myserver.com" : "http://localhost:3001"
    }
};