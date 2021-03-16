import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CustomButton from "../util/CustomButton";

//redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../redux/actions/dataAction";

//MaterialUi
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icon
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
    ...theme.themeVariables,
    submitButton: {
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        left: "91%",
        top: "6%",
    },
});

const PostScream = (props) => {
    const {
        classes,
        UI: { loading, errors },
        clearErrors,
        postScream
    } = props;
    const [state, setState] = useState({
        body: "",
    });
    const [error, setError] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        clearErrors();
        setOpen(false);
        setError({});
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        postScream({ body: state.body });
    };
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (errors) {
                setError(errors);
            } else if (!errors && !loading) {
                setState({ body: "" });
                setOpen(false);
                setError({});
            }
        }
        //cleanup function to avoid memory leak
        return function cleanup() {
            mounted = false;
        };
    }, [errors, loading]);
    return (
        <>
            <CustomButton onClick={handleOpen} tip="Post a scream">
                <AddIcon />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <CustomButton
                    tip="Close"
                    onClick={handleClose}
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon />
                </CustomButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="Scream"
                            multiline
                            rows="3"
                            placeholder="Scream to the fire"
                            error={error.body ? true : false}
                            helperText={error.body}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                        >
                            Submit
                            {loading && (
                                <CircularProgress
                                    size={25}
                                    className={classes.buttonProgress}
                                />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

PostScream.propTypes = {
    classes: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
});

const mapActionsToProps = {
    postScream,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(
    withStyles(styles)(PostScream)
);
