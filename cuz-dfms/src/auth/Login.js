import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Box,
  Stack,
  Alert,
} from "@mantine/core";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = () => {
    setLoading(true);
    setError("");

    // Development mode - mock login (remove this in production)
    const isDevelopment = process.env.NODE_ENV === "development";
    const useMockLogin =
      isDevelopment && (email === "demo@bank.com" || email === "test@test.com");

    if (useMockLogin) {
      setTimeout(() => {
        const mockToken = "mock-jwt-token-" + Date.now();
        const mockUser = { id: 1, email: email, name: "Demo User" };

        login(mockToken);
        localStorage.setItem("user", JSON.stringify(mockUser));
        navigate("/overview");
        setLoading(false);
      }, 1000); // Simulate network delay
      return;
    }

    fetch("http://localhost:8000/cuz/bank/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          // Success response (status 200-299)
          console.log("Login successful:", data);

          // Store user data and token using context
          if (data.token) {
            login(data.token); // This will store the token and set authentication state
            localStorage.setItem("user", JSON.stringify(data.user));
          }

          // Navigate to overview (this will happen automatically due to PublicRoute redirect)
          navigate("/overview");
        } else {
          // Error response (status 400-599)
          console.error("Login failed:", data.error || data.message);
          setError(data.error || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Network error:", error.message);
        if (error.message === "Failed to fetch") {
          setError(
            "Unable to connect to server. Please ensure the backend server is running on http://localhost:8000"
          );
        } else {
          setError(
            "Network error. Please check your connection and try again."
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.background}>
      <Container size="xs" className={classes.container}>
        <Box className={classes.loginWrapper}>
          {/* Bank Logo/Icon Section */}
          <Box className={classes.logoSection}>
            <Title className={classes.title}>Forever Trust Bank</Title>
            <Text className={classes.motto}>Reliable. Always with you</Text>
          </Box>

          {/* Login Form */}
          <Paper className={classes.loginForm} shadow="xl" radius="lg" p={32}>
            <Stack gap="md">
              <div className={classes.formHeader}>
                <Title order={2} className={classes.formTitle}>
                  Welcome Back
                </Title>
                <Text className={classes.formSubtitle}>
                  Sign in to access your account
                </Text>
              </div>

              {error && (
                <Alert
                  color="red"
                  variant="light"
                  className={classes.errorAlert}
                >
                  {error}
                </Alert>
              )}

              {process.env.NODE_ENV === "development" && (
                <Alert color="blue" variant="light">
                  <Text size="sm">
                    <strong>Development Mode:</strong> Use{" "}
                    <code>demo@bank.com</code> or <code>test@test.com</code>{" "}
                    with any password for mock login when backend is
                    unavailable.
                  </Text>
                </Alert>
              )}

              <TextInput
                label="Email Address"
                placeholder="Enter your email"
                required
                size="md"
                radius="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
                leftSection="📧"
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                required
                size="md"
                radius="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
                leftSection="🔒"
              />

              <Group justify="space-between" mt="md">
                <Checkbox
                  label="Remember me"
                  size="sm"
                  className={classes.checkbox}
                />
                <Anchor
                  component={Link}
                  to="/forgot-password"
                  className={classes.forgotLink}
                  size="sm"
                >
                  Forgot password?
                </Anchor>
              </Group>

              <Button
                fullWidth
                size="md"
                radius="md"
                onClick={loginUser}
                loading={loading}
                className={classes.loginButton}
                mt="lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Box className={classes.signupSection}>
                <Text size="sm" className={classes.signupText}>
                  Don't have an account?{" "}
                  <Anchor
                    component={Link}
                    to="/choose-account"
                    className={classes.signupLink}
                  >
                    Create Account
                  </Anchor>
                </Text>
              </Box>
            </Stack>
          </Paper>

          {/* Security Notice */}
          <Box className={classes.securityNotice}>
            <Text size="xs" className={classes.securityText}>
              🔒 Your information is protected with bank-level security
            </Text>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
