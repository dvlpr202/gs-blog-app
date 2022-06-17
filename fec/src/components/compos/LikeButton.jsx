import { Alert, Badge, IconButton, Snackbar, Stack } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { likePost, unlikePost } from '../../apis/PostApi';
import { UserContext } from '../../App';
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ posts, getData }) => {
    const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [likess, setLikess] = useState(
    posts.likes.includes(state._id) ? true : false
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
  return (
    <>
    <Badge
            badgeContent={posts.likes.length}
            color="primary"
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <IconButton
              onClick={() => {
                handleLikes(posts._id);
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
    </>
  )
}

export default LikeButton