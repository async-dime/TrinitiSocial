import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CustomButton from "../util/CustomButton";

//redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userAction";

//MaterialUi
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import EditIcon from "@material-ui/icons/Edit";

const useStyles = (theme) => ({
    ...theme.themeVariables,
    button: {
        left: '0',
    },
});

const EditProfile = (props) => {
    const { classes, editUserDetails, credentials } = props;
    const [state, setState] = useState({
        bio: "",
        website: "",
        location: "",
    });
    const [open, setOpen] = useState(false);
    const mapUserDetailsToState = (credentials) => {
        setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : "",
        });
    };
    const handleOpen = () => {
        setOpen(true);
        mapUserDetailsToState(credentials);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            mapUserDetailsToState(credentials);
        }
        return function cleanup() {
            mounted = false;
        };
    }, [credentials]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };
    const handleSubmit = () => {
        const userDetails = {
            bio: state.bio,
            website: state.website,
            location: state.location,
        };
        editUserDetails(userDetails);
        handleClose();
    };

    return (
        <>
            {" "}
            <CustomButton
                tip="Edit details"
                onClick={handleOpen}
                btnClassName={classes.button}
            >
                <EditIcon color="inherit" />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit your profile details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="Put your bio here"
                            className={classes.textField}
                            value={state.bio}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your personal/ professional website"
                            className={classes.textField}
                            value={state.website}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Place you live"
                            className={classes.textField}
                            value={state.location}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
    withStyles(useStyles)(EditProfile)
);
