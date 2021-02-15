import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import $ from "jquery";

const useStyles = makeStyles({
    textField: {
        marginBottom: "20px",
        width: "80%"
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {

    // useEffect(() => {
    //     init();
    //   }, []);

    const classes = useStyles();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("");

    const registerDiv = {
        height: "100vh",
        padding: "10px",
        backgroundColor: "#f2e6ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const innerDiv = {
        border: "1px solid gray",
        borderRadius: "5%",
        height: "380px",
        width: "340px",
        textAlign: "center"
    };

    function handleChange(e) {
        const value = e.target.value;
        const id = e.target.id;

        switch (id) {
            case 'name-input':
                setFullName(value);
                break;
            case 'email-input':
                setEmail(value);
                break;
            case 'password-input':
                setPassword(value);
                break;
            default: break;
        }
    }

    function handleRegister() {
        if (!fullName || !email || !password) {
            console.log("Enter all fields");
        } else {
            $.post({
                url: "http://localhost:5000/register",
                data: { fullName, email, password },
                dataType: 'json',
                cache: false,
                success: function (res) {
                    if (res.includes("successfully")) {
                        setSnackbarMessage("User registered successfully!");
                        setSnackbarSeverity("success");
                    } else if (res.includes("exists")) {
                        setSnackbarMessage("Email already exists!");
                        setSnackbarSeverity("warning");
                    }
                    setOpen(true);
                },
                error: function (xhr, status, err) {
                    console.error(status, err.toString());
                }
            });
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div style={registerDiv}>
            <div style={innerDiv}>
                <p style={{ fontSize: 28, fontWeight: "bold" }}>Register here</p>
                <form>
                    <TextField
                        required
                        id="name-input"
                        value={fullName}
                        onChange={handleChange}
                        autoFocus={true}
                        className={classes.textField}
                        label="Enter your name"
                        variant="outlined"
                    />

                    <TextField
                        required
                        id="email-input"
                        value={email}
                        className={classes.textField}
                        onChange={handleChange}
                        label="Email"
                        variant="outlined"
                    />

                    <TextField
                        required
                        id="password-input"
                        value={password}
                        className={classes.textField}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <div>
                        <Button onClick={handleRegister} variant="contained" color="primary">Register</Button>
                    </div>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Register;
