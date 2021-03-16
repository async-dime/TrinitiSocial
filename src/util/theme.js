import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const themeObject = createMuiTheme({
    palette: {
        primary: {
            light: "#33c9dc",
            main: "#00bcd4",
            dark: "#008394",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff6333",
            main: "#ff3d00",
            dark: "#b22a00",
            contrastText: "#fff",
        },
    },
    themeVariables: {
        typography: {
            useNextVariants: true,
        },
        form: {
            textAlign: "center",
        },
        media: {
            maxWidth: 70,
            margin: "20px auto",
        },
        pageTitle: {
            margin: "10px auto",
        },
        textField: {
            margin: "10px auto",
        },
        button: {
            marginTop: "10px",
            position: "relative",
        },
        error: {
            color: "red",
            fontSize: "14px",
            margin: "10px 0",
        },
        textDown: {
            textAlign: "center",
            fontSize: "1rem",
            position: "relative",
            paddingTop: "1rem",
        },
        signUpLink: {
            fontWeight: "bold",
            color: "#008394",
        },
        buttonProgress: {
            position: "absolute",
            color: "#008394",
        },
    },
});

export default themeObject;
