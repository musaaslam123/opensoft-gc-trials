import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Styled component for the link
const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  marginRight: "1rem",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <StyledLink to="/">
          <Typography variant="h6" component="div">
            MMM Flix
          </Typography>
        </StyledLink>

        <div>
          {!token ? (
            <>
              <StyledLink to="/login">
                <Button color="inherit">Login</Button>
              </StyledLink>
              <StyledLink to="/register" sx={{ marginRight: 0 }}>
                <Button color="inherit">Register</Button>
              </StyledLink>
            </>
          ) : (
            <Button color="error" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
