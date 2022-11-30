import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";

import { useState, useEffect } from "react";

import "./FlickrSearch.css";
import {
  Box,
  Button,
  TextField,
  ImageList,
  Container,
  Modal,
  Stack,
  Pagination,
} from "@mui/material";
import { FlickrPhoto } from "./FlickrPhoto";

const apiKey = process.env.REACT_APP_FLICKR_API_KEY;
function SearchPage(props) {
  const params = useParams();
  const [query, setQuery] = useState(params.queryText ? params.queryText : "");
  const [photos, setPhotos] = useState({});
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const onQueryChanged = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${query}`);
  };

  useEffect(() => {
    console.log("Run search and show results");
    const url = `https://api.flickr.com/services/rest?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1&text=${query}&safe_search=1&page=${currentPage}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhotos(data.photos);
      });
  }, [params.queryText, currentPage]);

  const handleOnPhotoClick = (item) => {
    setIsModalShown(true);
    setSelectedPhoto(item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          value={query}
          onChange={onQueryChanged}
        ></TextField>{" "}
        <Button variant="contained" size="large" type="submit">
          Search
        </Button>
      </form>

      <Container
        sx={{
          justifyContent: "center",
          display: "block",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Pagination count={photos.pages} onChange={(e, value) => setCurrentPage(value)} />
        </Stack>
        <ImageList
          sx={{ width: "auto", height: "auto" }}
          cols={4}
          rowHeight={250}
        >
          <FlickrPhoto
            data={photos?.photo}
            handleOnPhotoClick={handleOnPhotoClick}
          />
        </ImageList>
      </Container>

      <Modal
        open={isModalShown}
        onClose={() => setIsModalShown(false)}
        aria-labelledby={selectedPhoto?.title}
        aria-describedby="modal-modal-description"
      >
        <Box
          component="img"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          src={`https://live.staticflickr.com/${selectedPhoto?.server}/${selectedPhoto?.id}_${selectedPhoto?.secret}.jpg`}
        />
      </Modal>
    </div>
  );
}

function FlickrSearch(props) {
  return (
    <div>
      <BrowserRouter>
        <h1>Flickr Search</h1>
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/search/:queryText" element={<SearchPage />}></Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default FlickrSearch;
