const ImageGalleryItem = ({ items, handleClick }) => {};
const elemets = items.map(item => (
  <li key={item.id} onClick={() => handleClick(item.largeImageURL)}>
    <img src={item.webformatURL} alt="" />
  </li>
));
