"use client";
import React, {useState} from "react";
import './UserCard.styles.css';

interface UserCard{
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export const UserCard: React.FC<UserCard> = ({
    name,
    username,
    email,
    phone,
    website
})=> {
    // STATES
    const [active, setActive] = useState(false);

    // HANDLER
    const onClick = ()=> setActive(active === false);

    // RENDER
    return(
        <div className={`user-card ${active? 'selected': 'regular'}`} onClick={onClick}>
            <h4>{name}</h4>
            <h6>{username}</h6>
            <h6>{email}</h6>
            <p>{phone}</p>
            <p>{website}</p>
        </div>
    )
}