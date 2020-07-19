import React from "react";
import medicine from "../assets/medicine.svg";
export default function MainPymes() {
  return (
    <>
      <main>
        <div className="hero-cta">
          <h1>Es hora de prevenir el COVID-19</h1>
          <p>Con EntelteCuida</p>
          <button>Entra ahora</button>
        </div>
        <div className="hero-image">
          <img src={medicine} alt="" />
        </div>
      </main>
    </>
  );
}
