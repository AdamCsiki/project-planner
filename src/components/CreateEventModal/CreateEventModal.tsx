import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./CreateEventModal.style.css";
import { EventForm } from "../../interfaces/EventForm";

interface ExtendedProps {
	visible: boolean;
	onCancel: () => void;
	onFinish: () => void;
}

export default function CreateEventModal(props: ExtendedProps) {
	const [invited, setInvited] = useState<string[]>([]);
	const [current, setCurrent] = useState<string>("");

	const [form, setForm] = useState<EventForm>({} as EventForm);

	const addPerson = () => {
		console.log(invited.indexOf(current));
		if (invited.indexOf(current) !== -1) {
			return;
		}
		setInvited((invitees) => {
			return invitees.concat(current);
		});
	};

	const removePerson = (name: string) => {
		setInvited(() => {
			return invited.filter((cur) => {
				return cur !== name;
			});
		});
	};

	const createEvent = () => {
		fetch("http://localhost:8080/events/create", {
			method: "POST",
			body: JSON.stringify(form),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				props.onFinish();
			});
	};

	return (
		<div
			className="create-modal-background"
			style={{ visibility: props.visible ? "visible" : "hidden" }}
			onClick={(e) => {
				props.onCancel();
			}}
		>
			<div
				className="create-modal-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="button-container">
					<h5>Create</h5>
				</div>
				<div className="create-input-container">
					<Input
						placeholder="Title"
						onChange={(e) => {
							setForm((old_form) => {
								old_form.title = e.target.value;
								return old_form;
							});
						}}
					/>
					<Input placeholder="Max Participants" />
					<div className="date-container">
						<Input type="date" />
						<h6>to</h6>
						<Input type="date" />
					</div>
				</div>
				<div className="button-container">
					<Button
						onClick={(e) => {
							props.onCancel();
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={(e) => {
							props.onFinish();
						}}
					>
						Finish
					</Button>
				</div>
			</div>
			<div
				className="create-modal-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h5>Invite</h5>
				<div className="button-container">
					<Input
						placeholder="Name / Id"
						onChange={(e) => {
							setCurrent(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							addPerson();
						}}
					>
						Add
					</Button>
				</div>
				{invited.length > 0 && (
					<div className="invited-container">
						{invited.map((inv, index) => {
							return (
								<div
									key={index}
									className="invited"
								>
									<h6>+ {inv}</h6>{" "}
									<Button
										onClick={() => {
											removePerson(inv);
										}}
									>
										Remove
									</Button>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
