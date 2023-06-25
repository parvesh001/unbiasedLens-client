import React from "react";

export default function Input({
  label,
  id,
  type,
  className,
  placeholder,
  invalidFeedback,
  onChange,
  onBlur,
  value,
}) {
  return (
    <div class="form-floating mb-3">
      <input
        type={type}
        class={`form-control ${className}`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label for={id} >{label}</label>
      <div class="invalid-feedback">{invalidFeedback}</div>
    </div>
  );
}
