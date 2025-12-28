'use client';

/**
 * TeamSection - Section présentant l'équipe de développement
 * Utilise i18n pour les textes (role, bio)
 */

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { TeamMemberCard } from './TeamMemberCard';
import { TEAM_MEMBERS_DATA } from '@/constants';
import type {TeamMember, TeamSectionProps} from '@/types';



export default function TeamSection({ membersData = TEAM_MEMBERS_DATA }: TeamSectionProps) {
  const t = useTranslations('team');
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const members: TeamMember[] = useMemo(() => {
    return membersData.map((memberData) => ({
      ...memberData,
      role: t(`members.${memberData.translationKey}.role`),
      bio: t(`members.${memberData.translationKey}.bio`),
    }));
  }, [membersData, t]);

  return (
    <section
      id="team"
      className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden"
    >
      {/* Decorative blur elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isHovered={hoveredMemberId === member.id}
              onHover={() => setHoveredMemberId(member.id)}
              onLeave={() => setHoveredMemberId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}