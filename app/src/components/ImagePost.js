import React from "react";
import "./ImagePost.css";


const ImagePost = (props) => {
    return (
        <div className="post-gallery__post">
            <div className="post__picture">
                <img src={props.image} alt="" className="picture__back"></img>
                <img src={props.image} alt="" className="picture__front"></img>
            </div>

            <div className="post__details">
                <div className="details__header">
                    <p className="header__name">{`${props.firstName} ${props.lastName}`}</p>
                    <img src={props.avatar} alt="" className="header__avatar"></img>
                </div>
                <div className="details__article">
                    <p className="article__title">{props.title}</p>
                    <p className="article__description">
                        {props.description}
                    </p>
                </div>
                <div className="details__footer">
                    <div className="footer__likes">
                        <p className="likes__icon">
                            <i className="fas fa-thumbs-up"></i>
                        </p>
                        <div className="likes__stats">
                            <p>{props.likes} personnes</p>
                        </div>
                    </div>
                    <div className="footer__pub-date">
                        <p>{props.published}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePost;