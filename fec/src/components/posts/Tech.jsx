import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificCateTech } from "../../apis/PostApi";
import TechPostsCard from "./TechPostsCard";

const Tech = () => {
    const [techposts, setTechposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(newsposts);
  }, []);
  const getData = () => {
    const allposts = specificCateTech();
    allposts.then((data) => {
      setTechposts(data.data);
    //   console.log(data.data);
    });
  };
  return (
    <>
        <Container maxWidth="xl">
        <Grid container spacing={3}>
          {techposts.map((techposts) => (
            <Grid
              container
              item
              key={techposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <TechPostsCard techposts={techposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  )
}

export default Tech