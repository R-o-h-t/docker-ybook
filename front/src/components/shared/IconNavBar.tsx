import React from "react";
import { Link } from "react-router-dom";

interface childrenProps {
    link: string,
    path: string,
    name: string
}


const IconNavbar = (children : childrenProps) => {
    return (
        <Link to={children.link}>
            <img src={children.path} alt={children.name} />
        </Link>
    )
}

export default IconNavbar;