import { FormEvent } from "react";

export type AccessModalProps = {
  giveAccess: Boolean;
  openAccessModal: Boolean;
  handleCloseAccessModal: () => void;
  createWhiteboard: (event: FormEvent<HTMLFormElement>, email: String) => void;
};
