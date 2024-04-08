"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

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

  /*  async function showUser() {
    try {
      const request = new Request(`http://localhost:3000/api/Show-Users`, {
        method: "GET",
      });
    } catch (error) {
      console.error("errore");
    }
  }*/

  return (
    <div className="access">
      <input
        type="text"
        placeholder="Inserisci la tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Scrivi il tuo nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          addUser(email, name);
          setName("");
          setEmail("");
        }}
        disabled={email === "" || name === ""}
      >
        AGGIUNGI
      </button>
      <button type="button">VISUALIZZA UTENTI</button>
    </div>
  );
}
