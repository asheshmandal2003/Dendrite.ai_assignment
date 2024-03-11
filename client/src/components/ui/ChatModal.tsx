import { FormEvent, useEffect, useRef, useState } from "react";
import "../../assets/styles/ui/ChatModal.css";
import { ChatModalProps } from "../../types/ui/ChatModalProps";

export default function ChatModal(props: ChatModalProps) {
  const [show, setShow] = useState(() => false);

  const handleClose = () => setShow(() => false);
  const handleShow = () => setShow(() => true);
  const [msg, setMsg] = useState(() => "");
  const modalBodyRef = useRef<HTMLDivElement>(null);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!props.websocket) return;
    if (msg === null) return;
    props.websocket.emit("message", {
      roomId: props.id,
      id: props.websocket.id,
      msg: msg,
    });
    setMsg("");
    props.setMessages((prevMsgs: any) => [
      ...prevMsgs,
      { id: props.websocket?.id, msg },
    ]);
  }

  useEffect(() => {
    if (!props.websocket) return;
    const receiveMsgs = (data: any) => {
      props.setMessages((prevMessages: any) => [...prevMessages, data]);
    };
    props.websocket.on("broadcast-message", receiveMsgs);
    return () => {
      props.websocket?.off("broadcast-message", receiveMsgs);
    };
  }, [props.websocket]);

  useEffect(() => {
    if (!modalBodyRef.current) return;
    modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
  }, [props.messages]);

  return (
    <>
      <div className="chat" onClick={handleShow}>
        <img src="/images/message.svg" alt="chat" width={42} height={42} />
      </div>
      {show && (
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
            <div className="modal-content" style={{ height: "70vh" }}>
              <div className="modal-header">
                <h5 className="modal-title fw-600">Chat</h5>
                <button
                  type="button"
                  className="close transparent-btn ms-auto"
                  onClick={handleClose}
                >
                  <img
                    src="/images/close.svg"
                    alt="close"
                    height={28}
                    width={28}
                  />
                </button>
              </div>
              <div
                className="modal-body py-0"
                ref={modalBodyRef}
                style={{
                  maxHeight: "100%",
                  overflow: "scroll",
                  backgroundColor: "#e1e1e1",
                }}
              >
                {props.messages.map(
                  (message, idx) =>
                    message && (
                      <div
                        key={idx}
                        className={`p-2 mb-4 d-flex flex-column ${
                          message.id === props.websocket?.id
                            ? "bg-success ms-auto ps-4 pe-3"
                            : "bg-light ps-3 pe-4"
                        }`}
                        style={{
                          width: "fit-content",
                          maxWidth: "70%",
                          borderRadius: 3,
                        }}
                      >
                        <small style={{ fontSize: 10 }}>User 1</small>
                        {message.msg}
                      </div>
                    )
                )}
              </div>
              <div className="modal-footer">
                <form
                  className="row w-100 g-2"
                  onSubmit={(event) => sendMessage(event)}
                >
                  <div className="col-11">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message here..."
                      style={{ width: "100%" }}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src="/images/send.svg"
                        alt="send"
                        height={20}
                        width={20}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
