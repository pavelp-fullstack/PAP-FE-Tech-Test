import { useState } from "react";
import {
    API_POSTS_URL,
    API_MEDIA_URL,
    API_USER_URL,
    ApiParams,
} from "../config/api";

import { UserCache, MediaCache, PostQueue } from "./DataCache";

const POST_LIMIT = 10;

const useAPI = () => {
    const [post, setPost] = useState(null);

    const nextPost = async () => {
        let cp = PostQueue.pop();
        setPost(cp);

        if (!cp || PostQueue.isExhausted()) {
            var posts = await prefetch(PostQueue.offset, POST_LIMIT);
            PostQueue.push(posts);
            if (!post) setPost(PostQueue.pop());
        }
    };

    return [post, nextPost];
};

export default useAPI;

async function fetchData(url) {
    const headers = {
        accept: "application/json",
    };
    try {
        let resp = await fetch(url, headers);
        let data = await resp.json();
        if (data.success && data.response) {
            return data.response;
        } else return {}; //use resilence approach here
    } catch (e) {
        console.error("fetching data from API is failed, error:", e);
        throw e;
    }
}

async function getPosts(offset, limit) {
    const url = API_POSTS_URL.replace(ApiParams.OFFSET, offset).replace(
        ApiParams.LIMIT,
        limit
    );

    let resp = await fetchData(url);
    return resp && resp.count ? resp.posts : [];
}

async function getUser(userName) {
    const DUMMY_USER = {
        username: "-------",
    };

    let user = UserCache.get(userName);
    if (user) return Promise.resolve(user);

    try {
        const url = API_USER_URL.replace(
            ApiParams.USER_NAME,
            encodeURIComponent(userName)
        );
        var resp = await fetchData(url);

        let user = resp.user ? resp.user : DUMMY_USER;
        return UserCache.set(user);
    } catch (e) {
        console.error("getting user from API is failed, error:", e);
        throw e;
    }
}

async function getMedia(mediaId) {
    const DUMMY_MEDIA = {
        mediaId: "0",
    };

    let media = MediaCache.get(mediaId);
    if (media) return Promise.resolve(media);

    try {
        const url = API_MEDIA_URL.replace(
            ApiParams.MEDIA_ID,
            encodeURIComponent(mediaId)
        );
        var resp = await fetchData(url);

        let media = resp.media ? resp.media : DUMMY_MEDIA;
        media.mediaId = mediaId; //workaround fauly API call - returns wrong media

        return MediaCache.set(media);
    } catch (e) {
        console.error("getting user from API is failed, error:", e);
        throw e;
    }
}

async function prefetch(offset, limit) {
    let posts = await getPosts(offset, limit);
    return Promise.all(
        posts.map(async (post) => {
            let user = await getUser(post.user.username);
            let media = await getMedia(post.mediaId);
            return remap(post, user, media);
        })
    );
}

function remap(post, user, media) {
    const DUMMY_IMAGE_URL = "about:blank"; //TODO: filter out/replace for stubs images with such source by CSS
    const DUMMY_NAME = "";

    return {
        image: media ? media.urls.full : DUMMY_IMAGE_URL,
        avatar: user ? user.profile_images.small : DUMMY_IMAGE_URL,
        firstName: user && user.first_name ? user.first_name : DUMMY_NAME,
        lastName: user && user.last_name ? user.last_name : DUMMY_NAME,
        title: post.title ? post.title : "",
        description: post.description ? post.description : "...",
        likes: post.likes,
        published: "pubblicato: " + post.created, //TODO: convert this to amout in words in Italian
    };
}
