/**
 * Pure content utility functions for the HelloWereld site.
 * This module has NO imports from `astro:content` or any Astro internals
 * so it can be unit tested with Vitest outside Astro's build pipeline.
 */

// ---------------------------------------------------------------------------
// Local interfaces — mirror the Zod schemas in src/content.config.ts
// ---------------------------------------------------------------------------

export interface WritingPost {
	id: string;
	data: {
		title: string;
		description: string;
		date: Date;
		tags: string[];
		featured: boolean;
		externalUrl?: string;
	};
}

export interface ProjectEntry {
	id: string;
	data: {
		title: string;
		description: string;
		status: "active" | "completed" | "experiment";
		technologies: string[];
		github?: string;
		featured: boolean;
	};
}

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/**
 * Returns a new array of entries sorted by `data.date` descending (newest first).
 * Does NOT mutate the input array.
 */
export function sortByDateDescending<T extends { data: { date: Date } }>(
	entries: T[],
): T[] {
	return [...entries].sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);
}

/**
 * Returns the most recent `n` writing posts, sorted by date descending.
 */
export function getRecentPosts(posts: WritingPost[], n: number): WritingPost[] {
	return sortByDateDescending(posts).slice(0, n);
}

/**
 * Returns up to `n` featured projects, sorted by title ascending.
 * Only entries with `data.featured === true` are included.
 */
export function getFeaturedProjects(
	projects: ProjectEntry[],
	n: number,
): ProjectEntry[] {
	return projects
		.filter((p) => p.data.featured)
		.sort((a, b) => a.data.title.localeCompare(b.data.title))
		.slice(0, n);
}

/**
 * Resolves the link target for a writing post.
 * - When `externalUrl` is set → `{ href: externalUrl, isExternal: true }`
 * - Otherwise → `{ href: "/writing/${post.id}", isExternal: false }`
 */
export function resolvePostLink(post: WritingPost): {
	href: string;
	isExternal: boolean;
} {
	if (post.data.externalUrl) {
		return { href: post.data.externalUrl, isExternal: true };
	}
	return { href: `/writing/${post.id}`, isExternal: false };
}

/**
 * Sorts projects for the projects page:
 * 1. Featured entries first (featured === true before featured === false)
 * 2. Within each group, sorted by title ascending
 * Returns a NEW sorted array (does NOT mutate input).
 */
export function sortProjectsPage(projects: ProjectEntry[]): ProjectEntry[] {
	return [...projects].sort((a, b) => {
		// Featured descending: true (1) before false (0)
		const featuredDiff =
			Number(b.data.featured) - Number(a.data.featured);
		if (featuredDiff !== 0) return featuredDiff;
		// Title ascending within group
		return a.data.title.localeCompare(b.data.title);
	});
}
