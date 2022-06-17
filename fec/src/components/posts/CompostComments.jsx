import { Avatar, Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../../apis/PostApi";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CompostComments = ({ allcomments, getComments }) => {
  const navigate = useNavigate();

  const [delcomment, setDelcomment] = React.useState(false);

  const openDelCommentDai = () => {
    setDelcomment(true);
  };

  const closeDelCommentDai = () => {
    setDelcomment(false);
  };
  const delComment = async (id) => {
    await deleteComment(id);
    closeDelCommentDai();
    getComments()
    // navigate();
  };
  return (
    <>
      <Grid
        container
        item
        justifyContent="center"
        sx={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Card variant="outlined" sx={{ marginBottom: 1, width: 420 }}>
          <CardHeader
            avatar={<Avatar>{allcomments.posted_by.name[0]}</Avatar>}
            action={
              <IconButton onClick={openDelCommentDai}>
                <DeleteForeverIcon />
              </IconButton>
            }
            title={
              <Typography variant="subtitle2">{allcomments.comment}</Typography>
            }
            subheader={
              <Typography variant="caption">
                {allcomments.posted_by.name} |{" "}
                {moment(allcomments.created_at).fromNow()}
              </Typography>
            }
          />
        </Card>
      </Grid>
      {/* for deleting comment */}
      <Dialog
          open={delcomment}
          onClose={closeDelCommentDai}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure You Want To Delete This Comment ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDelCommentDai}>Cancel</Button>
            <Button
              onClick={() => delComment(allcomments._id)}
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

export default CompostComments;
