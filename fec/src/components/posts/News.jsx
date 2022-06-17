import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificCateNews } from "../../apis/PostApi";
import NewsPostCard from "./NewsPostCard";

const News = () => {
  const [newsposts, setNewsposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(newsposts);
  }, []);
  const getData = () => {
    const allposts = specificCateNews();
    allposts.then((data) => {
      setNewsposts(data.data);
    //   console.log(data.data);
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {newsposts.map((newsposts) => (
            <Grid
              container
              item
              key={newsposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <NewsPostCard newsposts={newsposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  );
};

export default News;
