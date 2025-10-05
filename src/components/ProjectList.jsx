import { useState, useMemo, useEffect } from "react";
import useProjects from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import useReveal from "../hooks/useReveal";
import { useI18n } from "../i18n/I18nProvider";

export default function ProjectList() {
  useReveal();
  const { t } = useI18n();
  const projects = useProjects();

  const readHash = () => decodeURIComponent(window.location.hash.replace("#",""));
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const apply = () => {
      const id = readHash();
      if (id && projects.some(p => p.id === id)) setOpenId(id);
      else setOpenId(null);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [projects]);

  useEffect(() => {
    if (!openId) return;
    const el = document.getElementById(openId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const btn = el.querySelector("button");
      btn && btn.focus();
    }
  }, [openId]);

  const openIndex = useMemo(
    () => projects.findIndex(p => p.id === openId),
    [openId, projects]
  );

  const handleToggle = (id) => {
    if (openId === id) {
      history.replaceState(null, "", " ");
      setOpenId(null);
    } else {
      history.pushState(null, "", `#${encodeURIComponent(id)}`);
      setOpenId(id);
    }
  };

  return (
    <section id="projects" className="mb-14 md:mb-20">
      <h3 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-3">
        {t("sections.projects")}
      </h3>
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-40 md:mb-7">
        {t("sections.projectsparagraph")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((p, index) => {
          const isExpanded = openId === p.id;
          const isLeftOfExpanded =
            openIndex !== -1 && openIndex % 2 === 1 && index === openIndex - 1;
          const colSpan = isExpanded || isLeftOfExpanded ? "md:col-span-2" : "";

          return (
            <div key={p.id} className={`${colSpan} js-reveal`} id={p.id}>
              <ProjectCard
                project={p}
                expanded={isExpanded}
                onToggle={() => handleToggle(p.id)}
                anchorId={p.id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
