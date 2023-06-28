/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface ModalProps {
	children: React.ReactNode;
	exitButtonText: string;
	externalState: boolean;
	setExternalState: any;
	continueButtonText: string;
	openModalText: string;
	function: any;
}
export function Modal(props: ModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const ChangeModalState = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				className='btn'
				onClick={ChangeModalState}
			>
				{props.openModalText}
			</button>
			<div
				id='my_modal_1'
				className={`modal ${
					isOpen && props.externalState == true && " modal-open"
				} `}
			>
				<div className='modal-box'>
					<div>
						{
							//* contenido del modal
						}
						{props.children}
					</div>
					<div className='modal-action'>
						<button
							className='btn-primary btn'
							onClick={() => {
								props.setExternalState(!props.externalState);
								ChangeModalState();
								props.function;
							}}
						>
							{props.continueButtonText}
						</button>
						<button
							className='btn-outline btn-error btn '
							onClick={() => {
								ChangeModalState();
							}}
						>
							{props.exitButtonText}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
