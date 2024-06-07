import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./AvatarCard.css";
import CustomButton from "../../utils/CustomButton";

const AvatarCard = ({ avatar, onEdit }) => {
  const { t } = useTranslation();

  return (
    <Card
      className="avatar-card"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        alt={avatar.name}
        image={avatar.image}
        sx={{
          objectFit: "contain",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: 200,
        }}
      />
      <CardActions sx={{ justifyContent: "center" }}>
        <CustomButton text={t("Edit Profile")} onClick={onEdit} />
      </CardActions>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {avatar.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          align="center"
        >
          <b>{t("Skills")}</b>
        </Typography>
        {avatar?.skills && avatar?.skills?.length > 0 ? (
          avatar?.skills?.map((skill, index) => (
            <Typography
              key={index}
              variant="body2"
              color="textSecondary"
              gutterBottom
              align="center"
              data-testid={`skill-element-${index}`}
            >
              <b>{skill?.name} : </b>
              {skill?.rating}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            {t("No skills to display")}
          </Typography>
        )}
      </CardContent>
      <div style={{ flexGrow: 1 }}></div>{" "}
    </Card>
  );
};

export default AvatarCard;
