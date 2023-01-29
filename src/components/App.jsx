import { Component } from 'react';

import SearchForm from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { searchPhoto } from './shared/api/Api';

import { Finder, Spiner } from './App.styled';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    totalPage: null,
    per_page: 12,
    largeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { search, page, per_page } = this.state;
      const data = await searchPhoto(search, page, per_page);

      // const test = data.hits.map(el => {
      //   let result = {
      //     id: el.id,
      //     webformatURL: el.webformatURL,
      //     largeImageURL: el.largeImageURL,
      //   };
      // });
      // console.log('re', test);
      const totalPage = Math.ceil(data.totalHits / per_page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
        totalPage,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  searchPhoto = ({ search }) => {
    this.setState({ search });
  };
  // searchPhoto = ({ search }) => {
  //   this.setState({ search, items: [], page: 1 });
  // };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };
  handleClickImg = largeImg => {
    this.setState({
      showModal: true,
      largeImg,
    });
  };
  render() {
    const { items, loading, page, totalPage, showModal, largeImg } = this.state;
    const { loadMore, searchPhoto, closeModal, handleClickImg } = this;
    return (
      <Finder>
        <SearchForm onSubmit={searchPhoto} />
        <Loader loading={loading} />
        {Boolean(items.length) && (
          <ImageGallery items={items} handleClick={handleClickImg} />
        )}
        {page < totalPage && <Button handleClick={loadMore}> Load more</Button>}
        {showModal && (
          <Modal close={closeModal}>
            <img src={largeImg} alt="" />
          </Modal>
        )}
      </Finder>
    );
  }
}
