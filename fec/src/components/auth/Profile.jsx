import {
  Avatar,
  Card,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificUserPosts } from "../../apis/PostApi";
import Userpostcard from "./Userpostcard";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userposts, setUserposts] = useState([]);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    //object conversion
    const user = JSON.parse(userData);
    setUsername(user.name);
    setUseremail(user.email);
    // console.log(user.name)
    // console.log(window.location.href)
    getData();
    // console.log(userposts)
  }, [userposts]);
  const getData = () => {
    const allposts = specificUserPosts();
    allposts.then((data) => {
      setUserposts(data.data);
      // console.log(data.data);
    });
  };

  return (
    <>
      <Container
      maxWidth="xl"
      >
      <Grid container spacing={3} justifyContent="space-around">
        <Grid
          item
          justifyContent="center"
          // marginLeft="26px"
          // marginRight="26px"
          sx={12}
          sm={12}
          md={12}
          lg={12}
        >
          <Card elevation={0} className="animate__animated animate__fadeIn">
            <CardHeader
              avatar={<Avatar> {username[0]} </Avatar>}
              title={username}
              subheader={useremail}
            />
          </Card>
        </Grid>
      </Grid>
      </Container>
              <br />
      <Container
      maxWidth="xl"
      >
      <Grid container spacing={3}>
        {userposts.map((posts) => (
          <Grid
          container
          item
          key={ posts._id }
          justifyContent="center"
          sx={12}
          sm={12}
          md={6}
          lg={6}
          >
            <Userpostcard posts={ posts } getData={ getData }/>
          </Grid>
        )).reverse()}
      </Grid>
      </Container>
    </>
  );
};

export default Profile;
