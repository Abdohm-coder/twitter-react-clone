import './ShowImage.css';
import { RecoilRoot, atom, useRecoilState } from 'recoil';

export default function ShowImage({ showImage, setImage }) {

    const [displayImage, setDisplayImage] = useRecoilState(showImage);
    const [img, setImg] = useRecoilState(setImage);

    const desactiveModal = () => {
        setDisplayImage(false);
        setImg("");
    }

    return (
        <>
        {
            displayImage && 
                <div className='displayImage' onClick={desactiveModal}>
                    <div className="displayImage__container">
                        <img src={img} alt="" />
                    </div>
                </div>
        }
        </>
    );
}
