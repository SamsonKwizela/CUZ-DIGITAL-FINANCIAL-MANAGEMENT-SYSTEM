import { useState } from "react";
import { Stepper, Button, Group, Container } from "@mantine/core";
import PersonInfo from "./PersonInfo";
import AccountType from "./AccountType";
import CreatePassword from "./CreatePassword";
import Preview from "./Preview";
import { useForm } from "@mantine/form";

function AuthStepper() {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      // Personal Information
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: null,
      address: "",
      gender: "",

      // Account Type
      accountType: "",

      // Password
      password: "",
      confirmPassword: "",

      // Terms
      termsOfService: false,
    },

    validate: {
      // Personal Information Validation
      fullName: (value) => {
        if (!value || value.trim() === "") return "Full name is required";
        if (value.length < 2) return "Full name must be at least 2 characters";
        return null;
      },

      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return null;
      },

      phone: (value) => {
        if (!value) return "Phone number is required";
        if (!/^\+?[\d\s\-()]+$/.test(value))
          return "Please enter a valid phone number";
        return null;
      },

      dateOfBirth: (value) => {
        if (!value) return "Date of birth is required";
        return null;
      },

      address: (value) => {
        if (!value || value.trim() === "") return "Address is required";
        return null;
      },

      gender: (value) => {
        if (!value) return "Please select your gender";
        return null;
      },

      // Account Type Validation
      accountType: (value) => {
        if (!value) return "Please select an account type";
        return null;
      },

      // Password Validation
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8)
          return "Password must be at least 8 characters long";
        return null;
      },

      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },

      // Terms Validation
      termsOfService: (value) => {
        if (!value) return "You must accept the terms of service";
        return null;
      },
    },
  });

  // Validation function for each step
  const validateCurrentStep = () => {
    const values = form.getValues();

    switch (active) {
      case 0: // Personal Information step
        const personalFields = [
          "fullName",
          "email",
          "phone",
          "dateOfBirth",
          "address",
          "gender",
        ];
        return personalFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return value && !error;
        });

      case 1: // Account Type step
        return values.accountType && !form.validateField("accountType").error;

      case 2: // Password step
        const passwordFields = [
          "password",
          "confirmPassword",
          "termsOfService",
        ];
        return passwordFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return field === "termsOfService" ? value === true : value && !error;
        });

      default:
        return true;
    }
  };

  const nextStep = () => {
    // Always trigger validation to show errors for current step
    const stepValid = validateCurrentStep();

    if (stepValid) {
      // If validation passes, proceed to next step
      setActive((current) => (current < 3 ? current + 1 : current));
    } else {
      // Show validation errors for the current step fields
      const currentStepFields = getCurrentStepFields();
      currentStepFields.forEach((field) => {
        form.validateField(field);
      });
    }
  };

  // Helper function to get current step fields
  const getCurrentStepFields = () => {
    switch (active) {
      case 0:
        return [
          "fullName",
          "email",
          "phone",
          "dateOfBirth",
          "address",
          "gender",
        ];
      case 1:
        return ["accountType"];
      case 2:
        return ["password", "confirmPassword", "termsOfService"];
      default:
        return [];
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Personal Info"
          description="Fill in your personal details"
        >
          <PersonInfo form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Account Type"
          description="Choose your account type"
        >
          <AccountType form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Create Password"
          description="Set up your password"
        >
          <CreatePassword form={form} />
        </Stepper.Step>

        <Stepper.Completed>
          <Preview form={form} />
        </Stepper.Completed>
      </Stepper>

      <br />

      <Group justify="space-between">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>

        {active < 3 ? (
          <Button onClick={nextStep}>
            {active === 2 ? "Complete Registration" : "Next Step"}
          </Button>
        ) : (
          <Button
            onClick={() => {
              console.log("Form submitted:", form.getValues());
              // Add your form submission logic here
            }}
          >
            Submit Registration
          </Button>
        )}
      </Group>
    </Container>
  );
}

export default AuthStepper;
