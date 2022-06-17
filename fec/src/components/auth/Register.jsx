import { Alert, Box, Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cureg } from "../../apis/UserApi";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameerr, setNameerr] = useState(false);
  const [usernameerr, setUsernameerr] = useState(false);
  const [emailerr, setEmailerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    if ( !name ) {
      return setNameerr(true)
    } else {
      setNameerr(false)
    }
    if ( !username ) {
      return setUsernameerr(true)
    } else {
      setUsernameerr(false)
    }
    if ( !email ) {
      return setEmailerr(true)
    } else {
      setEmailerr(false)
    }
    if ( !password ) {
      return setPassworderr(true)
    } else {
      setPassworderr(false)
    }
    cureg({name, username, email, password})
    openRegSnack()
    // console.log({ name, username, email, password });
  };
  const [regsnack, setRegsnack] = React.useState(false);

  const openRegSnack = () => {
    setRegsnack(true);
    setTimeout(closeRegSnack, 2000)
  };

  const closeRegSnack = () => {
    setRegsnack(false);
    navigate("/login")
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "85vh",
          // background:"grey"
        }}
        // className="animate__animated animate__fadeIn"
      >
        <Container maxWidth="xs"
        className="animate__animated animate__slideInLeft"
        >
          <Typography variant="h2" justifyContent="center">
            Register <br /> Your <br /> Account
          </Typography>
        </Container>
        <Container maxWidth="xs"
        className="animate__animated animate__slideInRight"
        >
          <Box
            sx={{
              margin: 3,
            }}
          >
            <form noValidate autoComplete="off" onSubmit={submitHandler}>
              <TextField
                label="Name"
                type="text"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
                error={ nameerr }
                sx={{
                  marginBottom: 1,
                }}
              />
              <TextField
                label="Username"
                type="text"
                fullWidth
                required
                onChange={(e) => setUsername(e.target.value)}
                error={ usernameerr }
                sx={{
                  marginBottom: 1,
                }}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
                error={ emailerr }
                sx={{
                  marginBottom: 1,
                }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
                error={ passworderr }
                sx={{
                  marginBottom: 1,
                }}
              />
              <Button type="submit" variant="outlined" fullWidth>
                Register
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      {/* snackbar for register */}
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={regsnack} autoHideDuration={6000} onClose={closeRegSnack}>
        <Alert onClose={closeRegSnack} severity="success" sx={{ width: '100%' }}>
          Successfully Registered!
        </Alert>
      </Snackbar>
    </Stack>
    </>
  );
};

export default Register;
