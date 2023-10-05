import { IconButtonProps, IconButton as MuiIconButton } from "@mui/material";

export default function IconButton(props: IconButtonProps) {
	return (
		<MuiIconButton
			{...props}
			sx={{
				...props.sx,
			}}
		>
			{props.children}
		</MuiIconButton>
	);
}
