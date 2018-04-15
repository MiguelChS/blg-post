/// <reference types="react" />
export declare enum enumTypePost {
    PREPOST = 0,
    POST = 1,
}
export interface IProps {
    title: string;
    categoria: string;
    descripcion: string;
    linkPost: string;
    typePost: enumTypePost;
}
export declare const DetallePost: (props: IProps) => JSX.Element;
