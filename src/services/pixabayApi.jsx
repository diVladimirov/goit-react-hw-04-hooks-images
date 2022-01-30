import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = 'key=24332293-f673b61ccd63539823a678f1a';
// const PER_PAGE = 12;

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data.hits;
};
