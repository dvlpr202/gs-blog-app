import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificCateWeb } from "../../apis/PostApi";
import WebPostCard from "./WebPostCard";

const Web = () => {
  const [webposts, setWebposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(newsposts);
  }, []);
  const getData = () => {
    const allposts = specificCateWeb();
    allposts.then((data) => {
      setWebposts(data.data);
    //   console.log(data.data);
    });
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {webposts.map((webposts) => (
            <Grid
              container
              item
              key={webposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <WebPostCard webposts={webposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  )
}

export default Web