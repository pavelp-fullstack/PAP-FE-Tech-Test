export const UserCache = {
    data: new Map(),

    get(userName) {
        return this.data.get(userName);
    },

    
    set(user) {
        this.data.set(user.username, user);
        return user;
    },
};


export const MediaCache = {
    data: new Map(),

    get(mediaId) {
        return this.data.get(mediaId);
    },

    
    set(media) {
        this.data.set(media.mediaId, media);
        return media;
    },
};

const QUEUE_LENGTH_THRESHOLD = 3; //two posts in queue before requery to reduce expo delays for end-users


export const PostQueue = {
    data: [],
    offset: 0,

    push(posts) {
        if (posts.length) {
            posts.forEach(p => this.data.push(p)); 
            this.offset += posts.length;
        } else {
            this.length = 0; //end of api list - start from the beginning
        }
    },

    pop() {
        return this.data.length ? this.data.shift() : null;
    },

    length() {
        return this.data.length;
    },

    isExhausted(threshold) {
        return this.data.length < QUEUE_LENGTH_THRESHOLD;
    }
}