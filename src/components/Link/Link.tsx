import "./Link.style.css";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import {
	Link as MuiLink,
	LinkProps as MuiLinkProps,
	SxProps,
	TypographyVariant,
} from "@mui/material";

interface ExtendedProps extends LinkProps {
	component?: any;
	variant?: TypographyVariant;
	sx?: SxProps;
}

export default function Link(props: ExtendedProps) {
	return (
		<MuiLink
			{...props}
			component={props.component || RouterLink}
			sx={{ ...props.sx, textDecorationColor: "primary" }}
			variant={props.variant}
		>
			{props.children}
		</MuiLink>
	);
}
