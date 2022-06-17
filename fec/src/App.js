import { createTheme, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import "animate.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CatHeader from "./components/CatHeader";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import "./App.css";
import Login from "./components/auth/Login";
import { initialState, reducer } from "./reducers/UserReducer";
import Profile from "./components/auth/Profile";
import Compost from "./components/posts/Compost";
import Newpost from "./components/auth/Newpost";
import UpdatePost from "./components/auth/UpdatePost";
import News from "./components/posts/News";
import Tech from "./components/posts/Tech";
import Design from "./components/posts/Design";
import Web from "./components/posts/Web";
import Marketing from "./components/posts/Marketing";
import Mobile from "./components/posts/Mobile";
import Search from "./components/posts/Search";

export const UserContext = createContext()
const Routing = () => {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if ( user ) {
      dispatch({ type: "USER", payload: user })
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [])
  return (
    <>
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/compost/:id" element={ <Compost /> } />
      <Route path="/newpost" element={ <Newpost /> } />
      <Route path="/updatepost/:id" element={ <UpdatePost /> } />
      <Route path="/business" element={ <News /> } />
      <Route path="/tech" element={ <Tech /> } />
      <Route path="/design" element={ <Design /> } />
      <Route path="/web" element={ <Web /> } />
      <Route path="/marketing" element={ <Marketing /> } />
      <Route path="/mobile" element={ <Mobile /> } />
      <Route path="/search" element={ <Search /> } />
    </Routes>
    </>
  )
}

function App() {
  const blogName = "Blog Synthetic";
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e4356",
        light: "#f3f8fa"
      },
      secondary: {
        main: "#F4F2F3"
      }
    },
    typography: {
      fontFamily: "Roboto Condensed",
      fontWeightLight: "300",
      fontWeightRegular: "300",
      fontWeightMedium: "400",
      fontWeightBold: "700"
    }
  })
  const [ state, dispatch ] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <React.Fragment>
      <ThemeProvider theme={ theme }>
        <Router>
            <NavBar blogName={blogName} />
            <CatHeader />
            <Routing />
        </Router>
      </ThemeProvider>
    </React.Fragment>
    </UserContext.Provider>
  );
}

export default App;
