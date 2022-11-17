import React, { FC, useContext, useEffect, useState } from "react";
import { UserContext, userContextType } from "~/context/UserContext";

const labels = [{ label: "Delete", action: "delete" }];

interface PropTypes {
	id: number;
	handleDelete: (id: number) => void;
}

const Dropdown: FC<PropTypes> = ({ id, handleDelete }) => {
	const { jwt } = useContext(UserContext) as userContextType;

	const [isOpen, setOpen] = useState(false);

	const handleAction = async (action: string) => {
		switch (action) {
			case "delete": {
				handleDelete(id);
			}
			default: {
				return;
			}
		}
	};

	return (
		<div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-6 h-6 cursor-pointer'
				onClick={() => setOpen(!isOpen)}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
				/>
			</svg>

			{isOpen && (
				<div className='absolute bg-white rounded-md py-2 shadow-md'>
					{labels.map(
						(item: { label: string; action: string }, index: number) => (
							<div
								key={index}
								className='px-5 py-1 hover:cursor-pointer hover:bg-brown hover:text-white'
								onClick={() => handleAction(item.action)}>
								{item.label}
							</div>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
