/**
 * Types pour la section Team
 */

export interface TeamMemberData {
  id: string;
  translationKey?: string;
  name: string;
  image: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface TeamMember extends TeamMemberData {
  role: string;
  bio: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  isHovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export interface TeamSectionProps {
  membersData?: TeamMemberData[];
}