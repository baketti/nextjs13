import Head from "next/head";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  ThemeProvider,
} from "@mui/material";
import theme from "@/themes";
import { SignupForm } from "@/components/SignupForm";
import { LoginForm } from "@/components/LoginForm";
/*const Button = memo(({onClick,label,counterObject}:{
  onClick: ()=> void;
  label: string | number;
  counterObject:{
    counter:number
  }
}) => {
  const renderCount = useRef(0)
  renderCount.current++;
  return <button onClick={onClick}>{label} {counterObject.counter} - rendering {renderCount.current}</button>
});
Button.displayName = "Button"*/
export default function Home() {
  //const  count = useRef(0)
  //const [counter, setCounter] = useState(0);
  //const [counter2, setCounter2] = useState(0);
  //const handleClick = useCallback(() => {
  //  setCounter((prev)=>prev+1)
  //}, []);
  //console.log(count.current)

  //const counterObject = useMemo(()=>{
  //  return { counter }
  //},[counter])
  //const label = useMemo(()=>{
  //  let num = 5;
  //  for(let i=0;i<100000000;i++){
  //    num+=i;
  //  }
  //  return num;
  //},[])
  //<Button onClick={handleClick} label={label} counterObject={counterObject} />
  //<span>Clicked {counter}</span>
  //<button onClick={() => {    da mettere nel return per riprovare il rendering e capire gli hook di react
  //  setCounter2(counter2+1)
  //}}>Other button {counter2}</button>
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/*<Stack
          sx={{
            px:2,
            height:"100vh",
            bgcolor:"primary.main"
          }}
          alignItems="center"
          justifyContent="space-around">
            <Box><Button sx={{m: 0}} variant="contained">Hello World</Button></Box>
            <Box><Button sx={{m: 0}} variant="contained">Hello World</Button></Box>
            <Box><Button sx={{m: 0}} variant="contained">Hello World</Button></Box>
            <Stack direction="row" width="100%">
              <Button sx={{flex:2}} variant="contained">Hello World</Button>
              <Button sx={{flex:2}} variant="contained">Hello World</Button>
              <Button sx={{flex:2}} variant="contained">Hello World</Button>
            </Stack>
          </Stack>*/}
          <SignupForm />
        </Container>
        <Grid container></Grid>
      </ThemeProvider>
    </>
  );
}
