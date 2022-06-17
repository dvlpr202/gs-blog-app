import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
  Badge,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  specificPost,
  commentPost,
  likePost,
  unlikePost,
  deletePost,
  showAllComments,
  deleteComment,
} from "../../apis/PostApi";
import moment from "moment";
import { UserContext } from "../../App";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CompostComments from "./CompostComments";

const Compost = () => {
  const { state, dispatch } = useContext(UserContext);
  const { id } = useParams();
  const [sdata, setSdata] = useState([]);
  const [posted, setPosted] = useState([]);
  const [likesarr, setLikesarr] = useState([]);
  const [commentsarr, setCommentsarr] = useState([]);
  const getSpecData = async () => {
    const specData = await specificPost(id);
    setSdata(specData.data);
    setPosted(specData.data.posted_by);
    setLikesarr(specData.data.likes);
    // console.log(commentsarr);
  };
  const getComments = async () => {
    const getAllComments = await showAllComments(id);
    setCommentsarr(getAllComments.data);
    // console.log(getAllComments.data);
  };
  const navigate = useNavigate();
  const stateData = JSON.parse(localStorage.getItem("user"));
  const stateId = stateData._id;
  const [likess, setLikess] = useState(
    likesarr.includes(stateId) ? true : false
  );
  const handleLikes = (id) => {
    if (state) {
      setLikess(!likess);
      if (likess === false) {
        likePost(id);
        console.log("liked");
      }
      if (likess === true) {
        unlikePost(id);
        console.log("unliked");
      }
      // getSpecData();
    } else {
      navigate("/login");
    }
  };
  const [sharedai, setSharedai] = React.useState(false);

  const openShareDai = () => {
    setSharedai(true);
  };

  const closeShareDai = () => {
    setSharedai(false);
  };

  const facebookCurl = window.location.href;
  const facebookLink = `https://facebook.com/sharer.php?${facebookCurl}`;
  const twitterCurl = window.location.href;
  const twitterLink = `https://twitter.com/intent/tweet?${twitterCurl}`;
  const whatsappCurl = window.location.href;
  const whatsappLink = `https://wa.me/?text=${whatsappCurl}`;

  const [commentdai, setCommentdai] = React.useState(false);

  const openCommentDai = () => {
    setCommentdai(true);
  };

  const closeCommentDai = () => {
    setCommentdai(false);
  };
  const addComment = (text, postId) => {
    commentPost(text, postId);
    closeCommentDai();
    console.log("comment posted");
    getSpecData()
    getComments();
  };
  const editVal = () => {
    const postedBy = posted._id;
    if (postedBy === stateId) {
      return (
        <IconButton component={Link} to={`/updatepost/${sdata._id}`}>
          <AutoFixHighIcon />
        </IconButton>
      );
    }
  };
  const [deldai, setDeldai] = React.useState(false);

  const openDelDai = () => {
    setDeldai(true);
  };

  const closeDelDai = () => {
    setDeldai(false);
  };
  const delPost = async (id) => {
    await deletePost(id);
    closeDelDai();
    navigate(-1);
  };
  const deleteVal = () => {
    const postedBy = posted._id;
    if (postedBy == stateId) {
      return (
        <IconButton onClick={openDelDai}>
          <DeleteForeverIcon />
        </IconButton>
      );
    }
  };
  useEffect(() => {
    getSpecData();
    getComments();
    console.log();
  }, [likess]);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid
            container
            item
            justifyContent="center"
            sx={12}
            sm={12}
            md={12}
            lg={12}
          >
            <Card maxWidth="1280" elevation={0} key={sdata._id}>
              <CardActions
                // disableSpacing
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Badge
                  badgeContent={likesarr.length}
                  color="primary"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <IconButton
                    onClick={() => {
                      handleLikes(sdata._id);
                    }}
                    sx={{
                      color: () => {
                        if (likesarr.includes(stateId)) {
                          return "red";
                        }
                      },
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Badge>
                <IconButton onClick={openShareDai}>
                  <ShareIcon />
                </IconButton>
                <Badge
                  badgeContent={commentsarr.length}
                  color="primary"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  <IconButton onClick={openCommentDai} sx={{ marginRight: 1 }}>
                    <CommentIcon />
                  </IconButton>
                </Badge>
                {editVal()}
                {deleteVal()}
              </CardActions>
              <br />
              <Card elevation={0}>
                <CardMedia
                  image={sdata.picture}
                  component="img"
                  maxHeight="720"
                />
              </Card>
              <CardHeader
                avatar={<Avatar>{/* { posted.name[0] } */}</Avatar>}
                // action={
                //   <IconButton>
                //     <BookmarkIcon />
                //   </IconButton>
                // }
                title={
                  <Typography variant="h6" color="textSecondary">
                    {posted.name} | {moment(sdata.created_at).fromNow()}
                  </Typography>
                }
                subheader={
                  <Typography color="textSecondary">
                    {posted.username}
                  </Typography>
                }
              />
              <br />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">{sdata.categories}</Typography>
              </CardContent>
              <br />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {sdata.sdesc}
                  <br />
                  {sdata.fdesc}
                </Typography>
              </CardContent>
              <br />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">
                  {moment(sdata.created_at).format("MMM Do YY")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            sx={12}
            sm={12}
            md={12}
            lg={12}
          >
            <Typography variant="subtitle2">
              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(e.target[0].value, sdata._id);
                }}
              >
                <TextField
                  label="Comment"
                  type="text"
                  name="comment"
                  fullWidth
                  multiline
                  required
                  sx={{
                    marginBottom: 1,
                  }}
                />
                <Button variant="outlined" type="submit" fullWidth>
                  Comment this
                </Button>
              </form>
              <br />
              {/* .filter((allcommentss, index) => (index - 5) > 5) */}
              {commentsarr
                .map((allcomments) => (
                  <CompostComments allcomments={ allcomments } getComments={ getComments } />
                ))
                .reverse()}
            </Typography>
          </Grid>
        </Grid>
        <br />
      </Container>
      {/* for share */}
      <Dialog
        open={sharedai}
        onClose={closeShareDai}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Choose Your Social Platform!"}
        </DialogTitle>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={closeShareDai} autoFocus href={facebookLink}>
            <FacebookIcon />
          </IconButton>
          <IconButton onClick={closeShareDai} href={twitterLink}>
            <TwitterIcon />
          </IconButton>
          <IconButton onClick={closeShareDai} href={whatsappLink}>
            <WhatsAppIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* for commenting */}
      <Dialog
        open={commentdai}
        onClose={closeCommentDai}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Comment"}</DialogTitle>
        <DialogActions>
          {/* <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(e.target[0].value, sdata._id);
            }}
          >
            <TextField
              sx={{
                marginBottom: 1,
              }}
              label="Comment"
              type="text"
              name="comment"
              fullWidth
              required
            />
            <Button variant="outlined" type="submit" fullWidth>
              Comment this
            </Button>
          </form> */}
          <Grid
            container
            item
            justifyContent="center"
            sx={12}
            sm={12}
            md={12}
            lg={12}
          >
            <Typography variant="subtitle2">
              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(e.target[0].value, sdata._id);
                }}
              >
                <TextField
                  label="Comment"
                  type="text"
                  name="comment"
                  fullWidth
                  required
                  sx={{
                    marginBottom: 1,
                  }}
                />
                <Button variant="outlined" type="submit" fullWidth>
                  Comment this
                </Button>
              </form>
            </Typography>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* for deleting post */}
      <Dialog
        open={deldai}
        onClose={closeDelDai}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Delete This Article ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelDai}>Cancel</Button>
          <Button
            onClick={() => delPost(sdata._id)}
            autoFocus
            sx={{
              color: "red",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Compost;
