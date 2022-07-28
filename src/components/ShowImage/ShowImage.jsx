import { Fragment, useContext } from "react";
import { DataContext } from "../../App";
import "./ShowImage.css";

export default function ShowImage() {
  const dataContext = useContext(DataContext);

  const desactiveModal = () => {
    dataContext.setDisplayImage(false);
    dataContext.setImageSrc("");
  };

  return (
    <Fragment>
      {dataContext.displayImage && (
        <div className="displayImage" onClick={desactiveModal}>
          <div className="displayImage__container">
            <img src={dataContext.img} alt={dataContext.img} />
          </div>
        </div>
      )}
    </Fragment>
  );
}
