import React, { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {
    pictures: [],
    searchPictureName: "",
    error: null,
    loading: false,
    modal: false,
    modalUrl: "",
    modalAlt: "",
  };

  onFormSubmit = (searchPicture) => {
    this.setState({ searchPictureName: searchPicture });
  };
  toggleModal = () => {
  this.setState(({ modal }) => ({
      modal: !modal,
    }))
  };
  onPictureClick = (e) => {
    this.setState({
      modalUrl: e.currentTarget.getAttribute("url"),
      modalAlt: e.currentTarget.getAttribute("alt"),
    });
    this.toggleModal();
  };
  componentDidUpdate(prevProps, prevState) {
    const currentName = this.state.searchPictureName;
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${currentName}&page=${1}&per_page=12&key=21861129-b5e52c4cca63d1835e3548bf1`;
    if (prevState.searchPictureName !== this.state.searchPictureName) {
      this.setState({ loading: true, pictures: [], error: null });
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(({ hits }) => {
          if (hits.length !== 0) {
            return hits;
          }
          return Promise.reject(new Error("No such pictures found"));
        })
        .then((pictures) => this.setState({ pictures }))
        .catch((error) => {
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { pictures, loading, error, modal, modalUrl, modalAlt } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        {error && <p>{error.message}</p>}
        {loading && <p>...Loding</p>}
 {modal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalUrl} alt={modalAlt} />
          </Modal>
        )}
        <ImageGallery>
          {pictures.map(({ largeImageURL, tags, webformatURL, id }) => (
            <ImageGalleryItem
              largeImageURL={largeImageURL}
              tags={tags}
              webformatURL={webformatURL}
              key={id}
              onPictureClick={this.onPictureClick}
              
            />
          ))}
        </ImageGallery>
       
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}
export default App;
