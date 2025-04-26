import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Make sure this is installed: npm i sonner

const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone);
};

const PhoneInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  showErrorOnBlur = true, // extra prop to allow toast on blur if needed
}) => {
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    const newValue = e.target.value;
    onChange(e);

    if (!isValidPhone(newValue)) {
      setPhoneError("Phone number must be at least 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleBlur = () => {
    if (required && (!value || !isValidPhone(value))) {
      toast.error("Phone number is required ");
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Phone Number</Label>
      <Input
        id={id}
        name={name}
        type="tel"
        value={value}
        onChange={handlePhoneChange}
        onBlur={showErrorOnBlur ? handleBlur : undefined}
        placeholder={placeholder}
        required={required}
      />
      {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
    </div>
  );
};

export default PhoneInput;
