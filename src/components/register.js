import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  ThemeProvider,
  createTheme
} from "@mui/material";

export default function Register() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00a2ff',
      },
      background: {
        default: '#050505',
        paper: 'rgba(15, 15, 15, 0.7)',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 162, 255, 0.2)',
                borderRadius: '8px',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 162, 255, 0.4)',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #00a2ff 30%, #0069ff 90%)',
            boxShadow: '0 0 10px rgba(0, 162, 255, 0.3)',
          },
        },
      },
    },
  });

  const BACKEND_SERVER_URL = "http://localhost:5000"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${BACKEND_SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Login failed");
      }
      const data = await res.json();
      setMessage(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #0a192f 100%)',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 4,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'background.paper',
              border: '1px solid rgba(0, 162, 255, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 0 30px rgba(0, 162, 255, 0.1)',
              transform: 'translateY(-20px)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 500,
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(0, 162, 255, 0.3)',
              }}
            >
              Create Account
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                }}
              >
                {error}
              </Alert>
            )}
            {message && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: '8px',
                }}
              >
                {message}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{
                '& .MuiTextField-root': { mb: 3 },
              }}
            >
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& label.Mui-focused': {
                    color: 'primary.main',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 20px rgba(0, 162, 255, 0.4)',
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}