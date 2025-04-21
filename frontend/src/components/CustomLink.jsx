import React from "react";

const CustomLink = (props) => {
    return (
        <div>
            <a style={{
                textDecoration: 'none',
                color: 'inherit',
            }} href = {props.link}>{props.text}</a>
        </div>
    );
}

export default CustomLink;