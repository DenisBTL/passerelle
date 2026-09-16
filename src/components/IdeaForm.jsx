import React from "react";
import { forwardRef } from "react";
import { stages } from "../data";
import Icon from "./Icon";

const IdeaForm = forwardRef(function IdeaForm(
  { draft, setDraft, success, setSuccess, onClose },
  ref,
) {
  function change(event) {
    setDraft((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <section
      className={`idea-card ${success ? "is-success" : ""}`}
      aria-labelledby="idea-title"
      ref={ref}
    >
      {onClose && (
        <button
          className="idea-close icon-button"
          aria-label="Replier le formulaire"
          onClick={onClose}
        >
          <Icon name="close" size={16} />
        </button>
      )}
      {success ? (
        <div className="form-success" role="status">
          <span className="success-icon">
            <Icon name="check" size={25} />
          </span>
          <h2 id="idea-title">Une belle connexion en perspective !</h2>
          <p>
            Votre idée pour{" "}
            <strong>{stages.find((s) => s.id === draft.stage)?.label}</strong> a
            bien été prise en compte dans cette démonstration.
          </p>
          <p className="fine-print">
            Prototype : aucune donnée n’a été envoyée ni enregistrée.
          </p>
          <button
            className="button soft"
            onClick={() => {
              setSuccess(false);
              setDraft({
                structure: "",
                stage: "",
                problem: "",
                idea: "",
                email: "",
              });
            }}
          >
            Proposer une autre idée <Icon name="plus" size={16} />
          </button>
        </div>
      ) : (
        <>
          <h2 id="idea-title">
            <Icon name="bulb" size={23} /> Déposer une idée
          </h2>
          <p className="idea-intro">
            Une connexion manque ? Imaginons-la ensemble.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSuccess(true);
            }}
          >
            <div className="form-grid">
              <label>
                Nom de la solution / structure
                <input
                  name="structure"
                  autoComplete="organization"
                  placeholder="Votre domaine ou votre solution"
                  value={draft.structure}
                  onChange={change}
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Étape concernée
                <select
                  name="stage"
                  value={draft.stage}
                  onChange={change}
                  required
                >
                  <option value="" disabled>
                    Sélectionner une étape
                  </option>
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Problème rencontré
                <textarea
                  name="problem"
                  placeholder="Ce qui vous freine aujourd’hui…"
                  value={draft.problem}
                  onChange={change}
                  required
                  maxLength={2000}
                  rows={2}
                />
              </label>
              <label>
                Idée de passerelle
                <textarea
                  name="idea"
                  placeholder="La connexion que vous imaginez…"
                  value={draft.idea}
                  onChange={change}
                  required
                  maxLength={2000}
                  rows={2}
                />
              </label>
              <label className="email-field">
                Votre email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@votre-domaine.fr"
                  value={draft.email}
                  onChange={change}
                  required
                  maxLength={254}
                />
              </label>
              <button className="button primary submit-idea" type="submit">
                Envoyer mon idée <Icon name="arrow" size={16} />
              </button>
            </div>
            <p className="form-notice">Démonstration · aucun envoi réel</p>
          </form>
        </>
      )}
    </section>
  );
});
export default IdeaForm;
