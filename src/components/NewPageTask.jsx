import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const NewPageTask = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [mes, setMes] = useState("");

  useEffect(() => {
    fetch("http://localhost:3004/todo")
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        setMes(loadedToDos.find((el) => el.id === Number(id)).task);
      });
  }, [id]);

  return (
    <>
      <div className="NewPage">
        <div className="NewPageWrapper">
          <span>{mes}</span>
          <button className="backButton" onClick={() => nav(-1)}>
            Назад
          </button>
        </div>
      </div>
    </>
  );
};
