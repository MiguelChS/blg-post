import * as React from 'react';
import './index.css';
import { postFooter, author, socialRed } from './index.css'

export interface IProps {
    fecha: string;
}

export const Footer = ({ fecha }: IProps) => {
    return (
        <div className={postFooter}>
            <ul className={`pull-left list-inline ${author}`}>
                <li>{fecha}</li>
            </ul>
            <ul className={`pull-right list-inline ${socialRed}`}>
                <li><a href=""><i className="fa fa-facebook"></i></a></li>
                <li><a href=""><i className="fa fa-twitter"></i></a></li>
                <li><a href=""><i className="fa fa-pinterest"></i></a></li>
                <li><a href=""><i className="fa fa-google-plus"></i></a></li>
                <li><a href=""><i className="fa fa-instagram"></i></a></li>
            </ul>
        </div>
    )
}