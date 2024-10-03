import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
	return (
		<div className="h-screen w-screen relative">
			<ClipLoader
				color={"#4f46e5"}
				className="absolute m-auto top-0 left-0 right-0 bottom-0"
			/>
		</div>
	);
};

export default LoadingSpinner;
