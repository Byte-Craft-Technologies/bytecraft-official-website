import { render, screen, fireEvent } from '@testing-library/react';
import { TeamMemberCard } from '@/app/components/team/TeamMemberCard';
import type { TeamMember } from '@/types';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: { src: string; alt: string; fill?: boolean }) => (
    <img src={src} alt={alt} data-fill={fill ? 'true' : undefined} {...props} />
  ),
}));

describe('TeamMemberCard', () => {
  const mockMember: TeamMember = {
    id: 'test-1',
    name: 'John Doe',
    role: 'Lead Developer',
    image: '/team/john.jpg',
    bio: 'Expert en développement web moderne.',
    skills: ['React', 'TypeScript', 'Node.js'],
    social: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  };

  describe('rendering', () => {
    it('should render member name', () => {
      render(<TeamMemberCard member={mockMember} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render member role', () => {
      render(<TeamMemberCard member={mockMember} />);

      expect(screen.getByText('Lead Developer')).toBeInTheDocument();
    });

    it('should render member bio', () => {
      render(<TeamMemberCard member={mockMember} />);

      expect(screen.getByText('Expert en développement web moderne.')).toBeInTheDocument();
    });

    it('should render member image with correct alt text', () => {
      render(<TeamMemberCard member={mockMember} />);

      const image = screen.getByAltText('John Doe');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/team/john.jpg');
    });

    it('should render all skills', () => {
      render(<TeamMemberCard member={mockMember} />);

      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });
  });

  describe('social links', () => {
    it('should render linkedin link when provided', () => {
      render(<TeamMemberCard member={mockMember} />);

      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    });

    it('should render github link when provided', () => {
      render(<TeamMemberCard member={mockMember} />);

      const githubLink = screen.getByRole('link', { name: /github/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
    });

    it('should not render twitter link when not provided', () => {
      render(<TeamMemberCard member={mockMember} />);

      expect(screen.queryByRole('link', { name: /twitter/i })).not.toBeInTheDocument();
    });

    it('should render twitter link when provided', () => {
      const memberWithTwitter: TeamMember = {
        ...mockMember,
        social: {
          ...mockMember.social,
          twitter: 'https://twitter.com/johndoe',
        },
      };

      render(<TeamMemberCard member={memberWithTwitter} />);

      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/johndoe');
    });

    it('should open social links in new tab', () => {
      render(<TeamMemberCard member={mockMember} />);

      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('hover interactions', () => {
    it('should call onHover when mouse enters', () => {
      const onHover = jest.fn();
      render(<TeamMemberCard member={mockMember} onHover={onHover} />);

      const card = screen.getByTestId('team-member-card');
      fireEvent.mouseEnter(card);

      expect(onHover).toHaveBeenCalledTimes(1);
    });

    it('should call onLeave when mouse leaves', () => {
      const onLeave = jest.fn();
      render(<TeamMemberCard member={mockMember} onLeave={onLeave} />);

      const card = screen.getByTestId('team-member-card');
      fireEvent.mouseLeave(card);

      expect(onLeave).toHaveBeenCalledTimes(1);
    });

    it('should apply hover styles when isHovered is true', () => {
      render(<TeamMemberCard member={mockMember} isHovered={true} />);

      const card = screen.getByTestId('team-member-card');
      expect(card).toHaveClass('border-cyan-500/30');
    });

    it('should not apply hover styles when isHovered is false', () => {
      render(<TeamMemberCard member={mockMember} isHovered={false} />);

      const card = screen.getByTestId('team-member-card');
      expect(card).not.toHaveClass('border-cyan-500/30');
    });
  });

  describe('edge cases', () => {
    it('should render with no social links', () => {
      const memberNoSocial: TeamMember = {
        ...mockMember,
        social: {},
      };

      render(<TeamMemberCard member={memberNoSocial} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render with empty skills array', () => {
      const memberNoSkills: TeamMember = {
        ...mockMember,
        skills: [],
      };

      render(<TeamMemberCard member={memberNoSkills} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render with long bio text', () => {
      const memberLongBio: TeamMember = {
        ...mockMember,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      };

      render(<TeamMemberCard member={memberLongBio} />);

      expect(screen.getByText(memberLongBio.bio)).toBeInTheDocument();
    });
  });
});