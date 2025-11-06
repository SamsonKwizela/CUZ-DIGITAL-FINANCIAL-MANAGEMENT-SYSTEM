import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Login } from "./auth/Login";
import { Hero } from "./landingPage/Hero";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navigation } from "./component/NavBar";
import ContactUs from "./landingPage/contactUs";
import { ForgotPassword } from "./auth/ForgotPassword";
import { ChooseAccountType } from "./register/ChooseAccountType";
import { StudentAccountRegister } from "./register/StudentAccountRegister";
import AuthStepper from "./auth/AuthStepper";
import { Dashboard } from "./dashBoard/index.jsx";
import Balance from "./dashBoard/Balance";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import { DashboardLayout, PublicLayout } from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - show navigation bar */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Navigation />
                  <Hero />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Navigation />
                  <ContactUs />
                </PublicLayout>
              }
            />

            {/* Auth routes - redirect to dashboard if already logged in */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <Login />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <ForgotPassword />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/choose-account"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <ChooseAccountType />
                  </PublicLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <PublicLayout>
                    <Navigation />
                    <AuthStepper />
                  </PublicLayout>
                </PublicRoute>
              }
            />

            {/* Protected routes - no navigation bar, require authentication */}
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="balance" replace />} />
              <Route path="balance" element={<Balance />} />
              <Route
                path="transfer"
                element={
                  <div style={{ padding: "1rem" }}>
                    <h2>Pay & Transfer</h2>
                    <p>This is the pay & transfer section content.</p>
                  </div>
                }
              />
              <Route
                path="beneficiary"
                element={
                  <div style={{ padding: "1rem" }}>
                    <h2>Add Beneficiary</h2>
                    <p>This is the add beneficiary section content.</p>
                  </div>
                }
              />
              <Route
                path="notifications"
                element={
                  <div style={{ padding: "1rem" }}>
                    <h2>Notifications</h2>
                    <p>This is the notifications section content.</p>
                  </div>
                }
              />
              <Route
                path="receipts"
                element={
                  <div style={{ padding: "1rem" }}>
                    <h2>Receipts</h2>
                    <p>This is the receipts section content.</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
