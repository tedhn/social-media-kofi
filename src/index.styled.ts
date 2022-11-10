import styled from "styled-components";

const InputBox = styled.input`
	background: white;
	border-radius: 12px;
	padding: 6px 20px;
	color: #594545;

	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);

	::placeholder {
		font-weight: 500;
		color: #815b5b;
	}

	:focus {
		outline: 2px solid #815b5b;
	}
`;

const Button = styled.button`
	padding: 12px 24px;
	border-radius: 12px;
	font-weight: 500;
	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);
	transition: transform 0.3s ease;

	:hover {
		transform: translateY(-2px);
	}
`;

const SecondaryButton = styled(Button)`
	color: #815b5b;
	background-color: #fff;
`;

const PrimaryButton = styled(Button)`
	color: white;
	background-color: #815b5b;
`;

export { InputBox, PrimaryButton, SecondaryButton, Button };
