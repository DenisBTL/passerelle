import React from "react";
import { howItWorks, useCases } from "../data";
import { asset } from "../assets";
import Icon from "./Icon";

export default function SupportingSections({ onNavigate, onCase }) {
  return (
    <section className="supporting-sections" aria-label="Comprendre le projet">
      <div className="how-intro">
        <h2>Comment ça marche ?</h2>
        <p>
          Un parcours simple pour connecter vos outils et faire circuler vos
          données, de la vigne à la vente.
        </p>
        <button
          className="button soft small"
          onClick={() => onNavigate("project", "how")}
        >
          En savoir plus <Icon name="arrow" size={15} />
        </button>
      </div>
      <div className="how-steps">
        {howItWorks.map((step, index) => (
          <article className="how-step" key={step.title}>
            <span className="step-number">{index + 1}</span>
            <span className="step-icon">
              <Icon name={step.icon} size={26} />
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
      <div className="use-cases">
        <div className="section-heading">
          <h2>Cas d’usage</h2>
          <span>Des liens concrets</span>
        </div>
        <div className="case-grid">
          {useCases.map((item) => (
            <button
              className="case-card"
              key={item.id}
              onClick={() => onCase(item)}
            >
              <img src={asset(`assets/images/${item.image}`)} alt="" loading="lazy" />
              <strong>{item.title}</strong>
              <span>{item.description}</span>
              <span className="read-case">
                Lire le cas <Icon name="arrow" size={13} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
