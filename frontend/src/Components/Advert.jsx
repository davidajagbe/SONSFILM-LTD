import React from 'react';

const Advert = ({ imageUrl, linkUrl, altText }) => {
    return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex justify-center items-center my-5">
                <img 
                    src={imageUrl} 
                    alt={altText} 
                    className="w-full max-w-[728px] h-auto"
                />
            </div>
        </a>
    );
};

export default Advert;