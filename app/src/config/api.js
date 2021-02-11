export const API_KEY = "YOUR KEY IS HERE";	
export const API_URL = "https://api.slstice.com";


export const ApiParams = Object.freeze({
    OFFSET: 'OFFSET',
    LIMIT: 'LIMIT',
    MEDIA_ID: 'MEDIA_ID',
    USER_NAME: 'USER_NAME'
});

export const API_POSTS_URL =
    `${API_URL}/mock/posts?offset=${ApiParams.OFFSET}&limit=${ApiParams.LIMIT}&api_key=${API_KEY}`;

export const API_MEDIA_URL = 
    `${API_URL}/mock/medias/${ApiParams.MEDIA_ID}?api_key=${API_KEY}`;

export const API_USER_URL = 
    `${API_URL}/mock/users/${ApiParams.USER_NAME}?api_key=${API_KEY}`;
    
