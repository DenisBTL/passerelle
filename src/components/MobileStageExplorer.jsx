import React, { useRef, useState } from "react";
import { stages, ongoingProjects, solutions } from "../data";
import { asset } from "../assets";
import Icon from "./Icon";

export default function MobileStageExplorer({ onIdea, onSolution }) {
  const [selectedId, setSelectedId] = useState(stages[0].id);
  const scrollRef = useRef(null);
  const buttonRefs = useRef([]);
  const selectedStage = stages.find((stage) => stage.id === selectedId);
  const selectedIndex = stages.findIndex((stage) => stage.id === selectedId);
  const projects = ongoingProjects.filter((item) =>
    item.stageIds.includes(selectedId),
  );

  function selectStage(index, focus = false) {
    const button = buttonRefs.current[index];
    const scroller = scrollRef.current;
    setSelectedId(stages[index].id);
    if (focus) button?.focus({ preventScroll: true });
    if (button && scroller) {
      // Déplacer uniquement la frise, sans faire sauter la page verticalement.
      scroller.scrollTo({
        left:
          button.offsetLeft - (scroller.clientWidth - button.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }

  function handleKey(event, index) {
    const targets = {
      ArrowRight: Math.min(index + 1, stages.length - 1),
      ArrowLeft: Math.max(index - 1, 0),
      Home: 0,
      End: stages.length - 1,
    };
    if (Object.hasOwn(targets, event.key)) {
      event.preventDefault();
      selectStage(targets[event.key], true);
    }
  }

  return (
    <section
      className="mobile-stage-explorer"
      aria-label="Explorer les projets par étape"
    >
      <div className="explorer-heading">
        <div>
          <p className="eyebrow">De la vigne à la vente</p>
          <h2>À chaque étape, des projets.</h2>
        </div>
        <div className="stage-controls">
          <button
            className="icon-button"
            aria-label="Étape précédente"
            disabled={selectedIndex === 0}
            onClick={() => selectStage(selectedIndex - 1)}
          >
            <Icon name="arrow" className="previous-arrow" size={19} />
          </button>
          <button
            className="icon-button"
            aria-label="Étape suivante"
            disabled={selectedIndex === stages.length - 1}
            onClick={() => selectStage(selectedIndex + 1)}
          >
            <Icon name="arrow" size={19} />
          </button>
        </div>
      </div>
      <p className="explorer-hint">
        Faites glisser les icônes, puis touchez une étape.
      </p>
      <div
        className="mobile-stage-scroll"
        ref={scrollRef}
        role="group"
        aria-label="Étapes du parcours"
      >
        {stages.map((stage, index) => {
          const count = ongoingProjects.filter((item) =>
            item.stageIds.includes(stage.id),
          ).length;
          return (
            <button
              key={stage.id}
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              className={`mobile-stage-button ${stage.id === selectedId ? "selected" : ""}`}
              aria-label={`Voir les projets : ${stage.label}`}
              aria-pressed={stage.id === selectedId}
              aria-controls="stage-projects"
              onClick={() => selectStage(index)}
              onKeyDown={(event) => handleKey(event, index)}
            >
              <span className="mobile-stage-icon">
                <img
                  src={asset(`assets/icons/${stage.icon || stage.id}.svg`)}
                  alt=""
                />
                <span className="project-count" aria-hidden="true">
                  {count}
                </span>
              </span>
              <span>{stage.label}</span>
            </button>
          );
        })}
      </div>
      <section
        className="stage-projects"
        id="stage-projects"
        aria-labelledby="stage-projects-title"
      >
        <div className="stage-projects-heading">
          <div>
            <p className="eyebrow">Projets en cours</p>
            <h3 id="stage-projects-title">{selectedStage.label}</h3>
          </div>
          <span
            className="projects-total"
            aria-live="polite"
            aria-atomic="true"
          >
            {projects.length} projet{projects.length > 1 ? "s" : ""} ·{" "}
            {selectedStage.label}
          </span>
        </div>
        <p className="stage-description">{selectedStage.description}</p>
        <p className="projects-demo-note">
          Projets et statuts de démonstration
        </p>
        <div className="stage-project-list">
          {projects.map((item) => {
            const solution = solutions.find(
              (entry) => entry.id === item.solutionId,
            );
            return (
              <button
                key={item.id}
                className={`stage-project-card ${solution.color}`}
                onClick={() => onSolution({ ...solution, stage: selectedId })}
                aria-label={`Découvrir le projet : ${item.title}`}
              >
                <span className="project-card-top">
                  <span className="project-type-icon">
                    <Icon name={solution.icon} size={24} />
                  </span>
                  <span className="project-status">{item.status}</span>
                </span>
                <strong>{item.title}</strong>
                <span className="project-description">{item.description}</span>
                <span className="project-card-link">
                  Découvrir la connexion <Icon name="arrow" size={15} />
                </span>
              </button>
            );
          })}
          {projects.length === 0 && (
            <p className="projects-empty">
              Aucun projet à cette étape pour le moment. Votre idée peut lancer
              la prochaine connexion.
            </p>
          )}
        </div>
        <button
          className="button outlined stage-idea-button"
          onClick={() => onIdea(selectedId)}
        >
          <Icon name="plus" size={17} />
          Proposer une idée pour cette étape
        </button>
      </section>
    </section>
  );
}
