export type SkillCategory =
  | 'fullstack-python'
  | 'rpa-python'
  | 'api-frontend'
  | 'ai-llm'
  | 'data-analysis'
  | 'support-ops'

export interface Project {
  id: string
  title: string
  description: string
  skills: SkillCategory[]
  primarySkill: SkillCategory
  stack: string[]
  demoUrl?: string
  repoUrl?: string
  imageUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
}

export const SKILL_COLORS: Record<SkillCategory, string> = {
  'fullstack-python': '#2B6CB0', // Azul
  'rpa-python': '#2F855A',       // Verde
  'api-frontend': '#D53F8C',     // Fucsia
  'ai-llm': '#6B46C1',           // Morado
  'data-analysis': '#DD6B20',    // Naranja
  'support-ops': '#718096',      // Gris
}

export const SKILL_LABELS: Record<SkillCategory, string> = {
  'fullstack-python': 'Full-Stack Python',
  'rpa-python': 'RPA Python',
  'api-frontend': 'APIs Frontend',
  'ai-llm': 'IA/LLM Local',
  'data-analysis': 'Análisis Datos',
  'support-ops': 'Soporte/Ops',
}
