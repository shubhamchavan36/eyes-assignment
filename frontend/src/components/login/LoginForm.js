import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  CardHeader,
  InputAdornment
} from "@material-ui/core";
import { Send, Mail, Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";

const styles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  extendedIcon: {
    marginRight: "10px"
  },
  action: {
    float: "right !important"
  }
}));

function LoginForm() {
  const classes = styles();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleChange = name => ({ target: { value } }) =>
    name == "email" ? setEmail(value) : setPassword(value)

  const handleValidation = () => {
    return email.length > 0 && !validateEmail() && password.length > 4;
  };

  const handleKeyPress = e => {
    if (/enter/gi.test(e.key) && handleValidation()) {
      handleClick();
    }
  };

  const handleClick = () => {
    console.log(`Send ${email.toLowerCase()} && ${password}`);
  };

  const validateEmail = () => {
    if (email.length < 1) return false;
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          title="Log In"
        />
        <CardContent>
          <TextField
            required
            id="email"
            label="Email"
            helperText="example@example.com"
            value={email}
            onChange={handleChange('email')}
            onKeyDown={handleKeyPress}
            error={validateEmail()}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              )
            }}
          />
          <TextField
            required
            id="password"
            label="Password"
            helperText=""
            value={password}
            type="password"
            onChange={handleChange("password")}
            onKeyDown={handleKeyPress}
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              )
            }}
          />
        </CardContent>
        <CardActions className={classes.action}>
          <Link to="/employee" style={{ color: "white" }}>
            <Button
              id="btn_login"
              onClick={e => handleClick()}
              disabled={!handleValidation()}
              color="primary"
              className={classes.button}
              variant="contained">
              <Send className={classes.extendedIcon} />
              Login
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Fragment>
  );
}
export default LoginForm;
