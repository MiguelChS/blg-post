import * as React from 'react';
import './index.css';
import { PostBlog, postContent, postThumb } from './index.css';
import { Footer } from './footer';
import { DetallePost, IProps as detalleProps, enumTypePost } from './detallePost';

export { enumTypePost, detalleProps };
export interface IProps {
    urlImage: string;
    dateString: string;
    detalle: detalleProps;
}

export const Post = ({ urlImage, dateString, detalle }: IProps) => {
    return (
        <article className={PostBlog}>
            <div className={postThumb}>
                <a href="">
                    <img src={urlImage} alt="" />
                </a>
            </div>
            <div className={postContent}>
                <DetallePost
                    {...detalle}
                />
                <Footer
                    fecha={dateString}
                />
            </div>
        </article>
    )
}
