import { FC } from "react";
import { Fieldset, Checkbox, Dropdown } from "@react95/core";

export const AboutMeTab: FC = () => {
  return (
    <>
      <p
        style={{
          marginTop: 0,
          marginBottom: "1.6em",
        }}
      >
        If you have problems with this program and it worked correctly on an
        earlier version of Windows, select the compatibility mode that matches
        that earlier version.
      </p>

      <Fieldset
        legend="Compatibility mode"
        style={{
          marginBottom: "1.6em",
        }}
      >
        <Checkbox readOnly checked>
          Run this program in compatibility mode for:
        </Checkbox>
        <Dropdown
          style={{
            width: 200,
          }}
          options={["Windows 95"]}
        />
      </Fieldset>

      <Fieldset legend="Display Settings">
        <Checkbox>Run in 256 colors</Checkbox>
        <Checkbox>Run in 640 x 480 screen resolution</Checkbox>
        <Checkbox>Disable visual themes</Checkbox>
      </Fieldset>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>
        Learn more about <a href="#">program compatibility.</a>
      </p>
    </>
  );
};
