/// <reference types="react" />
import './index.css';
import { IProps as detalleProps } from './detallePost';
export interface IProps {
    urlImage: string;
    dateString: string;
    detalle: detalleProps;
}
export declare const Post: ({ urlImage, dateString, detalle }: IProps) => JSX.Element;
