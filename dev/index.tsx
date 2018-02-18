import * as React from 'react';
import { render } from 'react-dom';
import { Post } from '../src';

render(
    <Post
        urlImage="http://demo.shapedtheme.com/kotha-pro-html/assets/images/post-thumb-1.jpg"
        dateString="Octubre 13, 2017"
        detalle={{
            categoria: "Travel",
            descripcion: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua...",
            title: "ADVENTURE TO TRAVEL LONELY",
            linkPost: "#"
        }}
    />,
    document.getElementById('app'));