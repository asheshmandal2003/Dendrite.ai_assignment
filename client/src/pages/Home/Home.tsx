import axios from "axios";
import Card from "../../components/ui/Card";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessModal from "../../components/ui/AccessModal";

const Home = () => {
  const [whiteboards, setWhiteboards] = useState(() => [{ id: 0 }]);
  const [openAccessModal, setOpenAccessModal] = useState(() => false);

  const handleCloseAccessModal = () => {
    setOpenAccessModal(false);
  };
  const handleShowAccessModal = () => {
    setOpenAccessModal(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWhiteboards = async () => {
      await axios
        .get("http://localhost:8000/api/v1/whiteboard")
        .then((res) => setWhiteboards(res.data))
        .catch((err) => console.error(err.response));
    };
    fetchWhiteboards();
  }, []);

  const createWhiteboard = async (
    event: FormEvent<HTMLFormElement>,
    email: String
  ) => {
    event.preventDefault();
    const data = new FormData();
    data.append("email", String(email));
    console.log(data);
    await axios
      .post("http://localhost:8000/api/v1/whiteboard", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setWhiteboards((prevWhiteboards) => [
          ...prevWhiteboards,
          { id: res.data.id },
        ]);
        handleCloseAccessModal();
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <div className="container text-center my-5">
        <div className="row row-cols-md-6 row-cols-sm-2 row-cols-1  g-3">
          <div className="col">
            <Card icon="/images/add.svg" onClick={handleShowAccessModal} />
          </div>
          {whiteboards &&
            whiteboards.map((whiteboard) => (
              <div className="col" key={whiteboard.id}>
                <Card
                  icon="/images/photo.svg"
                  onClick={() => navigate(`/whiteboard/${whiteboard.id}`)}
                />
              </div>
            ))}
        </div>
      </div>
      <AccessModal
        giveAccess={false}
        openAccessModal={openAccessModal}
        handleCloseAccessModal={handleCloseAccessModal}
        createWhiteboard={createWhiteboard}
      />
    </>
  );
};

export default Home;
