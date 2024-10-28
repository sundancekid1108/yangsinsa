import { React, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axios";

const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const username = useRef("");
	const password = useRef("");
	const onSubmit = async () => {
		console.log("username", username);
		console.log("password", password);
		console.log("onClick")
		const result = await axiosInstance.get('/')
		console.log("result", result)
	};

	const onClick = () => {
		console.log("onClick")
	}
	return (
		<div>
			로그인
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input placeholder="username"/>
					</div>
					<div>
						<input
							type="password"
							placeholder="password"
							{...register("password")}></input>
					</div>
					<div>{errors ? "errors" : "no errors"}</div>
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
