import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Typography from "../atoms/Typography";
import Button from "../atoms/Button";
import UserDataDisplay from "../molecules/UserDataDisplay";
import UpdateUserForm from "../molecules/UpdateUserForm";
import { AppDispatch, RootState } from "../../store";
import {
  fetchUser,
  resetError,
  updateUser,
} from "../../store/slices/userSlice";
import { useRouter } from "next/navigation";
import { LoginError, User } from "@ebuddy/entities";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, updateStatus, updateError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // redirect to login if error is related to token
    if (
      error &&
      error.length > 0 &&
      [LoginError.INVALID_TOKEN, LoginError.NO_TOKEN_PROVIDED].includes(error)
    ) {
      localStorage.removeItem("authToken");
      router.replace("/");
    }

    return () => {
      dispatch(resetError());
    };
  }, [error]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleFetchUser = () => {
    dispatch(fetchUser());
  };

  const handleUpdateUser = (userData: Partial<User>) => {
    dispatch(updateUser({ userData }));
  };

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchUser}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch User Data"}
        </Button>
      </Box>
      <Box display="flex" flexDirection={{ xs: 'column', sm: "row" }} gap={4}>
        <Box flex={1}>
          <UserDataDisplay user={user} loading={loading} error={error} />
        </Box>
        <Box flex={1}>
          <UpdateUserForm
            user={user}
            updateStatus={updateStatus}
            updateError={updateError}
            onSubmit={handleUpdateUser}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
