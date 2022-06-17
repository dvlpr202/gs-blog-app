import { Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { specificCateSearch } from "../../apis/PostApi";
import SearchPostCard from "./SearchPostCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const getData = () => {
    const searchposts = specificCateSearch(search);
    searchposts.then((data) => {
      setSearchdata(data.data);
      // console.log(data)
    });
  };
  const gotVal = () => {
    if (search === "") {
      return [
        <Box
        display="flex"
        justifyContent="center"
        >
            <Typography variant="h4">"Please Type Something"</Typography>
        </Box>
      ];
    }
  };
  useEffect(() => {
    getData();
    // console.log(searchdata)
  }, [search]);
  return (
    <>
      <Container maxWidth="xl">
        <form noValidate autoCapitalize="off">
          <TextField
            label="Search By Category"
            type="text"
            fullWidth
            required
            name="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <br />
        {gotVal()}
        <br />
        <Grid container spacing={3}>
          {searchdata.map((searchposts) => (
            <Grid
              container
              item
              key={searchposts._id}
              justifyContent="center"
              sx={12}
              sm={12}
              md={6}
              lg={6}
            >
              <SearchPostCard searchposts={searchposts} getData={getData} />
            </Grid>
          )).reverse()}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
