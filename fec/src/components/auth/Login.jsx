import { Alert, Box, Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { culog } from "../../apis/UserApi";
import { UserContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext)
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ emailerr, setEmailerr ] = useState(false);
  const [ passworderr, setPassworderr ] = useState(false);

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
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
    culog({ email, password })
    .then((udata) => {
      // console.log(udata.data)
      localStorage.setItem("jwt", udata.data.token)
      localStorage.setItem("user", JSON.stringify(udata.data.user))
      dispatch({ type: "USER", payload: udata.data.user })
      openLogSnack()
    })
    .catch((err) => {
      console.log(err)
    })
    // console.log({ email, password })
  }
  const [logsnack, setLogsnack] = React.useState(false);

  const openLogSnack = () => {
    setLogsnack(true);
    setTimeout(closeLogSnack, 2000)
  };

  const closeLogSnack = () => {
    setLogsnack(false);
    navigate("/")
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
        }}
        // className="animate__animated animate__fadeIn"
      >
        <Container maxWidth="xs"
        className="animate__animated animate__slideInLeft"
        >
          <Typography variant="h2" justifyContent="center">
            Login <br /> To <br /> Your <br /> Account
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
            <form
            noValidate
            autoComplete="off"
            onSubmit={ submitHandler }
            >
              <TextField
                sx={{
                  marginBottom: 1,
                }}
                label="Your Email"
                type="text"
                fullWidth
                required
                onChange={ (e) => setEmail(e.target.value) }
                error={ emailerr }
              />
              <TextField
                sx={{
                  marginBottom: 1,
                }}
                label="Password"
                type="password"
                fullWidth
                required
                onChange={ (e) => setPassword(e.target.value) }
                error={ passworderr }
              />
              <Button
              variant="outlined"
              type="submit"
              fullWidth
              >
                Login
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      {/* snackbar for register */}
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={logsnack} autoHideDuration={6000} onClose={closeLogSnack}>
        <Alert onClose={closeLogSnack} severity="success" sx={{ width: '100%' }}>
          Successfully Logged In!
        </Alert>
      </Snackbar>
    </Stack>
    </>
  );
};

export default Login;
