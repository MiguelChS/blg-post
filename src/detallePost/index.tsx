import * as React from 'react';
import './index.css';
import { detallePost, title, entryContent, continueReading } from './index.css';

export interface IProps {
    title: string,
    categoria: string,
    descripcion: string,
    linkPost: string
}


export const DetallePost = (props: IProps) => {
    return (
        <div className={detallePost}>
            <div className={`${title} text-center text-uppercase`}>
                <a href="#">{props.categoria}</a>
                <h2>
                    <a href={props.linkPost}>{props.title}</a>
                </h2>
            </div>
            <div className={entryContent}>
                <p>{props.descripcion}</p>
            </div>
            <div className={`${continueReading} text-center text-uppercase`}>
                <a href={props.linkPost}>Continue Reading</a>
            </div>
        </div>
    )
}