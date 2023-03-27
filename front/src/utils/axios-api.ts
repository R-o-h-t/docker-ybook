import axios from "axios";

const apiBack = axios.create({
	baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/`,
	headers: {
		"Content-Type": "application/json",
	},
});

export default apiBack;
