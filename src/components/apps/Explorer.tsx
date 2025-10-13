import { useState } from 'react'
import { projects } from '../../data/projects'
import { SKILL_COLORS, SKILL_LABELS } from '../../types/project'
import type { SkillCategory } from '../../types/project'
import './Explorer.css'

export const Explorer: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | 'all'>('all')

  const filteredProjects =
    selectedSkill === 'all'
      ? projects
      : projects.filter((p) => p.skills.includes(selectedSkill))

  const skillCategories: SkillCategory[] = [
    'fullstack-python',
    'rpa-python',
    'api-frontend',
    'ai-llm',
    'data-analysis',
    'support-ops',
  ]

  return (
    <div className="explorer">
      <div className="explorer__toolbar">
        <div className="explorer__toolbar-title">📁 My Projects</div>
        <div className="explorer__toolbar-path">C:\Users\Manuel\Projects</div>
      </div>

      <div className="explorer__filters">
        <button
          className={`explorer__filter ${selectedSkill === 'all' ? 'explorer__filter--active' : ''}`}
          onClick={() => setSelectedSkill('all')}
        >
          All Projects ({projects.length})
        </button>
        {skillCategories.map((skill) => {
          const count = projects.filter((p) => p.skills.includes(skill)).length
          return (
            <button
              key={skill}
              className={`explorer__filter ${selectedSkill === skill ? 'explorer__filter--active' : ''}`}
              style={{
                borderLeftColor: SKILL_COLORS[skill],
                borderLeftWidth: '4px',
              }}
              onClick={() => setSelectedSkill(skill)}
            >
              {SKILL_LABELS[skill]} ({count})
            </button>
          )
        })}
      </div>

      <div className="explorer__content">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div
              className="project-card__header"
              style={{ backgroundColor: SKILL_COLORS[project.primarySkill] }}
            >
              <div className="project-card__status">{project.status}</div>
            </div>

            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>

              <div className="project-card__stack">
                <strong>Stack:</strong>
                <div className="project-card__stack-list">
                  {project.stack.map((tech) => (
                    <span key={tech} className="project-card__stack-item">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-card__skills">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="project-card__skill-badge"
                    style={{
                      backgroundColor: SKILL_COLORS[skill],
                    }}
                  >
                    {SKILL_LABELS[skill]}
                  </span>
                ))}
              </div>

              <div className="project-card__actions">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    📦 Repo
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__link"
                  >
                    🚀 Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
