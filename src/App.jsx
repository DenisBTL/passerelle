import React from "react";
import { useEffect, useRef, useState } from "react";
import { project } from "./data";
import Header, { Footer } from "./components/Header";
import Journey from "./components/Journey";
import SupportingSections from "./components/SupportingSections";
import {
  ProjectPanel,
  SolutionsPanel,
  ContactPanel,
  SolutionDetail,
  CaseDetail,
} from "./components/ContentPanels";
import Dialog, { SearchContent } from "./components/Dialog";

export default function App() {
  const [view, setView] = useState("journey");
  const [projectTab, setProjectTab] = useState("vision");
  const [dialog, setDialog] = useState(null);
  const [formOpen, setFormOpen] = useState(true);
  const [success, setSuccess] = useState(false);
  const [draft, setDraft] = useState({
    structure: "",
    stage: "",
    problem: "",
    idea: "",
    email: "",
  });
  const [focusRequest, setFocusRequest] = useState(0);
  const formRef = useRef(null);
  const mainRef = useRef(null);
  useEffect(() => {
    document.title = `${project.name} — De la vigne à la vente`;
  }, []);
  useEffect(() => {
    if (!focusRequest || !formRef.current) return;
    formRef.current.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
    });
    formRef.current.querySelector("input")?.focus({ preventScroll: true });
  }, [focusRequest]);

  function openIdea(stage) {
    setDialog(null);
    setView("journey");
    setFormOpen(true);
    setSuccess(false);
    if (stage) setDraft((current) => ({ ...current, stage }));
    setFocusRequest((current) => current + 1);
  }
  function navigate(nextView, tab) {
    if (nextView === "idea") {
      openIdea();
      return;
    }
    setView(nextView);
    setDialog(null);
    if (nextView === "project") setProjectTab(tab || "vision");
    window.scrollTo({ top: 0, behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Header
        active={view === "join" ? "contact" : view}
        onNavigate={navigate}
        onSearch={() => setDialog({ type: "search" })}
      />
      <main id="main" ref={mainRef} tabIndex={-1}>
        {view === "journey" && (
          <>
            <Journey
              onNavigate={navigate}
              onIdea={openIdea}
              onSolution={(solution) =>
                setDialog({ type: "solution", data: solution })
              }
              formRef={formRef}
              formOpen={formOpen}
              setFormOpen={setFormOpen}
              draft={draft}
              setDraft={setDraft}
              success={success}
              setSuccess={setSuccess}
            />
            <SupportingSections
              onNavigate={navigate}
              onCase={(item) => setDialog({ type: "case", data: item })}
            />
          </>
        )}
        {view === "project" && (
          <ProjectPanel
            tab={projectTab}
            setTab={setProjectTab}
            onNavigate={navigate}
          />
        )}
        {view === "solutions" && (
          <SolutionsPanel
            onNavigate={navigate}
            onSolution={(solution) =>
              setDialog({ type: "solution", data: solution })
            }
          />
        )}
        {(view === "contact" || view === "join") && (
          <ContactPanel
            key={view}
            join={view === "join"}
            onNavigate={navigate}
          />
        )}
      </main>
      <Footer onNavigate={navigate} />
      {dialog && (
        <Dialog
          key={dialog.type + (dialog.data?.id || "")}
          onClose={() => setDialog(null)}
          label={
            dialog.type === "search"
              ? "Rechercher une connexion"
              : dialog.data.title
          }
        >
          {dialog.type === "solution" && (
            <SolutionDetail solution={dialog.data} onIdea={openIdea} />
          )}
          {dialog.type === "case" && (
            <CaseDetail item={dialog.data} onIdea={openIdea} />
          )}
          {dialog.type === "search" && (
            <SearchContent
              onIdea={openIdea}
              onSolution={(solution) =>
                setDialog({ type: "solution", data: solution })
              }
            />
          )}
        </Dialog>
      )}
    </>
  );
}
