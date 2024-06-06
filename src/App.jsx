import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import AvatarCard from "./components/Avatar/AvatarCard";
import EditProfileModal from "./components/EditProfileModel/EditProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatarsApi } from "./redux/slices/avatarSlice";
import ErrorComponent from "./utils/ErrorComponent";

// left over items validation and testing and refactoring and deploying
const App = () => {
  const dispatch = useDispatch();
  const avatars = useSelector((state) => state?.avatars?.avatars);
  const loading = useSelector((state) => state?.avatars?.loading);
  const error = useSelector((state) => state?.avatars.error);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    dispatch(fetchAvatarsApi());
  }, [dispatch]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  if (error) return <ErrorComponent errorMessage={error.message} />;

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        margin={5}
      >
        Applicant Profile List
      </Typography>
      <Grid container spacing={4}>
        {avatars.map((avatar) => (
          <Grid item key={avatar.id} xs={12} sm={6} md={4}>
            <AvatarCard
              avatar={avatar}
              onEdit={() => setSelectedAvatar(avatar)}
            />
          </Grid>
        ))}
      </Grid>
      {selectedAvatar && (
        <EditProfileModal
          avatar={selectedAvatar}
          onClose={() => setSelectedAvatar(null)}
        />
      )}
    </Container>
  );
};

export default App;
