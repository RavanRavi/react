import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Info, MoreVert } from "@mui/icons-material";
import CustomTextField from "../../utils/CustomTextField";
import { useTranslation } from "react-i18next";

const SkillTable = ({
  skills,
  onSkillChange,
  onSkillBlur,
  onSkillDelete,
  onSkillEditToggle,
  setSkills,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(null);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentSkillIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentSkillIndex(null);
  };

  const handleSkillAction = (actionType) => {
    const currentSkill = skills[currentSkillIndex];
    if (!currentSkill.name || !currentSkill.rating) {
      alert("Skill name and rating cannot be empty.");
      return;
    }
    onSkillEditToggle(currentSkillIndex);
    if (actionType === "apply" || actionType === "update") {
      const updatedSkills = [...skills];
      updatedSkills[currentSkillIndex] = {
        ...currentSkill,
        isNew: false,
        editing: false,
      };
      setSkills(updatedSkills);
    }
    handleMenuClose();
  };

  const handleDeleteSkillClick = () => {
    onSkillDelete(currentSkillIndex);
    handleMenuClose();
  };

  return (
    <Paper style={{ marginTop: "10px" }}>
      <Table data-testid="skill-table">
        <TableHead>
          <TableRow>
            <TableCell>{t("Skill")}</TableCell>
            <TableCell>{t("Rating")}</TableCell>
            <TableCell>{t("Actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skills?.length > 0 ? (
            skills.map((skill, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CustomTextField
                    value={skill.name}
                    onChange={(e) =>
                      onSkillChange(index, "name", e.target.value)
                    }
                    onBlur={(e) => onSkillBlur(index, "name", e.target.value)}
                    error={!skill.name}
                    helperText={!skill.name && t("Skill name is required")}
                    inputProps={{
                      "data-testid": `skill-name-${index}`,
                    }}
                    disabled={!skill.editing}
                    aria-label="Name"
                  />
                  {skill.editing && !skill.name && (
                    <Tooltip
                      title={t("Skill name is required")}
                      placement="top"
                    >
                      <Info color="error" />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <CustomTextField
                    value={skill.rating}
                    onChange={(e) =>
                      onSkillChange(index, "rating", e.target.value)
                    }
                    onBlur={(e) => onSkillBlur(index, "rating", e.target.value)}
                    error={!skill.rating}
                    helperText={!skill.rating && t("Rating is required")}
                    inputProps={{
                      "data-testid": `skill-rating-${index}`,
                    }}
                    disabled={!skill.editing}
                    aria-label="Rating"
                  />
                  {skill.editing && !skill.rating && (
                    <Tooltip title={t("Rating is required")} placement="top">
                      <Info color="error" />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, index)}
                    aria-controls={`skill-menu-${index}`}
                    aria-haspopup="true"
                    data-testid={`skill-actions-button-${index}`}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id={`skill-menu-${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl) && currentSkillIndex === index}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() =>
                        handleSkillAction(
                          skills[currentSkillIndex]?.isNew
                            ? "apply"
                            : skills[currentSkillIndex]?.editing
                            ? "update"
                            : "edit"
                        )
                      }
                    >
                      {skills[currentSkillIndex]?.isNew
                        ? t("Apply")
                        : skills[currentSkillIndex]?.editing
                        ? t("Update")
                        : t("Edit")}
                    </MenuItem>
                    <MenuItem onClick={handleDeleteSkillClick}>
                      {t("Delete")}
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                {t("No skills available")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default React.memo(SkillTable);
