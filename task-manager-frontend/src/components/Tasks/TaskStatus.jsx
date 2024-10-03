import React from "react";

const TaskStatus = ({ status }) => {
	return (
		<div
			className={`font-bold p-1.5 mr-2 uppercase text-xs rounded ${
				status === "pending"
					? "bg-[#dce9fe] text-[#5e92e1]"
					: "bg-[#e3fcef] text-[#076a49]"
			}`}
		>
			{status === "pending" ? "Pending" : "Completed"}
		</div>
	);
};

export default TaskStatus;
