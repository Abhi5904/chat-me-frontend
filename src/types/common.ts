/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FocusEvent } from "react";

export interface ISvgComponent {
  size?: number;
}
export interface IButton {
  text: string;
  variant?: ButtonVariant;
  link?: string;
  handleClick?: () => void;
}

export enum ButtonVariant {
  LINK = "link",
  BTN = "button",
}

export interface IInput {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  inputClassname?: string;
  error?: boolean;
  isrequired?: boolean;
  errorMsg?: string;
  disable?: boolean;
}

export interface ITextArea {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
  textAreaClassname?: string;
  error?: boolean;
  isrequired?: boolean;
  errorMsg?: string;
  disable?: boolean;
}

export interface IModeToggle {
  dropdownAlign?: "center" | "end" | "start";
}

export type GetResponseType = {
  status: string;
  message: string;
  code: number;
  data?: any;
  details?: any;
};

export interface IBack {
  handleBack: () => void;
}

export interface IStatus {
  text: string;
}
