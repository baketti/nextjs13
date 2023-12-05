import React, { memo } from "react";
import { useUsersScene } from "./index.hooks";
import { Typography } from "@mui/material";

type UsersSceneProps = {};

export const UsersScene = memo(({}: UsersSceneProps) => {
  const {} = useUsersScene();

  return <Typography>USERS</Typography>;
});

UsersScene.displayName = "UsersScene";
