import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import CustomButton from "../util/CustomButton";

//redux
import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../redux/actions/userAction";

//components
import EditProfile from "./EditProfile";

//MaterialUi
import MuiLink from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//icon
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

const useStyles = (theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                float: "left",
                left: "0",
            },
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle",
            },
            "& a": {
                color: theme.palette.primary.main,
            },
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0",
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px",
        },
    },
    button: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px",
        },
    },
});

const Profile = (props) => {
    const {
        classes,
        user: {
            authenticated,
            loading,
            credentials: {
                handle,
                createdAt,
                imageUrl,
                bio,
                website,
                location,
            },
        },
        uploadImage,
        logoutUser,
    } = props;
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        uploadImage(formData);
    };
    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };
    const handleLogout = () => {
        logoutUser();
    };

    let profileMarkup = !loading ? (
        authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            src={imageUrl}
                            alt="profile"
                            className="profile-image"
                        />
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={handleImageChange}
                        />
                        <CustomButton
                            tip="Edit profile picture"
                            onClick={handleEditPicture}
                            btnClassName="button"
                        >
                            <EditIcon color="inherit" />
                        </CustomButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink
                            component={Link}
                            to={`/users/${handle}`}
                            color="primary"
                            variant="h5"
                        >
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <>
                                <LocationOn color="primary" />{" "}
                                <span>{location}</span>
                                <hr />
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color="primary" />
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {" "}
                                    {website}
                                </a>
                                <hr />
                            </>
                        )}
                        <CalendarToday color="primary" />{" "}
                        <span>
                            Joined {dayjs(createdAt).format("MMM YYYY")}
                        </span>
                    </div>
                    <div className={classes.button}>
                        <EditProfile />
                        <CustomButton
                            tip="Logout"
                            onClick={handleLogout}
                            // btnClassName={classes.button}
                        >
                            <ExitToAppRoundedIcon color="inherit" />
                        </CustomButton>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    Please login to use our application
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/signup"
                    >
                        Signup
                    </Button>
                </div>
            </Paper>
        )
    ) : (
        <p>loading...</p>
    );

    return profileMarkup;
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(useStyles)(Profile));
