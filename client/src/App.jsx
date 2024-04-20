import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="data">{data && <div>{JSON.stringify(data)}</div>}</div>
  );
}

export default App;
