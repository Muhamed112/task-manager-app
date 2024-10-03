import React from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

const Container = ({ children, className }) => {
	return (
		<>
			<Navbar />
			<div
				className={`flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-full md:max-w-full ${
					className ? className : ""
				}`}
			>
				{children}
			</div>
			<ToastContainer />
		</>
	);
};

export default Container;
