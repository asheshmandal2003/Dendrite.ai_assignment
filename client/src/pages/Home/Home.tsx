import axios from "axios";
import Card from "../../components/ui/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [whiteboards, setWhiteboards] = useState(() => [{ id: 0 }]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWhiteboards = async () => {
      await axios
        .get("http://localhost:8000/api/v1/whiteboard")
        .then((res) => setWhiteboards(res.data))
        .catch((err) => console.log(err.response));
    };
    fetchWhiteboards();
  }, []);

  const createWhiteboard = async () => {
    await axios
      .post("http://localhost:8000/api/v1/whiteboard")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="container text-center my-5">
      <div className="row row-cols-md-6 row-cols-sm-2 row-cols-1  g-3">
        <div className="col">
          <Card icon="/images/add.svg" onClick={createWhiteboard} />
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
  );
};

export default Home;
