import React from "react";
import { project, stages, solutions } from "../data";
import { asset } from "../assets";
import Icon, { GrapeMark } from "./Icon";
import IdeaForm from "./IdeaForm";
import MobileStageExplorer from "./MobileStageExplorer";

export function SolutionCard({ solution, onClick, className = "" }) {
  return (
    <button
      className={`solution-card ${solution.color} ${className}`}
      onClick={() => onClick(solution)}
      aria-label={`Découvrir ${solution.title}`}
    >
      <span className="solution-heading">
        <Icon name={solution.icon} size={32} />
        <strong>{solution.title}</strong>
      </span>
      <span className="solution-description">{solution.description}</span>
      <span className="api-badge">
        Intégration API <span aria-hidden="true">↗</span>
      </span>
    </button>
  );
}

function Connectors() {
  return (
    <svg
      className="network-lines"
      viewBox="0 0 1560 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g className="connector green">
        <path d="M593 277v27q0 14 16 14h95q16 0 16 16v76M533 277v133" />
        <circle cx="593" cy="277" r="3.5" />
        <circle cx="720" cy="410" r="3.5" />
        <circle cx="533" cy="410" r="3.5" />
      </g>
      <g className="connector blue">
        <path d="M870 274v23q0 15-15 15h-25q-15 0-15 15v83M245 550v72q0 17-17 17h-30" />
        <circle cx="870" cy="274" r="3.5" />
        <circle cx="815" cy="410" r="3.5" />
        <circle cx="245" cy="550" r="3.5" />
        <circle cx="198" cy="639" r="3.5" />
      </g>
      <g className="connector pink">
        <path d="M1158 286v22q0 14-14 14h-19q-14 0-14 14v74" />
        <circle cx="1158" cy="286" r="3.5" />
        <circle cx="1111" cy="410" r="3.5" />
      </g>
      <g className="connector purple">
        <path d="M1406 393v17" />
        <circle cx="1406" cy="393" r="3.5" />
        <circle cx="1406" cy="410" r="3.5" />
      </g>
      <g className="connector orange">
        <path d="M1008 550v85q0 16 16 16h19" />
        <circle cx="1008" cy="550" r="3.5" />
        <circle cx="1043" cy="651" r="3.5" />
      </g>
      <g className="connector gold">
        <path d="M1270 550v40q0 16 16 16h21q16 0 16 16v19q0 14 14 14h16" />
        <circle cx="1270" cy="550" r="3.5" />
        <circle cx="1353" cy="655" r="3.5" />
      </g>
      <g className="connector burgundy">
        <path d="M750 550v48" />
        <circle cx="750" cy="550" r="4" />
      </g>
    </svg>
  );
}

export default function Journey({
  onNavigate,
  onIdea,
  onSolution,
  formRef,
  formOpen,
  setFormOpen,
  draft,
  setDraft,
  success,
  setSuccess,
}) {
  return (
    <section
      className="journey-scene"
      aria-label="Les connexions de la vigne à la vente"
    >
      <div className="hero-visual">
        <img src={asset("assets/images/vineyard.webp")} alt="" />
        <div className="hero-photo-shade" />
        <div className="hero-note">
          Ensemble pour une viticulture plus connectée, plus fluide, plus
          durable.
          <Icon name="leaf" size={37} />
        </div>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">
          Des solutions connectées pour une filière plus forte
        </p>
        <h1>
          <span>Relier</span> les <span>solutions</span>
          <br />
          de la vigne à la vente
        </h1>
        <p className="hero-description">
          {project.name} facilite l’interopérabilité entre les outils métier du
          secteur viticole, en s’appuyant sur un écosystème ouvert et les usages
          du terrain.
        </p>
        <div className="hero-actions">
          <button
            className="button primary"
            onClick={() => onNavigate("project")}
          >
            Découvrir le projet <Icon name="arrow" size={17} />
          </button>
          <button className="button outlined" onClick={() => onIdea()}>
            <Icon name="bulb" size={20} />
            Déposer une idée
          </button>
        </div>
      </div>
      <p className="handwritten hero-handwriting">
        Des données qui circulent,
        <br />
        des territoires qui avancent<span aria-hidden="true">⌒</span>
      </p>
      <Connectors />
      <div className="ecosystem-note handwritten">
        Un écosystème
        <br />
        de solutions connectées
        <svg viewBox="0 0 70 40" aria-hidden="true">
          <path
            d="M6 2Q12 38 59 31m-8-6 9 6-9 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      </div>
      {solutions.map((solution) => (
        <div
          key={solution.id}
          className={`network-solution network-${solution.id}`}
        >
          <SolutionCard solution={solution} onClick={onSolution} />
          <span className={`flow-label ${solution.color}`}>
            {solution.flow}
          </span>
        </div>
      ))}
      <div className="journey-track-area">
        <p className="mobile-track-hint">
          Votre parcours, de la vigne à la vente <span>Faites défiler →</span>
        </p>
        <div className="track-scroll">
          <div className="journey-track">
            <span className="track-end" aria-hidden="true">
              <Icon name="arrow" size={18} />
            </span>
            {stages.map((stage, index) => (
              <div className="track-fragment" key={stage.id}>
                {index === 4 && (
                  <>
                    <button
                      className="central-platform"
                      onClick={() => onNavigate("project")}
                    >
                      <GrapeMark />
                      <strong>Plateforme centrale</strong>
                      <span>Orchestre vos données</span>
                    </button>
                    <span className="track-arrow" aria-hidden="true">
                      →
                    </span>
                  </>
                )}
                <button
                  className={`stage-button ${draft.stage === stage.id ? "selected" : ""}`}
                  onClick={() => onIdea(stage.id)}
                  aria-label={`Déposer une idée : ${stage.label}`}
                  aria-pressed={draft.stage === stage.id}
                >
                  <img
                    src={asset(`assets/icons/${stage.icon || stage.id}.svg`)}
                    alt=""
                  />
                  <span>{stage.label}</span>
                  <span className="stage-plus" aria-hidden="true">
                    <Icon name="plus" size={12} />
                  </span>
                </button>
                {index < stages.length - 1 && (
                  <span className="track-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
            <span className="track-end last" aria-hidden="true">
              <Icon name="arrow" size={18} />
            </span>
          </div>
        </div>
        <p className="track-instruction">
          <span>+</span> Cliquez sur une étape pour imaginer une nouvelle
          connexion.
        </p>
      </div>
      <MobileStageExplorer onIdea={onIdea} onSolution={onSolution} />
      <div className="central-form">
        {formOpen ? (
          <IdeaForm
            ref={formRef}
            draft={draft}
            setDraft={setDraft}
            success={success}
            setSuccess={setSuccess}
            onClose={() => setFormOpen(false)}
          />
        ) : (
          <button className="form-reopen" onClick={() => onIdea()}>
            <Icon name="bulb" size={28} />
            <strong>Et si la prochaine passerelle venait de vous ?</strong>
            <span>
              Déposer une idée <Icon name="arrow" size={18} />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
