import React from "react";
import { useState } from "react";
import { howItWorks, project, solutions, stages } from "../data";
import { asset } from "../assets";
import { SolutionCard } from "./Journey";
import Icon from "./Icon";

function PanelHeading({ eyebrow, title, children, onBack }) {
  return (
    <div className="panel-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      <button className="button outlined" onClick={onBack}>
        Voir le parcours <Icon name="arrow" size={17} />
      </button>
    </div>
  );
}

export function ProjectPanel({ tab, setTab, onNavigate }) {
  const tabs = [
    { id: "vision", label: "Notre vision" },
    { id: "commitments", label: "Nos engagements" },
    { id: "how", label: "Comment ça marche" },
  ];
  return (
    <section className="content-panel">
      <PanelHeading
        eyebrow="Le projet · construire ensemble"
        title="Des outils différents. Une ambition commune."
        onBack={() => onNavigate("journey")}
      >
        Remettre les usages du terrain au cœur des connexions entre solutions
        viticoles.
      </PanelHeading>
      <div className="subnav" aria-label="Rubriques du projet">
        {tabs.map((item) => (
          <button
            key={item.id}
            aria-pressed={item.id === tab}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="project-body" key={tab}>
        {tab === "vision" && (
          <>
            <div className="project-photo">
              <img
                src={asset("assets/images/vineyard.webp")}
                alt="Vignes baignées par la lumière du soleil couchant"
              />
              <span>
                De la donnée au terrain.
                <br />
                <em>Et du terrain au collectif.</em>
              </span>
            </div>
            <div className="project-text">
              <p className="eyebrow">Relier ce qui existe déjà</p>
              <h2>
                Le bon outil, connecté
                <br />
                au bon endroit.
              </h2>
              <p>
                Du suivi des parcelles à la relation client, chaque métier a ses
                outils. Pourtant, les mêmes informations sont souvent saisies
                plusieurs fois, puis difficiles à retrouver.
              </p>
              <p>
                {project.name} est un projet d’écosystème ouvert : créer des
                passerelles entre ces solutions pour que les données
                accompagnent le vin, tout au long de son parcours.
              </p>
              <p>
                Le point de départ est simple : vos besoins concrets. Une
                connexion utile commence par une difficulté du quotidien que
                l’on peut résoudre ensemble.
              </p>
              <button
                className="button primary"
                onClick={() => onNavigate("idea")}
              >
                Partager mon besoin <Icon name="arrow" size={17} />
              </button>
            </div>
          </>
        )}
        {tab === "commitments" && (
          <div className="values-grid">
            {[
              {
                icon: "leaf",
                title: "Partir du terrain",
                text: "Construire à partir des besoins des domaines, des équipes et des métiers de la filière.",
              },
              {
                icon: "link",
                title: "Garder un écosystème ouvert",
                text: "Permettre aux solutions de dialoguer, tout en laissant à chacun le choix de ses outils.",
              },
              {
                icon: "check",
                title: "Partager avec maîtrise",
                text: "Clarifier les données utiles, leur destination et les autorisations avant de créer une connexion.",
              },
            ].map((value) => (
              <article className="value-card" key={value.title}>
                <Icon name={value.icon} size={32} />
                <h2>{value.title}</h2>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        )}
        {tab === "how" && (
          <div className="values-grid">
            {howItWorks.map((step, index) => (
              <article className="value-card" key={step.title}>
                <span className="large-step">0{index + 1}</span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
                <p>
                  {
                    [
                      "Cliquez sur une étape du parcours et décrivez les informations qui devraient circuler entre vos outils.",
                      "Le besoin partagé aide à identifier les fonctions à relier et les données nécessaires à la connexion.",
                      "Une passerelle peut ensuite être précisée, testée et améliorée avec les personnes qui l’utilisent.",
                    ][index]
                  }
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function SolutionsPanel({ onNavigate, onSolution }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "Toutes les connexions" },
    { id: "production", label: "Vigne, chai & logistique" },
    { id: "commerce", label: "Commerce & relation client" },
    { id: "administration", label: "Administratif & export" },
  ];
  const filtered = solutions.filter(
    (s) => filter === "all" || s.category === filter,
  );
  return (
    <section className="content-panel">
      <PanelHeading
        eyebrow="Les solutions · un écosystème ouvert"
        title="À chaque besoin, une connexion à imaginer."
        onBack={() => onNavigate("journey")}
      >
        Explorez les fonctions qui peuvent dialoguer tout au long du parcours
        viticole.
      </PanelHeading>
      <div className="subnav" aria-label="Filtrer les solutions">
        {filters.map((item) => (
          <button
            key={item.id}
            aria-pressed={item.id === filter}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} pistes de connexion
      </p>
      <div className="solutions-grid">
        {filtered.map((solution) => (
          <SolutionCard
            key={solution.id}
            solution={solution}
            onClick={onSolution}
          />
        ))}
      </div>
      <div className="panel-callout">
        <Icon name="bulb" size={26} />
        <p>
          Votre besoin ne figure pas ici ?{" "}
          <strong>Le parcours se construit aussi avec vous.</strong>
        </p>
        <button className="button primary" onClick={() => onNavigate("idea")}>
          Proposer une connexion <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  );
}

export function ContactPanel({ join, onNavigate }) {
  const [sent, setSent] = useState(false);
  return (
    <section className="content-panel contact-panel">
      <PanelHeading
        eyebrow={join ? "Rejoindre le projet" : "Entrons en contact"}
        title={
          join
            ? "La prochaine connexion commence avec vous."
            : "Faisons connaissance."
        }
        onBack={() => onNavigate("journey")}
      >
        Vous êtes un domaine, un éditeur de solution ou un acteur de la filière
        ? Échangeons sur vos usages.
      </PanelHeading>
      <div className="contact-grid">
        <div className="contact-story">
          <Icon name="link" size={38} />
          <h2>
            Des idées à partager.
            <br />
            Des liens à construire.
          </h2>
          <p>
            Une question, une envie de contribuer ou un besoin précis :
            racontez-nous ce qui vous amène.
          </p>
          <p>
            Pour proposer une connexion à une étape du parcours, vous pouvez
            aussi utiliser le formulaire dédié.
          </p>
          <button
            className="button outlined"
            onClick={() => onNavigate("idea")}
          >
            Déposer une idée <Icon name="arrow" size={17} />
          </button>
        </div>
        <div className="contact-form-card">
          {sent ? (
            <div className="form-success" role="status">
              <span className="success-icon">
                <Icon name="check" />
              </span>
              <h2>Merci pour votre intérêt !</h2>
              <p>
                Votre {join ? "demande de participation" : "message"} a été
                validé dans cette démonstration.
              </p>
              <p className="fine-print">
                Aucun message n’a été envoyé ni enregistré.
              </p>
              <button className="button soft" onClick={() => setSent(false)}>
                Rédiger un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h2>{join ? "Prenons part au collectif" : "Votre message"}</h2>
              <div className="form-grid">
                <label>
                  Votre nom
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Prénom et nom"
                  />
                </label>
                <label>
                  Votre structure
                  <input
                    name="organization"
                    autoComplete="organization"
                    required
                    maxLength={120}
                    placeholder="Nom de votre structure"
                  />
                </label>
                <label className="full-width">
                  Votre email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="vous@votre-domaine.fr"
                  />
                </label>
                {join && (
                  <label className="full-width">
                    Vous représentez
                    <select name="role" defaultValue="" required>
                      <option value="" disabled>
                        Sélectionner votre profil
                      </option>
                      <option>Un domaine viticole</option>
                      <option>Une solution métier</option>
                      <option>Une organisation de la filière</option>
                      <option>Un autre acteur</option>
                    </select>
                  </label>
                )}
                <label className="full-width">
                  {join
                    ? "Comment aimeriez-vous contribuer ?"
                    : "Votre message"}
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={3000}
                    placeholder="Parlez-nous de vos usages et de vos envies…"
                  />
                </label>
              </div>
              <button className="button primary" type="submit">
                {join ? "Exprimer mon intérêt" : "Envoyer mon message"}{" "}
                <Icon name="arrow" size={17} />
              </button>
              <p className="form-notice">Démonstration · aucun envoi réel</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function SolutionDetail({ solution, onIdea }) {
  return (
    <>
      <span className={`detail-icon ${solution.color}`}>
        <Icon name={solution.icon} size={38} />
      </span>
      <p className="eyebrow">Une piste de connexion</p>
      <h2>{solution.title}</h2>
      <p>{solution.detail}</p>
      <h3>Les informations qui pourraient circuler</h3>
      <ul className="exchange-list">
        {solution.exchanges.map((item) => (
          <li key={item}>
            <Icon name="check" size={17} />
            {item}
          </li>
        ))}
      </ul>
      <p className="detail-stage">
        Étape associée :{" "}
        <strong>{stages.find((s) => s.id === solution.stage)?.label}</strong>
      </p>
      <button className="button primary" onClick={() => onIdea(solution.stage)}>
        Proposer une idée à cette étape <Icon name="arrow" size={17} />
      </button>
    </>
  );
}

export function CaseDetail({ item, onIdea }) {
  return (
    <>
      <img
        className="case-detail-image"
        src={asset(`assets/images/${item.image}`)}
        alt=""
      />
      <p className="eyebrow">Cas d’usage · scénario illustratif</p>
      <h2>{item.title}</h2>
      <h3>Le besoin du quotidien</h3>
      <p>{item.problem}</p>
      <h3>La passerelle à imaginer</h3>
      <p>{item.connection}</p>
      <div className="benefit">
        <Icon name="check" />
        <p>{item.benefit}</p>
      </div>
      <button className="button primary" onClick={() => onIdea(item.stage)}>
        J’ai un besoin similaire <Icon name="arrow" size={17} />
      </button>
    </>
  );
}
