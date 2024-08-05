import { React, useRef } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
	const { register, handleSubmit, errors } = useForm();
	const email = useRef("");
	const password = useRef("");
	const onSubmit = () => {
		console.log("email", email);
		console.log("password", password);
	};
	return (
		<div>
			로그인
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input placeholder="email" />
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
