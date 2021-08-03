
import styles from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({
  largeImageURL,
  tags,
 webformatURL,
 
  onPictureClick,
}) => {
  return (
    <li className={ styles.ImageGalleryItem} >
      <img
        src={webformatURL}
        url={largeImageURL}
        alt={tags}
        className={ styles.ImageGalleryItem_image}
        onClick={onPictureClick}
      />
    </li>
  );
};
export default ImageGalleryItem;