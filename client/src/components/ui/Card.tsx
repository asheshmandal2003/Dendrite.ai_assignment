type Props = {
  icon: String;
  onClick: () => void;
};

export default function Card(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className="d-flex justify-content-center align-items-center"
      style={{
        height: 280,
        cursor: "pointer",
        backgroundColor: "#f1f1f1",
        border: "1px solid #808080",
      }}
    >
      <img src={String(props.icon)} alt="icon" height={50} width={50} />
    </div>
  );
}
