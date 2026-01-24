import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'View my work: e-commerce management, tool building, SEO growth, and freelance projects.',
};

const categories = [
  { key: 'employment', label: 'Current Employment' },
  { key: 'tool', label: 'Tool Building' },
  { key: 'personal', label: 'Personal Brands' },
  { key: 'freelance', label: 'Freelance Work' },
] as const;

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900">Portfolio</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        A selection of my work across e-commerce, SEO, tool building, and design.
        Each project includes the challenge, solution, and results.
      </p>

      {categories.map((category) => {
        const categoryProjects = projects.filter((p) => p.category === category.key);
        if (categoryProjects.length === 0) return null;

        return (
          <section key={category.key} className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {category.label}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categoryProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  description={project.description}
                  metric={project.metrics?.[0] ? `${project.metrics[0].label}: ${project.metrics[0].value}` : undefined}
                  tags={project.tags}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
