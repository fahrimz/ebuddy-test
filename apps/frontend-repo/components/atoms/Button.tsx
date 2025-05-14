import { ButtonProps, Button as DefaultButton } from "@mui/material";

const Button: React.FC<ButtonProps> = (props) => {
  return <DefaultButton {...props} />
}

export default Button;
