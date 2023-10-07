import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

function App() {
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);

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

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };


  const onClickSendInvites = () => {
    setSuccess(true)
  }
  return (
    <div className="App">
      {success ? (
        <Success count={invites.length}/>
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
