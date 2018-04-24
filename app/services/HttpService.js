import apisauce from 'apisauce';
import config from '../config/';

const create = (baseURL = config.api.url) => {
  const http = apisauce.create({
    baseURL,
    timeout: 10000,
  });

  return {
    userSignIn: token => http.post('/users', { token }),
    repositoriesRequest: token => http.get('/repositories', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    commitsRequest: token => http.get('/repositories/commits', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    commitsRequestFromRepository: (token, username, repository) =>
      http.get(`/repositories/${username}/${repository}/commits`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export default {
  create,
};
