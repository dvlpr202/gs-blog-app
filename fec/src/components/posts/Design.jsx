import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificCateDesign } from "../../apis/PostApi";
import DesignPostCard from "./DesignPostCard";

const Design = () => {
    const [designposts, setDesignposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(newsposts);
  }, []);
  const getData = () => {
    const allposts = specificCateDesign();
    allposts.then((data) => {
      setDesignposts(data.data);
    //   console.log(data.data);
    });
  };
  return (
    <>
        <Container maxWidth="xl">
        <Grid container spacing={3}>
          {designposts.map((designposts) => (
            <Grid
              container
              item
              key={designposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <DesignPostCard designposts={designposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  )
}

export default Design