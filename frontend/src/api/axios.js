import axios from 'axios';
// definie le chemin de axios pour le backend
export default axios.create({
      baseURL: 'http://localhost:3000',
});
