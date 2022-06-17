import {
  Container,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { showAllPosts } from "../../apis/PostApi";
import RecentPostsCard from "./RecentPostsCard";

const RecentPosts = () => {
  const [reposts, setReposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(reposts)
  }, []);
  const getData = () => {
    const allposts = showAllPosts();
    allposts.then((data) => {
      setReposts(data.data);
      // console.log(data.data);
    });
  };
  return (
    <>
      <Container
      maxWidth="xl"
      >
      <Grid container spacing={3}>
        {reposts.map((reposts) => (
          <Grid
          container
          item
          key={ reposts._id }
          justifyContent="center"
          sx={12}
          sm={12}
          md={6}
          lg={6}
          >
            <RecentPostsCard reposts={ reposts } getData={ getData } />
          </Grid>
        )).reverse()}
      </Grid>
      </Container>
    </>
  )
}

export default RecentPosts