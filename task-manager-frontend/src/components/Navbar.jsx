import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
	const navigate = useNavigate();
	const { removeToken, isAuthenticated } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
			removeToken();
			navigate("/");
		} catch (error) {
			toast.error(error, { position: "top-right" });
		}
	};
	return (
		<div className="w-full px-6 xl:px-36 py-6 flex justify-between items-center text-indigo-600 border-b border-gray-200">
			<h1 className="text-2xl">
				<strong>Task</strong>List
			</h1>
			<div>
				{!isAuthenticated ? (
					<div className="flex space-x-4">
						<Link to={"/register"}>Sign up</Link>
						<Link to={"/"}>Login</Link>
					</div>
				) : (
					<button onClick={handleLogout}>Logout</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
