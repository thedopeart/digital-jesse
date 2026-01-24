import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/lib/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[currentIndex + 1] || projects[0];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/portfolio"
          className="text-gray-500 hover:text-gray-700 text-sm mb-4 inline-block"
        >
          ← Back to Portfolio
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">{project.title}</h1>
        <p className="mt-4 text-xl text-gray-600">{project.description}</p>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Visit site →
          </a>
        )}

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-gray-500 text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{project.content.overview}</p>
      </section>

      {/* Challenge */}
      {project.content.challenge && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
          <p className="text-gray-600 leading-relaxed">{project.content.challenge}</p>
        </section>
      )}

      {/* Solution */}
      {project.content.solution && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
          <p className="text-gray-600 leading-relaxed">{project.content.solution}</p>
        </section>
      )}

      {/* Results */}
      {project.content.results && project.content.results.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
          <ul className="space-y-3">
            {project.content.results.map((result, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">✓</span>
                <span className="text-gray-600">{result}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tools */}
      {project.content.tools && project.content.tools.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.content.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Next Project */}
      <section className="mt-16 pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm mb-2">Next Project</p>
        <Link
          href={`/portfolio/${nextProject.slug}`}
          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {nextProject.title} →
        </Link>
      </section>
    </div>
  );
}
