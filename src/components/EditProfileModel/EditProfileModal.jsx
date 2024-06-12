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
import { useTranslation } from "react-i18next";
// import debounce from "lodash.debounce";

const EditProfileModal = ({ avatar, onClose }) => {
  const dispatch = useDispatch();
  const avatars = useSelector((state) => state?.avatars?.avatars);
  const [searchType, setSearchType] = useState("skill");
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState(
    avatars.find((a) => a.id === avatar.id)?.skills || []
  );

  // const debouncedSetSearchQuery = useCallback(
  //   debounce((query) => {
  //     setSearchQuery(query);
  //   }, 300),
  //   []
  // );

  // const handleSearchChange = (e) => {
  //   debouncedSetSearchQuery(e.target.value);
  // };

  const { t } = useTranslation();

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) =>
      searchType === "skill"
        ? skill?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        : skill?.rating?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  }, [skills, searchQuery, searchType]);

  const handleAddSkill = () => {
    const newSkillObject = { name: "", rating: "", editing: true, isNew: true };
    setSkills([...skills, newSkillObject]);
  };

  const handleApply = () => {
    dispatch(updateSkillsInStore({ avatarId: avatar.id, newSkills: skills }));
    onClose();
  };

  const handleCancel = () => {
    setSkills(avatars.find((a) => a.id === avatar.id)?.skills || []);
    onClose();
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    setSkills(updatedSkills);
  };

  const handleSkillBlur = (index, field, value) => {
    if (!value) {
      const updatedSkills = skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value, error: true } : skill
      );
      setSkills(updatedSkills);
    }
  };

  const handleSkillDelete = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSkillEditToggle = (index) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, editing: !skill.editing } : skill
    );
    setSkills(updatedSkills);
  };

  const hasEmptyFields = useMemo(() => {
    return skills.some((skill) => !skill?.name || !skill?.rating);
  }, [skills]);

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{ style: { height: "80vh", borderRadius: "20px" } }}
      data-testid="edit-profile-modal"
    >
      <ModalHeader title={t("Edit Profile")} onClose={onClose} />
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
                  label={t("Search Skill")}
                  variant="outlined"
                  margin="normal"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // onChange={handleSearchChange}
                  inputProps={{ "data-testid": "search-skill-input" }}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  fullWidth
                  select
                  label={t("Select Skill/Rating")}
                  variant="outlined"
                  margin="normal"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  inputProps={{ "data-testid": "select-skill-rating" }}
                >
                  <MenuItem value="skill">{t("Skill")}</MenuItem>
                  <MenuItem value="rating">{t("Rating")}</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
            <SkillTable
              skills={filteredSkills}
              onSkillChange={handleSkillChange}
              onSkillBlur={handleSkillBlur}
              onSkillDelete={handleSkillDelete}
              onSkillEditToggle={handleSkillEditToggle}
              setSkills={setSkills}
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
                {t("Add Skill")}
              </Button>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton text={t("Cancel")} onClick={handleCancel} />
        {hasEmptyFields && (
          <Tooltip
            title={t("Please fill in all fields before applying")}
            placement="top"
          >
            <div>
              <CustomButton
                text={t("Apply")}
                onClick={handleApply}
                disabled={hasEmptyFields}
              />
            </div>
          </Tooltip>
        )}
        {!hasEmptyFields && (
          <CustomButton
            text={t("Apply")}
            onClick={handleApply}
            disabled={hasEmptyFields}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EditProfileModal);