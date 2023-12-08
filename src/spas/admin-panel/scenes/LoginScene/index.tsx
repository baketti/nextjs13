import React, { memo } from "react";
import { useLoginScene } from "./index.hooks";
import { Box, Container } from "@mui/material";
import { LoginForm } from "@/components/LoginForm";
type LoginSceneProps = {};

export const LoginScene = memo(({}: LoginSceneProps) => {
  const {} = useLoginScene();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <LoginForm />
    </Container>
  );
});

LoginScene.displayName = "LoginScene";
