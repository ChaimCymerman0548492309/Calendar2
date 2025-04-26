// src/components/AuthDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<void>;
  onRegister: (username: string, password: string) => Promise<void>;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onClose,
  onLogin,
  onRegister,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await onLogin(username, password);
      } else {
        await onRegister(username, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          autoFocus
          size="small"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          size="small"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box sx={{ mt: 1 }}>
          <Button
            size="small"
            onClick={() => setIsLogin(!isLogin)}
            sx={{ textTransform: "none" }}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isLogin ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;
