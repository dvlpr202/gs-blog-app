import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
    Stack,
    Typography,
    TextField,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import ShareIcon from "@mui/icons-material/Share";
  import CommentIcon from "@mui/icons-material/Comment";
  import {
    commentPost,
    deletePost,
    likePost,
    showAllComments,
    unlikePost,
  } from "../../apis/PostApi";
  import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { Link, useNavigate } from "react-router-dom";
  import { UserContext } from "../../App";
  import WhatsAppIcon from "@mui/icons-material/WhatsApp";
  import FacebookIcon from "@mui/icons-material/Facebook";
  import TwitterIcon from "@mui/icons-material/Twitter";
  import moment from "moment";

const TechPostsCard = ({ techposts, getData }) => {
    const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [likess, setLikess] = useState(
    techposts.likes.includes(state._id) ? true : false
  );
  const handleLikes = (id) => {
    if (state) {
      setLikess(!likess);
      if (likess === false) {
        likePost(id);
        openLikeSnack();
        console.log("liked");
      }
      if (likess === true) {
        unlikePost(id);
        console.log("unliked");
      }
      getData();
    } else {
      navigate("/login");
    }
  };
  const [likesnack, setLikesnack] = React.useState(false);

  const openLikeSnack = () => {
    setLikesnack(true);
    setTimeout(closeLikeSnack, 1500);
  };

  const closeLikeSnack = () => {
    setLikesnack(false);
  };

  const [sharedai, setSharedai] = React.useState(false);

  const openShareDai = () => {
    setSharedai(true);
  };

  const closeShareDai = () => {
    setSharedai(false);
  };

  const facebookCurl = window.location.href + "/" + techposts._id;
  const facebookLink = `https://facebook.com/sharer.php?${facebookCurl}`;
  const twitterCurl = window.location.href + "/" + techposts._id;
  const twitterLink = `https://twitter.com/intent/tweet?${twitterCurl}`;
  const whatsappCurl = window.location.href + "/" + techposts._id;
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
    // console.log(text, postId)
    console.log("comment posted!")
    setTimeout(() => {
      closeCommentDai();
      getData();
    }, 500);
  };
  const [commentsarr, setCommentsarr] = useState([]);
  const getComments = async () => {
    const getAllComments = await showAllComments(techposts._id);
    setCommentsarr(getAllComments.data);
    // console.log(getAllComments.data);
  };

  const editVal = () => {
    if (techposts.posted_by._id == state._id) {
      return (
        <IconButton component={Link} to={`/updatepost/${techposts._id}`}>
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
    getData();
  };
  const deleteVal = () => {
    if (techposts.posted_by._id == state._id) {
      return (
        <IconButton onClick={openDelDai}
        sx={{
          "&:hover": {
            color: "#aa2e25",
          }
        }}
        >
          <DeleteForeverIcon />
        </IconButton>
      );
    }
  };
  useEffect(() => {
    getComments()
  })

  return (
    <>
        <Card
        sx={{
          width: 720,
          // height: 370,
          marginBottom: 3,
        }}
        elevation={0}
        // variant="outlined"
        className="animate__animated animate__fadeIn"
      >
        <Box component={Link} to={`/compost/${techposts._id}`}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              height="280"
              image={techposts.picture}
              alt="Paella dish"
              sx={{
                transition: "transform 500ms",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "transform 500ms",
                },
              }}
            />
          </Card>
        </Box>
        <CardActions
          // disableSpacing
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: "3px"
          }}
        >
          <Badge
            badgeContent={techposts.likes.length}
            color="primary"
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <IconButton
              onClick={() => {
                handleLikes(techposts._id);
              }}
              sx={{
                color: () => {
                  if (likess === true) {
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
        <CardContent
          sx={{
            maxHeight: "85px",
            // background: "grey",
            overflow: "hidden",
          }}
        >
          <Typography variant="h6">"{techposts.sdesc}"</Typography>
        </CardContent>
        <CardHeader
          avatar={<Avatar>{techposts.posted_by.name[0]}</Avatar>}
          action={
            <Button
              component={Link}
              to={`/compost/${techposts._id}`}
              startIcon={<ExpandMoreIcon />}
            >
              More
            </Button>
          }
          title={
            <Typography variant="subtitle" color="textSecondary">
              {techposts.posted_by.name} | {techposts.categories}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="textSecondary">
              {moment(techposts.created_at).fromNow()}
            </Typography>
          }
        />
      </Card>
      {/* snackbar for like */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={likesnack}
          autoHideDuration={6000}
          onClose={closeLikeSnack}
        >
          <Alert
            onClose={closeLikeSnack}
            severity="success"
            sx={{ width: "100%" }}
          >
            You Liked This Post!
          </Alert>
        </Snackbar>
      </Stack>
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
          <IconButton onClick={closeShareDai} autoFocus href={facebookLink} target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton onClick={closeShareDai} href={twitterLink} target="_blank">
            <TwitterIcon />
          </IconButton>
          <IconButton onClick={closeShareDai} href={whatsappLink} target="_blank">
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
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(e.target[0].value, techposts._id);
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
          </form>
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
            onClick={() => delPost(techposts._id)}
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
  )
}

export default TechPostsCard