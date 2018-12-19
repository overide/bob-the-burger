import axios from 'axios';

const instance = axios.create({
	"baseURL":"https://burger-builder-4370f.firebaseio.com/"
});

export default instance;