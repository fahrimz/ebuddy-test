import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Typography from "../atoms/Typography";
import Button from "../atoms/Button";
import UserDataDisplay from "../molecules/UserDataDisplay";
import UpdateUserForm from "../molecules/UpdateUserForm";
import { AppDispatch, RootState } from "../../store";
import { fetchUser, updateUser } from "../../store/slices/userSlice";
import { User } from "@/apis/user";
import { useRouter } from "next/navigation";
import { LoginError } from "@/apis/error";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, updateStatus, updateError } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // redirect to login if error is related to token
    if (
      [LoginError.INVALID_TOKEN, LoginError.NO_TOKEN_PROVIDED].includes(
        error ?? ""
      )
    ) {
      localStorage.removeItem("authToken");
      router.replace("/");
    }
  }, [error, router]);

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
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchUser}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? "Loading..." : "Fetch User Data"}
        </Button>

        <UserDataDisplay user={user} loading={loading} error={error} />

        <UpdateUserForm
          user={user}
          updateStatus={updateStatus}
          updateError={updateError}
          onSubmit={handleUpdateUser}
        />
      </Box>
    </Container>
  );
};

export default UserProfile;
