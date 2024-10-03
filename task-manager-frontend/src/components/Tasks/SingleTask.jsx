import React from "react";
import { deleteTask } from "../../api/api";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TaskStatus from "./TaskStatus";

const formatDate = (date) => {
	const newDate = new Date(date);
	return newDate.toLocaleDateString("en-GB");
};

const SingleTask = ({ title, description, dueDate, status, id }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => deleteTask({ id }),
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
		},
	});

	return (
		<li className="bg-white rounded flex flex-col xl:flex-row xl:items-center justify-between p-4 mb-4">
			<div className="flex">
				<div>
					<p className="text-lg font-bold">{title}</p>
					<div>Due date: {formatDate(dueDate)}</div>
					<div className="truncate max-w-56 xl:max-w-sm">Description: {description}</div>
				</div>
			</div>
			<div className="flex items-center mt-4">
				<TaskStatus status={status} />
				<div className="p-2 bg-gray-200 rounded cursor-pointer mr-2">
					<PencilIcon
						className="h-5"
						onClick={() => navigate(`/edit-task/${id}`)}
					/>
				</div>
				<div className="p-2 bg-gray-200 rounded cursor-pointer">
					<TrashIcon className="h-5" onClick={() => mutation.mutate()} />
				</div>
			</div>
		</li>
	);
};

export default SingleTask;
