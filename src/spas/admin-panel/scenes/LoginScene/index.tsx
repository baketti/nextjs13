import React, { memo } from "react";
import { useLoginScene } from "./index.hooks";
import { Box } from "@mui/material";

type LoginSceneProps = {};

export const LoginScene = memo(({}: LoginSceneProps) => {
  const {} = useLoginScene();

  return <Box>LOGIN SCENE</Box>;
});

LoginScene.displayName = "LoginScene";
