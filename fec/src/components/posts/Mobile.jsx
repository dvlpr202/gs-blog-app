import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificCateMobile } from "../../apis/PostApi";
import MobilePostCard from "./MobilePostCard";

const Mobile = () => {
    const [mobileposts, setMobileposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(newsposts);
  }, []);
  const getData = () => {
    const allposts = specificCateMobile();
    allposts.then((data) => {
      setMobileposts(data.data);
    //   console.log(data.data);
    });
  };
  return (
    <>
        <Container maxWidth="xl">
        <Grid container spacing={3}>
          {mobileposts.map((mobileposts) => (
            <Grid
              container
              item
              key={mobileposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <MobilePostCard mobileposts={mobileposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  )
}

export default Mobile