import { render, screen, fireEvent } from '@testing-library/react';
import TeamSection from '@/app/components/team/TeamSection';
import type { TeamMemberData } from '@/types';

// Mock translations for team members
const mockTranslations: Record<string, string> = {
  badge: 'badge',
  title: 'title',
  description: 'description',
  'members.alice.role': 'Frontend Developer',
  'members.alice.bio': 'Expert React et TypeScript.',
  'members.bob.role': 'UI/UX Designer',
  'members.bob.bio': 'Créateur d\'interfaces intuitives.',
  'members.charlie.role': 'Backend Developer',
  'members.charlie.bio': 'Architecte de systèmes robustes.',
  'members.honore.role': 'Fullstack Developer',
  'members.honore.bio': 'Test bio.',
  'members.donald.role': 'UI/UX Designer',
  'members.donald.bio': 'Test bio.',
  'members.member3.role': 'Backend Developer',
  'members.member3.bio': 'Test bio.',
};

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => mockTranslations[key] || key,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: { src: string; alt: string; fill?: boolean }) => (
    <img src={src} alt={alt} data-fill={fill ? 'true' : undefined} {...props} />
  ),
}));

describe('TeamSection', () => {
  const mockMembersData: TeamMemberData[] = [
    {
      id: 'member-1',
      translationKey: 'alice',
      name: 'Alice Developer',
      image: '/team/alice.jpg',
      skills: ['React', 'TypeScript'],
      social: { github: 'https://github.com/alice' },
    },
    {
      id: 'member-2',
      translationKey: 'bob',
      name: 'Bob Designer',
      image: '/team/bob.jpg',
      skills: ['Figma', 'UI Design'],
      social: { linkedin: 'https://linkedin.com/in/bob' },
    },
    {
      id: 'member-3',
      translationKey: 'charlie',
      name: 'Charlie Backend',
      image: '/team/charlie.jpg',
      skills: ['Node.js', 'PostgreSQL'],
      social: { github: 'https://github.com/charlie' },
    },
  ];

  describe('rendering', () => {
    it('should render section with team id', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const section = document.getElementById('team');
      expect(section).toBeInTheDocument();
    });

    it('should render section badge', () => {
      render(<TeamSection membersData={mockMembersData} />);

      expect(screen.getByText('badge')).toBeInTheDocument();
    });

    it('should render section title', () => {
      render(<TeamSection membersData={mockMembersData} />);

      expect(screen.getByText('title')).toBeInTheDocument();
    });

    it('should render section description', () => {
      render(<TeamSection membersData={mockMembersData} />);

      expect(screen.getByText('description')).toBeInTheDocument();
    });

    it('should render all team members', () => {
      render(<TeamSection membersData={mockMembersData} />);

      expect(screen.getByText('Alice Developer')).toBeInTheDocument();
      expect(screen.getByText('Bob Designer')).toBeInTheDocument();
      expect(screen.getByText('Charlie Backend')).toBeInTheDocument();
    });

    it('should render member roles from translations', () => {
      render(<TeamSection membersData={mockMembersData} />);

      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('UI/UX Designer')).toBeInTheDocument();
      expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    });
  });

  describe('member cards grid', () => {
    it('should render cards in a grid layout', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const cards = screen.getAllByTestId('team-member-card');
      expect(cards).toHaveLength(3);
    });

    it('should render correct number of cards for 2 members', () => {
      render(<TeamSection membersData={mockMembersData.slice(0, 2)} />);

      const cards = screen.getAllByTestId('team-member-card');
      expect(cards).toHaveLength(2);
    });
  });

  describe('hover state management', () => {
    it('should track hovered member', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const cards = screen.getAllByTestId('team-member-card');
      fireEvent.mouseEnter(cards[0]);

      expect(cards[0]).toHaveClass('border-cyan-500/30');
    });

    it('should clear hover state when mouse leaves', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const cards = screen.getAllByTestId('team-member-card');
      fireEvent.mouseEnter(cards[0]);
      fireEvent.mouseLeave(cards[0]);

      expect(cards[0]).not.toHaveClass('border-cyan-500/30');
    });

    it('should only highlight one card at a time', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const cards = screen.getAllByTestId('team-member-card');

      fireEvent.mouseEnter(cards[0]);
      expect(cards[0]).toHaveClass('border-cyan-500/30');
      expect(cards[1]).not.toHaveClass('border-cyan-500/30');

      fireEvent.mouseEnter(cards[1]);
      expect(cards[0]).not.toHaveClass('border-cyan-500/30');
      expect(cards[1]).toHaveClass('border-cyan-500/30');
    });
  });

  describe('with default members', () => {
    it('should use TEAM_MEMBERS_DATA constant when no membersData prop provided', () => {
      render(<TeamSection />);

      // Should render something (the default team)
      const section = document.getElementById('team');
      expect(section).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should handle empty members array gracefully', () => {
      render(<TeamSection membersData={[]} />);

      const section = document.getElementById('team');
      expect(section).toBeInTheDocument();

      const cards = screen.queryAllByTestId('team-member-card');
      expect(cards).toHaveLength(0);
    });
  });

  describe('accessibility', () => {
    it('should have semantic section element', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have heading hierarchy', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have gradient background', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const section = document.getElementById('team');
      expect(section).toHaveClass('bg-gradient-to-b');
    });

    it('should have decorative blur elements', () => {
      render(<TeamSection membersData={mockMembersData} />);

      const blurElements = document.querySelectorAll('.blur-3xl');
      expect(blurElements.length).toBeGreaterThan(0);
    });
  });
});