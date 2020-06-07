import axios from 'axios';
import debounce from 'lodash.debounce';

const CHUNK_SIZE = 15;

const getSuggestions = debounce((fragment, latitude, longitude) => {
  const query = {
    q: `${fragment[0].toUpperCase()}${fragment.substring(1, fragment.length)}`,
  };
  if (latitude && longitude) {
    query.latitude = latitude;
    query.longitude = longitude;
  }
  return axios.get(
    `${process.env.REACT_APP_API_URL}/suggestions`,
    {
      params: query,
    },
  )
    .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Server error');
      }
      return data.suggestions.slice(0, CHUNK_SIZE + 1);
    })
    .catch(() => []);
},
200, { leading: true });

export { getSuggestions };
