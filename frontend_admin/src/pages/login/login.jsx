import { React, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axios";

const Login = () => {
	const {

		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onSubmit',});

	//로그인 상태에서 login 페이지 진입 차단
	const token = localStorage.getItem("token");
	if (token) {
		return <Navigate to="/" />;
	}

	const axiosLoginTest = async (data) => {
		const test_URL = "/admin/auth/login";
		try {
			const response = await axiosInstance.post(test_URL, data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.data.response) {
				const token = response.data.token;
				console.log("token", token);
				localStorage.setItem("token", token);
				return <Navigate to="/" />;

			}
		} catch (error) {
			console.log("error.response", error.response);
		}
	};

	console.log(errors)

	const submitForm = (data) => {
		axiosLoginTest(data);
	};

	return (
		<div>
			로그인
			<div>
				<form
					onSubmit={handleSubmit(submitForm)}
					onError={() => {
						"로그인 실패";
					}}>
					<div>
						<input

							type="text"
							placeholder="userame"
							{...register("userName", {
								required: {value: true, message: "Please enter"},
								maxLength: 30
							})}></input>
						<div>

						</div>
					</div>
					<div>
						<input
							type="password"
							placeholder="password"
							{...register("password", {
								required: true,
								maxLength: 30,
							})}></input>
						<div>

						</div>
					</div>

					<div>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							type="submit">
							login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
