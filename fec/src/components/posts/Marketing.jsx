import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { specificCateMarketing } from "../../apis/PostApi";
import MarketingPostCard from "./MarketingPostCard";

const Marketing = () => {
    const [marketingposts, setMarketingposts] = useState([]);
  useEffect(() => {
    getData();
    // console.log(newsposts);
  }, []);
  const getData = () => {
    const allposts = specificCateMarketing();
    allposts.then((data) => {
      setMarketingposts(data.data);
    //   console.log(data.data);
    });
  };
  return (
    <>
        <Container maxWidth="xl">
        <Grid container spacing={3}>
          {marketingposts.map((marketingposts) => (
            <Grid
              container
              item
              key={marketingposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <MarketingPostCard marketingposts={marketingposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  )
}

export default Marketing