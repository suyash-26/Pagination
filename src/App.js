import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTimeout } from "./Hooks/useTimeout";

function App() {
  const [data, setdata] = useState();
  const [query, setQuery] = useState({
    q: "",
    page: 0,
    offset: 10,
  });
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async (query) => {
    setLoading(true);
    try {
      const data = await axios.get("users/allUsers", { params: query });
      setLoading(false);
      console.log(data);
      setdata(data.data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      return err;
    }
  };

  // useEffect(()=>{
  //   let timer = setTimeout(()=>{
  //     fetchAllUsers(query);
  //   },500)
  //   return ()=>{
  //     clearTimeout(timer)
  //   }
  // },[query])

  useTimeout(fetchAllUsers, 500, query);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={query.q}
          onChange={(e) => {
            setQuery({
              ...query,
              q: String(e.target.value),
              page: 0,
            });
          }}
          style={{
            width: "100%",
            height: "30px",
            border: "1px solid black",
            borderRadius: "10px",
            margin: "10px 0px",
            padding: "10px",
          }}
        />
      </div>
      {loading && <h2>Loading....</h2>}
      {data &&
        data.items &&
        data.items.map((item, index) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "lightgray",
                  borderBottom: "1px solid black",
                }}
              >
                <p>{item.name}</p>
                <p>{item.email}</p>
              </div>
            </>
          );
        })}
      {data && data.items && data.items.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => {
              setQuery((prevPage) => {
                return {
                  ...prevPage,
                  page: Number(
                    data.pagination.page > 0 ? data.pagination.page - 1 : 0
                  ),
                };
              });
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              setQuery((prevPage) => {
                return {
                  ...prevPage,
                  page: Number(
                    data.pagination.page < data.pagination.totalPages - 1
                      ? Number(data.pagination.page) + 1
                      : data.totalPages
                  ),
                };
              });
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
