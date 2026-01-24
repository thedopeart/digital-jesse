import Link from 'next/link';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  metric?: string;
  tags?: string[];
}

export default function ProjectCard({
  slug,
  title,
  description,
  metric,
  tags,
}: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="mt-2 text-gray-600 text-sm flex-1">
          {description}
        </p>

        {metric && (
          <p className="mt-4 text-blue-600 font-medium text-sm">
            {metric}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
