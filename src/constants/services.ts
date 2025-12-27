/**
 * Configuration des services offerts
 */

import type { Service, Technology } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'web',
    icon: '🌐',
    titleKey: 'web.title',
    descriptionKey: 'web.description',
    detailsKey: 'web.details',
    technologies: ['React JS', 'Next.js', 'WordPress', 'Spring MVC'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'mobile',
    icon: '📱',
    titleKey: 'mobile.title',
    descriptionKey: 'mobile.description',
    detailsKey: 'mobile.details',
    technologies: ['React Native', 'Java', 'Spring Boot'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'backend',
    icon: '⚙️',
    titleKey: 'backend.title',
    descriptionKey: 'backend.description',
    detailsKey: 'backend.details',
    technologies: ['Java EE', 'Spring Boot', 'Spring Security', 'Python'],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'ai',
    icon: '🤖',
    titleKey: 'ai.title',
    descriptionKey: 'ai.description',
    detailsKey: 'ai.details',
    technologies: ['Spring AI', 'Python', 'OpenAI', 'LangChain'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'consulting',
    icon: '💡',
    titleKey: 'consulting.title',
    descriptionKey: 'consulting.description',
    detailsKey: 'consulting.details',
    technologies: ['Agile', 'Scrum', 'UML', 'Design Thinking'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'deploy',
    icon: '🚀',
    titleKey: 'deploy.title',
    descriptionKey: 'deploy.description',
    detailsKey: 'deploy.details',
    technologies: ['Docker', 'AWS', 'Vercel', 'VPS', 'GitHub Actions'],
    color: 'from-cyan-500 to-blue-500',
  },
] as const;

export const TECHNOLOGIES: Technology[] = [
  { name: 'Java EE', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Spring AI', category: 'AI' },
  { name: 'Spring MVC', category: 'Backend' },
  { name: 'Spring Security', category: 'Backend' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'React JS', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'WordPress', category: 'CMS' },
  { name: 'Python', category: 'Backend' },
] as const;