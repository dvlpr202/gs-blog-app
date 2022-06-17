import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CatHeader = () => {
  const catLinks = [
    { id: 1, title: "Tech", url: "/tech" },
    { id: 2, title: "Design", url: "/design" },
    { id: 3, title: "Web", url: "/web" },
    { id: 4, title: "Business", url: "/business" },
    { id: 5, title: "Marketing", url: "/marketing" },
    { id: 6, title: "Mobile", url: "/mobile" },
  ];
  return (
    <>
      <Grid container spacing={3} justifyContent="space-around">
        {catLinks.map((nav) => (
            <Grid
            container
            item
            justifyContent="center"
            sx={12}
            sm={12}
            md={1}
            lg={1}
            margin="5px"
          >
            <Button
            variant="standard"
            component={ Link }
            to={ nav.url }
            >{ nav.title }</Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CatHeader;
