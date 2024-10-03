import axios from "axios";

const apiConfig = {
	headers: {
		"Content-Type": "application/json",
	},
};

const api = axios.create({
	baseURL: "http://localhost:8000/api",
	apiConfig,
});

//Add token every time endopint is called
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const fetchTasks = async () => {
	const response = await api.get("/tasks");
	return response.data;
};

export const login = ({ email, password }) => {
	return api.post("/login", { email, password });
};


export const logout = () => {
	return api.post("/logout");
};

export const signup = ({ name, email, password, confirmPassword }) => {
	return api.post("/register", {
		name,
		email,
		password,
		password_confirmation: confirmPassword,
	});
};

export const deleteTask = ({ id }) => {
	return api.delete(`/tasks/${id}`);
};

export const createTask = ({ name, description, dueDate }) => {
	return api.post("/tasks", {
		name,
		description,
		due_date: dueDate,
		status: "pending",
	});
};

export const updateTask = ({ name, description, dueDate, isCompleted, id }) => {
	return api.put(`/tasks/${id}`, {
		name,
		description,
		due_date: dueDate,
		status: isCompleted ? "completed" : "pending",
	});
};

export const getTask = async ({ id }) => {
	const response = await api.get(`/tasks/${id}`);

	return response.data;
};

export const fetchRandomQuote = async () => {
	const response = await axios.get("https://api.quotable.io/random");
	return response.data;
};
