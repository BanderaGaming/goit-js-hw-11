import axios from "axios";
export async function search (keyWord,page) {
    const API_KEY = 'key=38011048-0a22e4780233a92ee3d5bbcfc';
    const BASE_URL = 'https://pixabay.com/api/';
    const OPTIONS = `?${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${keyWord}&per_page=40&page=${page}`;
    return await axios.get(`${BASE_URL}${OPTIONS}`);
};
