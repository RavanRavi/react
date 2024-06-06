import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAvatars } from "../../api/avatarApi";

export const fetchAvatarsApi = createAsyncThunk(
  "avatars/fetchAvatars",
  async () => {
    const response = await fetchAvatars();
    return response;
  }
);

const initialState = {
  avatars: [],
  loading: false,
  error: null,
};

const avatarSlice = createSlice({
  name: "avatars",
  initialState,
  reducers: {
    addSkill: (state, action) => {
      const { avatarId, newSkill } = action.payload;
      const avatar = state.avatars.find((a) => a.id === avatarId);
      if (avatar) {
        avatar.skills.push(newSkill);
      }
    },
    deleteSkill: (state, action) => {
      const { avatarId, skillIndex } = action.payload;
      const avatar = state.avatars.find((a) => a.id === avatarId);
      if (avatar) {
        avatar.skills.splice(skillIndex, 1);
      }
    },
    updateSkill: (state, action) => {
      const { avatarId, skills } = action.payload;
      const avatar = state.avatars.find((a) => a.id === avatarId);
      if (avatar) {
        avatar.skills = skills;
      }
    },
    updateSkillsInStore: (state, action) => {
      const { avatarId, newSkills } = action.payload;
      const avatar = state.avatars.find((a) => a.id === avatarId);
      if (avatar) {
        avatar.skills = avatar.skills.concat(newSkills);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvatarsApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvatarsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.avatars = action?.payload;
      })
      .addCase(fetchAvatarsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const { addSkill, updateSkill, deleteSkill, updateSkillsInStore } =
  avatarSlice.actions;

export default avatarSlice.reducer;
