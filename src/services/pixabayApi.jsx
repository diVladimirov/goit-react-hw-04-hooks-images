import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = 'key=24332293-f673b61ccd63539823a678f1a';
// const PER_PAGE = 12;

export const fetchImages = async () => {
  const response = await axios.get(
    `?q=cat&page=1&${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.data.hits;
};

// ?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}
