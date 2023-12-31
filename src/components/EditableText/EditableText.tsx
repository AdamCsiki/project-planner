import {
	Box,
	TextField,
	Typography,
	TypographyProps,
	TypographyVariant,
	InputProps,
	SxProps,
	TextFieldVariants,
	InputBaseComponentProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../../Theme";

interface ExtendedProps {
	children: string;
	onFinish: (value: string) => void;
	onFinal?: () => void;
	containerSx?: SxProps;
	textFieldSx?: SxProps;
	inputProps?: InputBaseComponentProps;
	typographySx?: SxProps;
	multiline?: boolean;
	variant?: TypographyVariant;
	isActive?: boolean;
	textFieldVariant?: TextFieldVariants;
}

export function EditableText(props: ExtendedProps) {
	const {
		children,
		onFinish,
		onFinal,
		containerSx,
		textFieldSx,
		inputProps,
		typographySx,
		variant,
		isActive,
		textFieldVariant,
		multiline,
	} = props;

	const [active, setActive] = useState(isActive || false);
	const [value, setValue] = useState(children);

	useEffect(() => {
		setValue(children);
	}, [children]);

	return (
		<Box
			onClick={() => {
				setActive(true);
			}}
			onBlur={() => {
				if (value !== children) {
					onFinish(value);
				}
				setActive(false);
				onFinal?.();
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					setActive(false);
				}
			}}
			sx={{
				minWidth: "3rem",
				minHeight: "1rem",

				display: "flex",
				justifyContent: "center",
				alignItems: "center",

				":hover": {
					borderRadius: 1,
					backgroundColor: "rgba(0, 0, 0, 0.05)",
					cursor: "pointer",
				},
				...containerSx,
			}}
		>
			{active ? (
				<TextField
					fullWidth
					variant={textFieldVariant ?? "outlined"}
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					sx={{
						width: "100%",
						margin: 0,
						...textFieldSx,
					}}
					inputProps={{
						...inputProps,
						style: {
							width: `${
								value && value.length ? value.length : 2
							}rem`,
							maxWidth: "100%",

							margin: 0,
							paddingLeft: 1,
							paddingRight: 1,

							fontSize:
								theme.typography[variant || "body1"].fontSize,
							fontWeight:
								theme.typography[variant || "body1"].fontWeight,
							letterSpacing:
								theme.typography[variant || "body1"]
									.letterSpacing,
							lineHeight:
								theme.typography[variant || "body1"].lineHeight,
							...inputProps?.style,
						},
					}}
					onFocus={(e) => {
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length
						);
					}}
					autoFocus
					multiline={multiline ?? true}
				/>
			) : (
				<Typography
					sx={{
						width: "100%",
						p: 2,
						overflowWrap: "break-word",

						...typographySx,
					}}
					variant={variant}
				>
					{children && children.length > 0 ? children : "Edit..."}
				</Typography>
			)}
		</Box>
	);
}
