import axios from 'axios';
import debounce from 'lodash.debounce';

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
      console.log(data.suggestions);
      return data.suggestions;
    })
    .catch(() => []);
},
1000, { leading: true });

export { getSuggestions };
