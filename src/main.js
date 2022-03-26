import React, { useState, useEffect } from "react";

export default function Github() {
  let [data, setData] = useState([[]]);
  let [n, setN] = useState(0);
  let [ind, setInd] = useState(0);
  useEffect(() => {
    let url = "https://api.github.com/users/john-smilga/followers?per_page=100";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let arr = [...data, ...data];
        let perPage = 16;
        let totalPage = Math.ceil(arr.length / perPage);
        setInd(totalPage);
        let newArr = [];
        for (let i = 0; i < totalPage; i++) {
          let a = [];
          for (let j = 0; j < perPage; j++) {
            if (arr[perPage * i + j]) a.push(arr[perPage * i + j]);
          }
          newArr.push(a);
        }
        console.log(newArr);
        setData(newArr);
        console.log(newArr);
      });
  }, []);

  return (
    <>
      <h1>Pagination</h1>
      <hr />
      <article>
        <button
          onClick={() => {
            if (n === 0) {
              setN(ind - 1);
              return;
            }
            setN(n - 1);
          }}
        >
          Previous
        </button>
        <div>
          {data.map((i, ind) => (
            <button
              className={`${n === ind && "btn"}`}
              onClick={() => setN(ind)}
            >
              {ind + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (n === ind - 1) {
              setN(0);
              return;
            }
            setN(n + 1);
          }}
        >
          Next
        </button>
      </article>

      <section>
        {data[n].map(({ avatar_url, login, url }) => {
          return (
            <div>
              <img src={avatar_url} alt="" />
              <h2>{login}</h2>
              <p>
                <a href={url} style={{ textDecoration: "none" }}>
                  Github URL
                </a>
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
