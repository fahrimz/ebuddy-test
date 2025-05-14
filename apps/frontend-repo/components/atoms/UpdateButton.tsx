import { Button } from "@mui/material";

export type UpdateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export const UpdateButton = () => {
  return <Button>Update</Button>;
};
