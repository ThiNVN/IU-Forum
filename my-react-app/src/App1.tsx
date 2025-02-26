import React from 'react';
import logo from './logo.svg';
//import './App.css';

function Profile(){
    return (
        <img
            className="avatar"
            src="https://i.imgur.com/MK3eW3As.jpg"
            alt="Katherine Johson"
        />
    );
}
const person = {
    name: 'Katherine Johnson',
    theme: {
        backgroundColor: 'black',
        color: 'violet',
    }
};

export default function Gallery() {
    return (
        <section>
            <h1> Amazing scientists</h1>
            <Profile />
            <Profile />
            <Profile />
            <div style={person.theme}>
                <h1>{person.name}'s Todos</h1>
                <img
                    className="avatar"
                    src="https://i.imgur.com/7vQD0fPs.jpg"
                    alt="hehe"
                />
                <ul>
                    <li>Imporove the videophone</li>
                    <li>Prepare aeronautics lectures</li>
                    <li>Work on the alcohol</li>
                </ul>
            </div>
        </section>
    );
}