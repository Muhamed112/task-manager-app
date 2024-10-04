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
	try {
		const response = await api.get("/tasks");
		return response.data;
	} catch (error) {
		toast.error("Error fetching tasks");
		throw error;
	}
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

export const deleteTask = async ({ id }) => {
	try {
		const response = await api.delete(`/tasks/${id}`);
		return response.data;
	} catch (error) {
		toast.error("Error deleting task");
		throw error;
	}
};

export const createTask = async ({ name, description, dueDate }) => {
	try {
		const response = await api.post("/tasks", {
			name,
			description,
			due_date: dueDate,
			status: "pending",
		});
		return response.data;
	} catch (error) {
		toast.error("Error creating task");
		throw error;
	}
};

export const updateTask = async ({ name, description, dueDate, isCompleted, id }) => {
	try {
		const response = await api.put(`/tasks/${id}`, {
			name,
			description,
			due_date: dueDate,
			status: isCompleted ? "completed" : "pending",
		});
		return response.data;
	} catch (error) {
		toast.error("Error updating task");
		throw error;
	}
};

export const getTask = async ({ id }) => {
	try {
		const response = await api.get(`/tasks/${id}`);
		return response.data;
	} catch (error) {
		toast.error("Error fetching task");
		throw error;
	}
};

export const fetchRandomQuote = async () => {
	try {
		const response = await axios.get("http://api.quotable.io/random");
		return response.data;
	} catch (error) {
		toast.error("Error fetching quote");
		throw error;
	}
};
