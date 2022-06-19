import './ImageModal.css';

function ImageModal({ image }) {
    return (
        <div className="image__modal">
                    <div className="image__modalContainer">
                        <img
                         src={image} 
                         alt="" />
                    </div>
                </div>
    );
};

export default ImageModal;
