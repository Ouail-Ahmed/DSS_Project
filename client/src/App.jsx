import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";
import ArtisteCard from "./artisteCard";

// import "./App.css";

function App() {
  let testData = [
    {
      image:
        "https://images.ps-aws.com/c?url=https%3A%2F%2Fd3cm515ijfiu6w.cloudfront.net%2Fwp-content%2Fuploads%2F2022%2F07%2F30151611%2Fmax-verstappen-red-bull-hungaroring-planetf1-2022.jpg",
      name: "Artist 1",
      city: "Lagos",
      biography: "This is the biography of artiste 1",
      website: "https://www.artist1.com",
      albums: [
        {
          title: "Album 1",
          releaseYear: "2020",
          image:
            "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
          songs: ["song 1", "song 2", "song 3"],
        },
        {
          title: "Album 2",
          releaseYear: "2021",
          image:
            "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
          songs: ["song 1", "song 2", "song 3"],
        },
      ],
    },
    {
      image:
        "https://cdn-4.motorsport.com/images/mgl/6VRb3576/s1200/mercedes-w14-1.webp",
      name: "Artist 2",
      city: "Abuja",
      biography: "This is the biography of artiste 2",
      website: "https://www.artist2.com",
      albums: [
        {
          title: "Album 1",
          releaseYear: "2020",
          image:
            "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
          songs: ["song 1", "song 2", "song 3"],
        },
        {
          title: "Album 2",
          releaseYear: "2021",
          image:
            "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
          songs: ["song 1", "song 2", "song 3"],
        },
      ],
    },
    {
      image:
        "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
      name: "Artist 3",
      city: "Port Harcourt",
      biography: "This is the biography of artiste 3",
      website: "https://www.artist3.com",
      albums: [
        {
          title: "Album 1",
          releaseYear: "2020",
          image:
            "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
          songs: ["song 1", "song 2", "song 3"],
        },
        {
          title: "Album 2",
          releaseYear: "2021",
          image:
            "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
          songs: ["song 1", "song 2", "song 3"],
        },
      ],
    },
  ];
  const searchArtiste = {
    image:
      "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
    name: "Artist 3",
    city: "Port Harcourt",
    biography: "This is the biography of artiste 3",
    website: "https://www.artist3.com",
    albums: [
      {
        title: "Album 1",
        releaseYear: "2020",
        image:
          "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
        songs: ["song 1", "song 2", "song 3"],
      },
      {
        title: "Album 2",
        releaseYear: "2021",
        image:
          "https://www.racefans.net/wp-content/uploads/2023/02/front-mclaren.jpg",
        songs: ["song 1", "song 2", "song 3"],
      },
    ],
  };
  const [data, setData] = useState(null);
  const [artistes, setArtistes] = useState(testData);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // console.log("enter press here! ");
      // axios
      //   .get(`http://localhost:5000/api/${search}`)
      //   .then((res) => {
      //     setArtistes([res.data]);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      if (event.target.value === "") {
        setArtistes(testData);
        return;
      }
      setArtistes([searchArtiste]);
      console.log(event.target.value + " is the search value");
    }
  };

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
    <>
      <Header />
      <div className="mainPage">
        <input
          className="searchArtiste"
          type="text"
          placeholder="Search For Artist By Name"
          onKeyPress={handleKeyPress}
        />

        <div className="artistesList">
          {artistes.slice(0, 3).map((artiste, index) => {
            return <ArtisteCard key={index} artiste={artiste} />;
          })}
        </div>

        <div className="data">{data && <div>{JSON.stringify(data)}</div>}</div>
      </div>
    </>
  );
}

export default App;
