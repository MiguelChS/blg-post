/// <reference types="react" />
import './index.scss';
import { IProps as detalleProps, enumTypePost } from './detallePost';
export { enumTypePost, detalleProps };
export interface IProps {
    urlImage: string;
    dateString: string;
    detalle: detalleProps;
}
export declare const Post: ({ urlImage, dateString, detalle }: IProps) => JSX.Element;
