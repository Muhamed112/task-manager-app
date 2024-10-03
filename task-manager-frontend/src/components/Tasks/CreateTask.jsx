import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../Container";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createTask, getTask, updateTask } from "../../api/api";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { getTodayDate } from "../../utils/utils";

const CreateTask = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { id: taskId } = useParams();

	const mutation = useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
			navigate("/tasks");
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateTask,
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
			navigate("/tasks");
		},
	});

	const { data: task, isLoading } = useQuery({
		queryKey: ["tasks", taskId],
		queryFn: () => getTask({ id: taskId }),
		enabled: !!taskId,
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (task) {
			reset({
				name: task.name,
				description: task.description,
				dueDate: task.due_date,
				isCompleted: task.status === "completed" ? true : false,
			});
		}
	}, [task, reset]);

	const onSubmit = async ({ name, description, dueDate, isCompleted }) => {
		if (taskId) {
			updateMutation.mutate({
				name,
				description,
				dueDate,
				isCompleted,
				id: taskId,
			});
		} else {
			mutation.mutate({ name, description, dueDate });
		}
	};

	if (taskId && isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<Container>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					{taskId ? `Edit ${task?.name}` : "Create New Task"}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-lg">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Task Title
						</label>
						<div className="mt-2">
							<input
								{...register("name", { required: "Task title is required" })}
								id="name"
								type="text"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.name && (
								<p className="mt-2 text-sm text-red-600">
									{errors.name.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="description"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Description
						</label>
						<div className="mt-2">
							<textarea
								{...register("description", {
									required: "Description is required",
								})}
								id="description"
								type="text"
								className="block min-h-[150px] resize-none w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.description && (
								<p className="mt-2 text-sm text-red-600">
									{errors.description.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="dueDate"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Due Date
						</label>

						<div className="mt-2">
							<input
								{...register("dueDate", { required: "Due date is required" })}
								id="dueDate"
								type="date"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Select date"
								min={getTodayDate()}
							/>
							{errors.dueDate && (
								<p className="mt-2 text-sm text-red-600">
									{errors.dueDate.message}
								</p>
							)}
						</div>
					</div>

					{taskId && (
						<div className="flex items-center">
							<input
								{...register("isCompleted")}
								type="checkbox"
								id="isCompleted"
								className="mr-2"
							/>
							<label>
								{task?.status === "pending"
									? "Mark as completed"
									: "Mark as pending"}
							</label>
						</div>
					)}

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
};

export default CreateTask;
