import { Select, TextInput, Button } from "@mantine/core";
import React, { useState } from "react";


const StudentForm = () => (
  <div>
     <TextInput
          label="School Name"
          placeholder="Cavendish University"
          required
        />
         <TextInput
          label="Course of study"
          placeholder="Computer Science"
          required
        />

    
  </div>
);

const PersonalForm = () => (
  <div>
    <TextInput label="Full Name" placeholder="Enter your name" required />
    <TextInput label="National ID" placeholder="Enter your ID number" />
    
  </div>
);

const BusinessForm = () => (
  <div>
    <TextInput label="Business Name" placeholder="Enter your business name" required />
    <TextInput label="Registration No." placeholder="Enter registration number" />
    
  </div>
);

const SavingsForm = () => (
  <div>
    <TextInput label="Account Holder Name" placeholder="Enter name" required />
    <TextInput label="Initial Deposit" placeholder="Enter amount" />
    
  </div>
);

const accountType = [
  { value: "student", label: "Student" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "savings", label: "Savings" },
];

const AccountType = () => {
  const [value, setValue] = useState(null);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Select
        label="Select Account Type"
        placeholder="Pick account type"
        data={accountType}
        value={value}
        onChange={setValue}
      />

      {/* Conditional rendering based on selected account */}
      {value === "student" && <StudentForm />}
      {value === "personal" && <PersonalForm />}
      {value === "business" && <BusinessForm />}
      {value === "savings" && <SavingsForm />}
    </div>
  );
};

export default AccountType;
