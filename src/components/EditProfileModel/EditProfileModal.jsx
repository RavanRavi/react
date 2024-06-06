import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSkillsInStore } from "../../redux/slices/avatarSlice";
import CustomButton from "../../utils/CustomButton";
import CustomTextField from "../../utils/CustomTextField";
import ModalHeader from "../../utils/ModalHeader";
import SkillTable from "../SkillTable/SkillTable";

const EditProfileModal = ({ avatar, onClose }) => {
  const dispatch = useDispatch();
  const avatars = useSelector((state) => state.avatars.avatars);
  const [searchType, setSearchType] = useState("skill");
  const [searchQuery, setSearchQuery] = useState("");
  const [newSkills, setNewSkills] = useState([]);

  const filteredSkills =
    avatars
      .find((a) => a.id === avatar.id)
      ?.skills?.filter((skill) =>
        searchType === "skill"
          ? skill?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          : skill?.rating?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      ) || [];

  const handleAddSkill = () => {
    const newSkillObject = { name: "", rating: "", editing: true, isNew: true };
    setNewSkills([...newSkills, newSkillObject]);
  };

  const handleApply = () => {
    // Update the Redux store with new skills
    dispatch(updateSkillsInStore({ avatarId: avatar.id, newSkills }));
    onClose();
  };

  const handleCancel = () => {
    setNewSkills([]);
    onClose();
  };

  const hasEmptyFields = useMemo(() => {
    return newSkills?.some((skill) => !skill?.name || !skill?.rating);
  }, [newSkills]);

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{ style: { height: "80vh", borderRadius: "20px" } }}
      data-testid="edit-profile-modal"
    >
      {" "}
      <ModalHeader title="Edit Profile" onClose={onClose} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src={avatar.image}
              alt={avatar.name}
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  label="Search Skill"
                  variant="outlined"
                  margin="normal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputProps={{ "data-testid": "search-skill-input" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  select
                  label="Select Skill/Rating"
                  variant="outlined"
                  margin="normal"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  inputProps={{ "data-testid": "select-skill-rating" }}
                >
                  <MenuItem value="skill">Skill</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
            <SkillTable
              avatarId={avatar.id}
              newSkills={newSkills}
              setNewSkills={setNewSkills}
              filteredSkills={filteredSkills}
            />
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleAddSkill}
                sx={{
                  borderRadius: 8,
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#000",
                  color: "#fff",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                style={{ marginTop: "10px", width: "100%" }}
                data-testid="add-skill-button"
              >
                Add Skill
              </Button>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton text="Cancel" onClick={handleCancel} />
        {hasEmptyFields && (
          <Tooltip
            title="Please fill in all fields before applying"
            placement="top"
          >
            <div>
              <CustomButton
                text="Apply"
                onClick={handleApply}
                disabled={hasEmptyFields}
              />
            </div>
          </Tooltip>
        )}
        {!hasEmptyFields && (
          <CustomButton
            text="Apply"
            onClick={handleApply}
            disabled={hasEmptyFields}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditProfileModal);
