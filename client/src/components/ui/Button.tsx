import { ButtonProps } from "../../types/ui/ButtonProps";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`btn ${props.variant} d-flex flex-row justify-content-center align-items-center flex-nowrap gap-2 ${props.className}`}
      onClick={props.onClick}
    >
      <img
        src={String(props.icon)}
        alt={String(props.btnText)}
        height={18}
        width={18}
        style={{
          fill: "red",
        }}
      />
      <span>{props.btnText}</span>
    </button>
  );
};
