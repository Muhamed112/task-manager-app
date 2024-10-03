import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api";
import Container from "./Container";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const { saveToken } = useAuth();

	const onSubmit = async ({ name, email, password, confirmPassword }) => {
		try {
			const response = await signup({ name, email, password, confirmPassword });
			saveToken(response.data.token);
			navigate("/tasks");
		} catch ({ response }) {
			toast.error(response.data.message, { position: "top-right" });
		}
	};

	// Watch password and confirm password to ensure they match
	const password = watch("password");

	return (
		<Container>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign Up
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Name
						</label>
						<div className="mt-2">
							<input
								{...register("name", { required: "Name is required" })}
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
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								{...register("email", { required: "Email is required" })}
								id="email"
								type="email"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Password
						</label>
						<div className="mt-2">
							<input
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters",
									},
								})}
								id="password"
								type="password"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Confirm Password
						</label>
						<div className="mt-2">
							<input
								{...register("confirmPassword", {
									required: "Please confirm your password",
									validate: (value) =>
										value === password || "Passwords do not match",
								})}
								id="confirmPassword"
								type="password"
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.confirmPassword && (
								<p className="mt-2 text-sm text-red-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
};

export default Register;
