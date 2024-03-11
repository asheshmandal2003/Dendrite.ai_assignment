import { useState } from "react";
import { AccessModalProps } from "../../types/ui/AccessModalProps";

export default function AccessModal(props: AccessModalProps) {
  const [email, setEmail] = useState(() => "");
  return (
    <>
      {props.openAccessModal && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="chat-modal modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-600">
                  {props.giveAccess
                    ? "Share Your Drawing"
                    : "Create New Whiteboard"}
                </h5>
                <button
                  type="button"
                  className="close transparent-btn ms-auto"
                  onClick={props.handleCloseAccessModal}
                >
                  <img
                    src="/images/close.svg"
                    alt="close"
                    height={28}
                    width={28}
                  />
                </button>
              </div>
              <form
                className="modal-body d-flex flex-column"
                onSubmit={(event) => props.createWhiteboard(event, email)}
              >
                <input
                  type="email"
                  className="form-control"
                  placeholder={
                    props.giveAccess
                      ? "Enter the collaborator's email id"
                      : "Enter your email id"
                  }
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="ms-auto mt-3">
                  <button
                    className="btn btn-danger me-2"
                    onClick={props.handleCloseAccessModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    {props.giveAccess ? "Share" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
