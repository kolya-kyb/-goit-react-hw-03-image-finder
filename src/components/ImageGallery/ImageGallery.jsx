import { Gallery } from './ImageGallery.styled';
export const ImageGallery = ({ items, handleClick }) => {
  const elemets = items.map(item => (
    <li key={item.id} onClick={() => handleClick(item.largeImageURL)}>
      <img src={item.webformatURL} alt="" />
    </li>
  ));
  return <Gallery>{elemets}</Gallery>;
};

export default ImageGallery;
