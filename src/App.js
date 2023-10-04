import React, { useEffect, useState } from "react";
import "./index.scss";
// import { Success } from "./components/Success";
import { Users } from "./components/Users";

function App() {
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://reqres.in/api/users");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // eslint-disable-next-line
        const { data } = await response.json();

        setUsers(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="App">
      <Users onChangeSearchValue={onChangeSearchValue} searchValue={searchValue} items={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;
