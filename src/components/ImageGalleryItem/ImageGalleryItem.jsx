import PropTypes from 'prop-types';

import { GalleryItem, Img } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ items, handleClick }) => {
  return items.map(item => (
    <GalleryItem key={item.id} onClick={() => handleClick(item.largeImageURL)}>
      <Img src={item.webformatURL} alt="" />
    </GalleryItem>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};
