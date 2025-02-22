// src/components/AsuraUploader.js

import React, { useState } from "react";
import axios from "axios";

export const Asur = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Asura Data Array
  //   const asurs = [
  //     {
  //       name: "a",
  //       email: "a@a.a",
  //       age: 4,
  //       isActive: false,
  //     },
  //   ];

  const asurs = [
    {
      name: "Lavanasura",
      email: "lavanasura@ramayana.treta",
      age: 350,
      isActive: false, // Defeated by Shatrughna
    },
    {
      name: "Gajasura",
      email: "gajasura@shivpuran.treta",
      age: 500,
      isActive: false, // Vanquished by Lord Shiva
    },
    {
      name: "Durgamasura",
      email: "durgamasura@devi.puran",
      age: 800,
      isActive: false, // Slain by Goddess Durga
    },
    {
      name: "Chanda",
      email: "chanda@devi.puran",
      age: 700,
      isActive: false, // Defeated by Goddess Kali
    },
    {
      name: "Arunasura",
      email: "arunasura@devi.puran",
      age: 650,
      isActive: false, // Vanquished by Goddess Parvati
    },
    {
      name: "Bhasmasura",
      email: "bhasmasura@shivpuran.treta",
      age: 450,
      isActive: false, // He was ultimately destroyed by his own boon.
    },
    {
      name: "Jambavan",
      email: "jambavan@vishnuPurana.treta",
      age: 999999,
      isActive: false,
    },
    {
      name: "Totka",
      email: "totka@totakashtakam.kali",
      age: 99,
      isActive: false,
    },
    {
      name: "Mayasur",
      email: "mayasur@ramayan.treta",
      age: 888,
      isActive: false,
    },
    {
      name: "Pishacha",
      email: "pishacha@padma.all",
      age: 300,
      isActive: false,
    },
    {
      name: "Bakasur",
      email: "bakasur@mahabharat.dvapara",
      age: 199,
      isActive: false,
    },
    {
      name: "Ravana",
      email: "ravana@ramayana.treta",
      age: 600,
      isActive: false,
    },
    {
      name: "Kumbhakarna",
      email: "kumbhakarna@ramayana.treta",
      age: 500,
      isActive: false,
    },
    {
      name: "Hiranyakashipu",
      email: "hiranyakashipu@vishnupuran.satya",
      age: 1_000,
      isActive: false,
    },
    {
      name: "Hiranyaksha",
      email: "hiranyaksha@vishnupuran.satya",
      age: 950,
      isActive: false,
    },
    {
      name: "Mahishasura",
      email: "mahishasura@markandeypuran.kali",
      age: 350,
      isActive: false,
    },
    {
      name: "Narakasura",
      email: "narakasura@vishnupuran.dvapara",
      age: 275,
      isActive: false,
    },
    {
      name: "Banasura",
      email: "banasura@bhagavatpuran.dvapara",
      age: 500,
      isActive: true, // Believed to be alive under Krishna's blessing
    },
    {
      name: "Tarakasura",
      email: "tarakasura@shivpuran.satya",
      age: 450,
      isActive: false,
    },
    {
      name: "Vatapi",
      email: "vatapi@vishnupuran.treta",
      age: 300,
      isActive: false,
    },
    {
      name: "Ilvala",
      email: "ilvala@vishnupuran.treta",
      age: 320,
      isActive: false,
    },
    {
      name: "Prahlada",
      email: "prahlada@vishnupuran.satya",
      age: 850,
      isActive: true, // Considered an immortal devotee of Vishnu
    },
    {
      name: "Andhaka",
      email: "andhaka@shivpuran.treta",
      age: 600,
      isActive: false,
    },
    {
      name: "Vritra",
      email: "vritra@rigveda.satya",
      age: 900,
      isActive: false,
    },
    {
      name: "Mahi Ravana",
      email: "mahiravana@ramayana.treta",
      age: 550,
      isActive: false,
    },
    {
      name: "Jalandhara",
      email: "jalandhara@shivpuran.satya",
      age: 1_200,
      isActive: false,
    },
    {
      name: "Kalakeyas",
      email: "kalakeyas@mahabharat.dvapara",
      age: 1_000,
      isActive: true, // Some texts mention they reside in the ocean depths
    },
    {
      name: "Viprachitti",
      email: "viprachitti@vishnupuran.treta",
      age: 800,
      isActive: true, // Considered a ruler of Asura realms
    },
    {
      name: "Maya Danava",
      email: "maya@mahabharat.dvapara",
      age: 1_500,
      isActive: true, // The eternal architect of the Asuras
    },
    {
      name: "Shiladitya",
      email: "shiladitya@skandpuran.kali",
      age: 400,
      isActive: true, // Guardian of Asura realms
    },
  ];

  // Function to POST Asuras to the API
  const uploadAsuras = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Upload each Asura object one by one
      await Promise.all(
        asurs.map(async (asur) => {
          console.log("Uploading Asura: ", asur);
          const response = await axios.post(
            "https://node5.onrender.com/user/user",
            asur,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("✅ Uploaded:", response.data);
        })
      );

      setMessage("✅ All Asuras uploaded successfully!");
    } catch (error) {
      setMessage("❌ Error uploading Asuras!");
      console.error(
        "❌ Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Asura Uploader</h1>

      <button onClick={uploadAsuras} disabled={loading}>
        {loading ? "Uploading..." : "Upload Asuras"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};
