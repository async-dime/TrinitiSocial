import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//component
import CustomButton from "../util/CustomButton";
import DeleteScream from "./DeleteScream";

//MaterialUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//icon
import ChatIcon from "@material-ui/icons/ChatRounded";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

//redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataAction";

const useStyles = {
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
    },
    media: {
        minWidth: 200,
    },
    content: {
        padding: 25,
    },
};

function Scream(props) {
    const {
        classes,
        scream: {
            createdAt,
            userHandle,
            userImage,
            body,
            screamId,
            likeCount,
            commentCount,
        },
        user: {
            authenticated,
            credentials: { handle },
        },
    } = props;
    dayjs.extend(relativeTime);
    const likedScream = () => {
        if (
            props.user.likes &&
            props.user.likes.find((like) => like.screamId === screamId)
        )
            return true;
        else return false;
    };
    const likeScream = () => {
        props.likeScream(screamId);
    };
    const unlikeScream = () => {
        props.unlikeScream(screamId);
    };
    const likeButton = !authenticated ? (
        <CustomButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        </CustomButton>
    ) : likedScream() ? (
        <CustomButton tip="Undo like" onClick={unlikeScream}>
            <FavoriteIcon color="primary" />
        </CustomButton>
    ) : (
        <CustomButton tip="Like" onClick={likeScream}>
            <FavoriteBorder color="primary" />
        </CustomButton>
    );
    const deleteButton =
        authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null;
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={userImage}
                title="Profile Image"
            />
            <CardContent className={classes.content}>
                <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                >
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1">{body}</Typography>
                {likeButton}
                <span>{likeCount} Likes</span>
                <CustomButton tip="comments">
                    <ChatIcon color="primary" />
                </CustomButton>
                <span>{commentCount} comments</span>
            </CardContent>
        </Card>
    );
}

Scream.propTypes = {
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeScream,
    unlikeScream,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(useStyles)(Scream));
