"use client";

import { useEffect, useState } from "react";

interface user {
  email: string;
  name: string;
}

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<Array<user>>([]);
  const [visible, setVisible] = useState(false);
  const [upd, setUpd] = useState(false);

  async function addUser(email: string, name: string) {
    debugger;
    const reg = /\w+@\w+\.\w{2,4}/i;
    if (reg.test(email))
      try {
        const request = new Request(
          `http://localhost:3000/api/Add-users?email=${email}&name=${name}`,
          {
            method: "POST",
          }
        );

        const response = await fetch(request);
        if (!response.ok) {
          throw new Error("Failed to add user");
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    else alert("Indirizzo email non valido");
  }

  async function showUser() {
    try {
      const request = await fetch(`http://localhost:3000/api/Show-Users`, {
        method: "GET",
      });
      const data = await request.json();
      setUsers(data.user.rows);
    } catch (error) {
      console.error("errore");
    }
    console.log(users);
  }

  async function updUser(email: string, name: string) {
    try {
      const request = await fetch(
        `http://localhost:3000/api/updateUsers?email=${email}&name=${name}`,
        {
          method: "PUT",
        }
      );
    } catch (error) {
      console.error("errore");
    }
  }

  useEffect(() => {
    showUser();
  }, []);

  return (
    <>
      <button type="button" onClick={() => setUpd(!upd)}>
        {upd ? "AGGIUNGI" : "AGGIORNA"}{" "}
      </button>
      <div className="access">
        <input
          type="text"
          placeholder={
            upd ? "Inserisci email da aggiornare" : "Inserisci la tua email"
          }
          disabled={upd}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder={
            upd ? "Inserisci nome da aggiornare" : "Scrivi il tuo nome"
          }
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            if (upd) updUser(email, name);
            else addUser(email, name);
            showUser();
            setName("");
            setEmail("");
          }}
          disabled={email === "" || name === ""}
        >
          {upd ? "MODIFICA" : "AGGIUNGI"}
        </button>
        <button
          type="button"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          VISUALIZZA UTENTI
        </button>
      </div>
      {visible && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <b>EMAIL</b>
            <b>NOME</b>
          </div>
          {users.map((element) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                width: "400px",
              }}
              onClick={() => {
                if (upd) {
                  setEmail(element.email);
                  setName(element.name);
                }
              }}
              key={element.email}
            >
              <p>{element.email}</p>
              <p>{element.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
