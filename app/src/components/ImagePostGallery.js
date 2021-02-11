import React, { useEffect } from "react";
import "./ImagePostGallery.css";
import ImagePost from "./ImagePost";
// import { SamplePost } from "../models/SamplePost";
import LoadingSpinner from "./LoadingSpinner";
import useAPI from "./useAPI";
import { EXPO_TIME } from "../config/gallery";

const ImagePostGallery = () => {
    const [post, nextPost] = useAPI();

    useEffect(() => {
        let nextPostTimer = null;

        if (!post) nextPost();
        else nextPostTimer = setTimeout(nextPost, EXPO_TIME);

        return () => {
            clearTimeout(nextPostTimer);
        };
    });

    return (
        <div className="post-gallery">
            {!post && <LoadingSpinner />}
            {post && <ImagePost {...post} />}
        </div>
    );
};

export default ImagePostGallery;
