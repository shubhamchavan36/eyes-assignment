import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import LoginForm from "./LoginForm";

export default class Login extends Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "90vh", background: "#1E90FF" }}>
        <Grid item xs={10} sm={4}>
          <LoginForm />
        </Grid>
      </Grid>
    );
  }
}
