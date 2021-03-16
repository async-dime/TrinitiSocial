import React, { useState } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { deleteScream } from "../redux/actions/dataAction";

//component
import CustomButton from "../util/CustomButton";

//MaterialUi
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

//icon
import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const styles = {
    deleteButton: {
        position: "absolute",
        left: "90%",
        top: "10%",
    },
};

const DeleteScream = (props) => {
    const { classes, screamId } = props;
    // const { classes, deleteScream, screamId } = props;
    // const [state, setState] = useState({
    //     open: false,
    // });
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        // setState({ open: true });
    };
    const handleClose = () => {
        setOpen(false);
        // setState({ open: false });
    };
    const deleteScream = () => {
        props.deleteScream(screamId);
        // props.deleteScream(props.screamId);
        // setState({ open: false });
        setOpen(false);
    };
    return (
        <>
            <CustomButton
                tip="Delete scream"
                onClick={handleOpen}
                btnClassName={classes.deleteButton}
            >
                <DeleteOutline color="secondary" />
            </CustomButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Are you sure to delete the scream?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
};

export default connect(
    null, 
    { deleteScream }
    )(withStyles(styles)(DeleteScream));
