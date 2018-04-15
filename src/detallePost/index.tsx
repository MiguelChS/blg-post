import * as React from 'react';

export enum enumTypePost {
    PREPOST,
    POST
}
export interface IProps {
    title: string,
    categoria: string,
    descripcion: string,
    linkPost: string,
    typePost: enumTypePost
}


export const DetallePost = (props: IProps) => {

    let addButtonLink: JSX.Element | null = null;

    if (props.typePost == enumTypePost.PREPOST) {
        addButtonLink = (
            <div className="continueReading text-center text-uppercase">
                <a href={props.linkPost}>Continue Reading</a>
            </div>
        )
    }

    return (
        <div className="detallePost">
            <div className="title text-center text-uppercase">
                <a href="#">{props.categoria}</a>
                <h2>
                    <a href={props.linkPost}>{props.title}</a>
                </h2>
            </div>
            <div className="entryContent" dangerouslySetInnerHTML={{ __html: props.descripcion }}>
            </div>
            {addButtonLink}
        </div>
    )
}