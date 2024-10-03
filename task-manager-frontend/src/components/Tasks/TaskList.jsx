import { useNavigate } from "react-router-dom";
import SingleTask from "./SingleTask";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import { fetchRandomQuote, fetchTasks } from "../../api/api";
import Container from "../Container";

function TaskList() {
	const navigate = useNavigate();
	const { data: tasks, isLoading } = useQuery({
		queryKey: ["tasks"],
		queryFn: fetchTasks,
	});
	const { data: quote, isLoading: isQouteLoading } = useQuery({
		queryKey: ["quote"],
		queryFn: fetchRandomQuote,
	});

	if (isLoading || isQouteLoading) {
		return <LoadingSpinner />;
	}

	return (
		<Container>
			<div className="md:w-1/2 mx-auto">
				<h1 className="text-xl font-semibold mb-6">{quote.content}</h1>

				<div className="shadow-md rounded-lg p-6 bg-indigo-600">
					<div className="flex justify-between mb-6">
						<h1 className="text-white text-3xl font-semibold">Task List</h1>
						<button
							className="bg-white text-indigo-600 font-bold py-2 px-4 rounded"
							onClick={() => {
								navigate("/create-task");
							}}
						>
							Add New Task
						</button>
					</div>

					<ul id="todo-list">
						{tasks?.map(({ id, name, description, due_date, status }) => (
							<SingleTask
								key={id}
								id={id}
								title={name}
								description={description}
								dueDate={due_date}
								status={status}
							/>
						))}
					</ul>
				</div>
			</div>
		</Container>
	);
}

export default TaskList;
