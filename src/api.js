import axios from 'axios';

export const fetchFiles = () => {
  return axios.get(`api/files`)
              .then(resp => resp.data.files)
}


export const saveFile = (name, hash, desc) => {
  return axios.post(`api/saveFile`, {name, hash, desc})
              .then(resp => resp.data)
}
