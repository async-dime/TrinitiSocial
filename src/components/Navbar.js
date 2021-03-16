import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";

//components
import PostScream from "./PostScream";
import CustomButton from "../util/CustomButton";
//MaterialUi
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//icon
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

const Navbar = (props) => {
    const { authenticated } = props;
    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <>
                        <PostScream />
                        <Link to="/">
                            <CustomButton tip="Home">
                                <HomeIcon />
                            </CustomButton>
                        </Link>
                        <CustomButton tip="Notifications">
                            <Notifications />
                        </CustomButton>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            SignUp
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

Navbar.propTypes = {
    authenticated: PropType.bool.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
