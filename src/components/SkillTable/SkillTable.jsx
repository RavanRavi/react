import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { MoreVert, Info } from "@mui/icons-material";
import { deleteSkill, updateSkill } from "../../redux/slices/avatarSlice";
import CustomTextField from "../../utils/CustomTextField";

const SkillTable = ({ avatarId, newSkills, setNewSkills, filteredSkills }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(null);
  const [currentSkillType, setCurrentSkillType] = useState(null);
  const [errors, setErrors] = useState({});

  const handleMenuOpen = (event, index, isExisting) => {
    setAnchorEl(event.currentTarget);
    setCurrentSkillIndex(index);
    setCurrentSkillType(isExisting ? "existing" : "new");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentSkillIndex(null);
    setCurrentSkillType(null);
  };

  const handleDeleteSkill = () => {
    if (currentSkillType === "existing") {
      dispatch(deleteSkill({ avatarId, skillIndex: currentSkillIndex }));
    } else {
      setNewSkills(newSkills?.filter((_, i) => i !== currentSkillIndex));
    }
    handleMenuClose();
  };

  const handleEditSkill = () => {
    const updateSkills = (skills) =>
      skills?.map((skill, i) =>
        i === currentSkillIndex ? { ...skill, editing: true } : skill
      );
    if (currentSkillType === "existing") {
      dispatch(updateSkill({ avatarId, skills: updateSkills(filteredSkills) }));
    } else {
      setNewSkills(updateSkills(newSkills));
    }
    handleMenuClose();
  };

  const handleUpdateSkill = () => {
    const skill =
      currentSkillType === "existing"
        ? filteredSkills[currentSkillIndex]
        : newSkills[currentSkillIndex];
    if (!skill.name || !skill.rating) {
      setErrors((prev) => ({
        ...prev,
        [currentSkillIndex]: {
          name: !skill.name,
          rating: !skill.rating,
        },
      }));
      return;
    }

    const updateSkills = (skills) =>
      skills?.map((skill, i) =>
        i === currentSkillIndex ? { ...skill, editing: false } : skill
      );
    if (currentSkillType === "existing") {
      dispatch(updateSkill({ avatarId, skills: updateSkills(filteredSkills) }));
    } else {
      setNewSkills(updateSkills(newSkills));
    }
    handleMenuClose();
  };

  const handleChange = (index, field, value, isExisting) => {
    if (currentSkillType === "existing" && !filteredSkills[index].editing)
      return;
    if (currentSkillType === "new" && !newSkills[index].editing) return;

    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: !value,
      },
    }));

    const updateSkills = (skills) =>
      skills?.map((skill, i) =>
        i === index ? { ...skill, [field]: value, isUpdated: true } : skill
      );
    if (isExisting) {
      dispatch(updateSkill({ avatarId, skills: updateSkills(filteredSkills) }));
    } else {
      setNewSkills(updateSkills(newSkills));
    }
  };

  const handleBlur = (index, field, value) => {
    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: !value,
      },
    }));
  };

  return (
    <Paper style={{ marginTop: "10px" }}>
      <Table data-testid="skill-table">
        <TableHead>
          <TableRow>
            <TableCell>Skill</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSkills?.length > 0
            ? filteredSkills?.map((skill, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <CustomTextField
                      value={skill?.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value, true)
                      }
                      onBlur={(e) => handleBlur(index, "name", e.target.value)}
                      error={skill.editing && errors[index]?.name}
                      disabled={!skill.editing}
                    />
                    {skill.editing && errors[index]?.name && (
                      <Tooltip title="Skill name is required" placement="top">
                        <Info color="error" />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <CustomTextField
                      value={skill?.rating}
                      onChange={(e) =>
                        handleChange(index, "rating", e.target.value, true)
                      }
                      onBlur={(e) =>
                        handleBlur(index, "rating", e.target.value)
                      }
                      error={skill.editing && errors[index]?.rating}
                      disabled={!skill.editing}
                    />
                    {skill.editing && errors[index]?.rating && (
                      <Tooltip title="Rating is required" placement="top">
                        <Info color="error" />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, index, true)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : !newSkills?.length && (
                <TableRow>
                  <TableCell colSpan={3}>No skills found.</TableCell>
                </TableRow>
              )}
          {newSkills?.map((skill, index) => (
            <TableRow key={index}>
              <TableCell>
                <CustomTextField
                  value={skill.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value, false)
                  }
                  onBlur={(e) => handleBlur(index, "name", e.target.value)}
                  error={skill.editing && errors[index]?.name}
                  disabled={!skill.editing}
                />
                {skill.editing && errors[index]?.name && (
                  <Tooltip title="Skill name is required" placement="top">
                    <Info color="error" />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <CustomTextField
                  value={skill.rating}
                  onChange={(e) =>
                    handleChange(index, "rating", e.target.value, false)
                  }
                  onBlur={(e) => handleBlur(index, "rating", e.target.value)}
                  error={skill.editing && errors[index]?.rating}
                  disabled={!skill.editing}
                />
                {skill.editing && errors[index]?.rating && (
                  <Tooltip title="Rating is required" placement="top">
                    <Info color="error" />
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, index, false)}>
                  <MoreVert />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {currentSkillType && (
          <>
            <MenuItem
              onClick={() =>
                currentSkillType === "existing"
                  ? filteredSkills[currentSkillIndex]?.editing
                    ? handleUpdateSkill()
                    : handleEditSkill()
                  : newSkills[currentSkillIndex]?.editing
                  ? handleUpdateSkill()
                  : handleEditSkill()
              }
            >
              {currentSkillType === "existing"
                ? filteredSkills[currentSkillIndex]?.editing
                  ? "Update"
                  : "Edit"
                : newSkills[currentSkillIndex]?.editing
                ? "Update"
                : "Edit"}
            </MenuItem>
            <MenuItem onClick={handleDeleteSkill}>Delete</MenuItem>
          </>
        )}
      </Menu>
    </Paper>
  );
};

export default SkillTable;
