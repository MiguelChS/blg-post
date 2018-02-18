/// <reference types="react" />
import './index.css';
export interface IProps {
    title: string;
    categoria: string;
    descripcion: string;
    linkPost: string;
}
export declare const DetallePost: (props: IProps) => JSX.Element;
