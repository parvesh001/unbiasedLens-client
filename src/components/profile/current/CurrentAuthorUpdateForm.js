import React from "react";
import Input from "../../../UI/Input";

export default function CurrentAuthorUpdateForm() {
  return (
    <div className="mt-3">
      <h4 className="text-primary"> Update Your Credentials</h4>
      <form>
        <Input
          type="text"
          label="Update Name"
          className=""
          id="update-name"
          placeholder="Update Your Name"
          onBlur={() => {}}
          onChange={() => {}}
          value=""
          invalidFeedback="Please provide valid name input"
        />
        <Input
          type="email"
          label="Update Email"
          className=""
          id="update-email"
          placeholder="Update Your Email"
          onBlur={() => {}}
          onChange={() => {}}
          value=""
          invalidFeedback="Please provide valid email input"
        />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
