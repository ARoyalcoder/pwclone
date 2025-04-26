// src/components/common/PasswordInput.jsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const isValidPassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const PasswordInput = ({ id, name, value, onChange, placeholder, required = false }) => {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false); // new

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    onChange(e); // still update parent state
    if (!touched) setTouched(true); // mark as touched when typing starts

    if (newValue && !isValidPassword(newValue)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Password</Label>
      <Input
        id={id}
        name={name}
        type="password"
        value={value}
        onChange={handlePasswordChange}
        placeholder={placeholder}
        required={required}
      />
      {touched && error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
