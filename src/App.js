import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import themeObject from "./util/theme";
import jwtDecode from "jwt-decode";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

//pages
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";

//components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";

const FirebaseToken = localStorage.FirebaseToken;
if (FirebaseToken) {
    const decodedToken = jwtDecode(FirebaseToken);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        localStorage.clear();
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = FirebaseToken;
        store.dispatch(getUserData());
    }
}

const App = () => {
    return (
        <MuiThemeProvider theme={themeObject}>
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <AuthRoute
                                exact
                                path="/login"
                                component={Login}
                            />
                            <AuthRoute
                                exact
                                path="/signup"
                                component={SignUp}
                            />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;
