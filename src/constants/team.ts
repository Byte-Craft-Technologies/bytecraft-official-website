/**
 * Données des membres de l'équipe (données statiques uniquement)
 * Les textes traduits (role, bio) viennent des fichiers de traduction
 */

import type { TeamMemberData } from '@/types';

export const TEAM_MEMBERS_DATA: TeamMemberData[] = [
  {
    id: 'member-1',
    translationKey: 'honore',
    name: 'Mahugnon Houékpétodji',
    image: '/team/honore.png',
    skills: ['Java', 'Spring Boot', 'Angular', 'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker'],
    social: {
      linkedin: 'https://linkedin.com/in/honore-mhouekpe',
      github: 'https://github.com/honoremhouekpe',
    },
  },
  {
    id: 'member-2',
    translationKey: 'donald',
    name: 'Donald Faly',
    image: '/team/member3.jpg',
    skills: ['React', 'React Native', 'Next.js', 'WordPress', 'HTML/CSS', 'JavaScript'],

    social: {
      linkedin: '#',
    },
  },
  {
    id: 'member-3',
    translationKey: 'member3',
    name: 'Wiem Garder',
    image: '/team/member3.jpg',
    skills: ['Figma', 'UI Design', 'Prototyping', 'Design System'],
       social: {
      github: '#',
    },
  },
];