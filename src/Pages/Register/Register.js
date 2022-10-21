import  { toast } from 'react-hot-toast';
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Register = () => {
	const [error, setError] = useState("");
    const [accepted, setAccepted] = useState(false)

	const { createUser ,updateUserProfile,verifyEmail} = useContext(AuthContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const photoURL = form.photo.value;
		const email = form.email.value;
		const password = form.password.value;
		console.log(name, photoURL, email, password);

		createUser(email, password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				form.reset();
				setError("");
                handleUpdteUserProfile(name,photoURL)
                handleVerifyEmail()
                toast.success('please verify your email address before login')
			})
			.catch((error) => {
				console.error(error);
				setError(error.message);
			});
	};

    const handleUpdteUserProfile = (name, photoURL) =>{
        const profile = {
            displayName : name,
            photoURL : photoURL
        }
        updateUserProfile(profile)
        .then(() =>{})
        .catch(error => console.error(error))
    }

    const handleVerifyEmail = () =>{
        verifyEmail()
        .then(() =>{})
        .catch(error =>console.error(error))
    }

    const handleAccepted = (event) =>{
           setAccepted(event.target.checked)
    }
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Your Name</Form.Label>
					<Form.Control name="name" type="text" placeholder="Your name" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Your Photo URL</Form.Label>
					<Form.Control name="photo" type="text" placeholder="photo url" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="email"
						type="email"
						placeholder="Enter email"
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="Password"
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox"
                    onClick={handleAccepted} 
                    label={<>Accept <Link to='/terms'>terms & conditions</Link></>} />
				</Form.Group>

				<Button variant="primary" type="submit" disabled={!accepted}>
					Register
				</Button>

				<Form.Text className="text-danger">{error}</Form.Text>
			</Form>
		</div>
	);
};

export default Register;