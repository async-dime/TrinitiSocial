import React, { useEffect } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";

//MaterialUi
import Grid from "@material-ui/core/Grid";

//components
import Scream from "../components/Scream";
import Profile from "../components/Profile";

const Home = (props) => {
    const { screams, loading } = props.data;
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            props.getScreams();
        }
        //cleanup function to avoid memory leak
        return function cleanup() {
            mounted = false;
        };
    }, [props.getScreams]);
    let latestScreams = !loading ? (
        screams.map((scream) => (
            <Scream key={scream.screamId} scream={scream} />
        ))
    ) : (
        <p>Loading...</p>
    );
    return (
        <Grid container spacing={2}>
            <Grid item sm={8} xs={12}>
                {latestScreams}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
};

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
