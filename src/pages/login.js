import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import icon from "../img/icon.svg";

//MaterialUi
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

const styles = (theme) => ({
    ...theme.themeVariables,
});

const Login = (props) => {
    const {
        classes,
        UI: { loading },
        loginUser,
        history,
    } = props;
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: state.email,
            password: state.password,
        };
        loginUser(userData, history);
    };
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if(props.UI.errors) {
                setErrors(props.UI.errors)
            }
        }
        //cleanup function to avoid memory leak
        return function cleanup() {
            mounted = false;
        };
    }, [props.UI.errors])
    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img src={icon} alt="icon" className={classes.media} />
                <Typography variant="h3" className={classes.pageTitle}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={state.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={state.password}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errors.general && (
                        <Typography variant="h5" className={classes.error}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}
                    >
                        Login
                        {loading && (
                            <CircularProgress
                                size={25}
                                className={classes.buttonProgress}
                            />
                        )}
                    </Button>

                    <Typography variant="h6" className={classes.textDown}>
                        Don't have an account? Please
                        <Link to="/signup" className={classes.signUpLink}>
                            {" "}
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProps = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Login));
