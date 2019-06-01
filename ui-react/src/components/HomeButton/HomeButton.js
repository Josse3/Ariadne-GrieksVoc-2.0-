import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButton.css';
import homeImg from './home-icon-grey.png';

function HomeButton(props) {
    return (
        <Link to="/">
            <div className="home-btn">
                <img src={homeImg} />
                <p><i class='far fa-caret-square-left'></i> Οἶκος</p>
            </div>
        </Link>
    )
}

export default HomeButton;