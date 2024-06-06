import avatars from "../mockData/avatars";

export const fetchAvatars = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(avatars);
    }, 1000);
  });
};
