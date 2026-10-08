import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
	sortByDateDescending,
	getRecentPosts,
	getFeaturedProjects,
	resolvePostLink,
	sortProjectsPage,
	type WritingPost,
	type ProjectEntry,
} from "./content";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makePost(
	id: string,
	date: Date,
	overrides: Partial<WritingPost["data"]> = {},
): WritingPost {
	return {
		id,
		data: {
			title: `Post ${id}`,
			description: `Description for ${id}`,
			date,
			tags: [],
			featured: false,
			...overrides,
		},
	};
}

function makeProject(
	id: string,
	title: string,
	featured: boolean,
	overrides: Partial<ProjectEntry["data"]> = {},
): ProjectEntry {
	return {
		id,
		data: {
			title,
			description: `Description for ${id}`,
			status: "active",
			technologies: [],
			featured,
			...overrides,
		},
	};
}

// ---------------------------------------------------------------------------
// sortByDateDescending
// ---------------------------------------------------------------------------

describe("sortByDateDescending", () => {
	it("sorts a shuffled array into date-descending order", () => {
		const d1 = new Date("2024-01-01");
		const d2 = new Date("2023-06-15");
		const d3 = new Date("2025-03-10");

		const entries = [makePost("a", d1), makePost("b", d2), makePost("c", d3)];
		const sorted = sortByDateDescending(entries);

		expect(sorted[0].data.date).toEqual(d3);
		expect(sorted[1].data.date).toEqual(d1);
		expect(sorted[2].data.date).toEqual(d2);
	});

	it("returns a single-element array unchanged", () => {
		const d = new Date("2024-05-20");
		const entries = [makePost("only", d)];
		const sorted = sortByDateDescending(entries);

		expect(sorted).toHaveLength(1);
		expect(sorted[0].data.date).toEqual(d);
	});

	it("returns an empty array for empty input", () => {
		expect(sortByDateDescending([])).toEqual([]);
	});

	it("does not mutate the original array", () => {
		const d1 = new Date("2022-01-01");
		const d2 = new Date("2024-01-01");
		const original = [makePost("a", d1), makePost("b", d2)];
		const copy = [...original];

		sortByDateDescending(original);

		expect(original[0].id).toBe(copy[0].id);
		expect(original[1].id).toBe(copy[1].id);
	});
});

// ---------------------------------------------------------------------------
// getRecentPosts
// ---------------------------------------------------------------------------

describe("getRecentPosts", () => {
	const posts: WritingPost[] = [
		makePost("a", new Date("2024-01-01")),
		makePost("b", new Date("2023-06-15")),
		makePost("c", new Date("2025-03-10")),
		makePost("d", new Date("2022-12-31")),
	];

	it("returns at most n posts", () => {
		const result = getRecentPosts(posts, 2);
		expect(result).toHaveLength(2);
	});

	it("returned posts are sorted date-descending", () => {
		const result = getRecentPosts(posts, 3);
		for (let i = 0; i < result.length - 1; i++) {
			expect(result[i].data.date.valueOf()).toBeGreaterThanOrEqual(
				result[i + 1].data.date.valueOf(),
			);
		}
	});

	it("returns the most recent posts when n < collection size", () => {
		const result = getRecentPosts(posts, 1);
		expect(result[0].data.date).toEqual(new Date("2025-03-10"));
	});

	it("works when collection has fewer than n posts", () => {
		const few = [makePost("x", new Date("2024-07-04"))];
		const result = getRecentPosts(few, 10);
		expect(result).toHaveLength(1);
	});

	it("returns empty array for empty input", () => {
		expect(getRecentPosts([], 3)).toEqual([]);
	});
});

// ---------------------------------------------------------------------------
// getFeaturedProjects
// ---------------------------------------------------------------------------

describe("getFeaturedProjects", () => {
	const projects: ProjectEntry[] = [
		makeProject("1", "Zebra", true),
		makeProject("2", "Alpha", false),
		makeProject("3", "Mango", true),
		makeProject("4", "Berry", true),
		makeProject("5", "Cherry", true),
	];

	it("returns only featured entries", () => {
		const result = getFeaturedProjects(projects, 10);
		expect(result.every((p) => p.data.featured)).toBe(true);
	});

	it("results are sorted by title ascending", () => {
		const result = getFeaturedProjects(projects, 10);
		for (let i = 0; i < result.length - 1; i++) {
			expect(
				result[i].data.title.localeCompare(result[i + 1].data.title),
			).toBeLessThanOrEqual(0);
		}
	});

	it("results are capped at n", () => {
		const result = getFeaturedProjects(projects, 2);
		expect(result).toHaveLength(2);
	});

	it("returns the n alphabetically-first featured projects when there are more than n", () => {
		const result = getFeaturedProjects(projects, 2);
		// Featured titles sorted: Berry, Cherry, Mango, Zebra — top 2 are Berry, Cherry
		expect(result[0].data.title).toBe("Berry");
		expect(result[1].data.title).toBe("Cherry");
	});

	it("returns empty array when no featured projects exist", () => {
		const none = [makeProject("a", "Alpha", false), makeProject("b", "Beta", false)];
		expect(getFeaturedProjects(none, 3)).toEqual([]);
	});
});

// ---------------------------------------------------------------------------
// resolvePostLink
// ---------------------------------------------------------------------------

describe("resolvePostLink", () => {
	it("returns external href and isExternal: true when externalUrl is set", () => {
		const post = makePost("my-post", new Date(), {
			externalUrl: "https://example.com/article",
		});
		const result = resolvePostLink(post);
		expect(result.href).toBe("https://example.com/article");
		expect(result.isExternal).toBe(true);
	});

	it("returns internal path and isExternal: false when externalUrl is not set", () => {
		const post = makePost("test-id", new Date());
		const result = resolvePostLink(post);
		expect(result.href).toBe("/writing/test-id");
		expect(result.isExternal).toBe(false);
	});

	it("uses the post id in the internal path", () => {
		const post = makePost("my-slug-2024", new Date());
		expect(resolvePostLink(post).href).toBe("/writing/my-slug-2024");
	});
});

// ---------------------------------------------------------------------------
// sortProjectsPage
// ---------------------------------------------------------------------------

describe("sortProjectsPage", () => {
	it("all featured: true items precede featured: false items", () => {
		const projects: ProjectEntry[] = [
			makeProject("1", "Zebra", false),
			makeProject("2", "Alpha", true),
			makeProject("3", "Mango", false),
			makeProject("4", "Berry", true),
		];
		const sorted = sortProjectsPage(projects);

		const firstNonFeaturedIndex = sorted.findIndex((p) => !p.data.featured);
		const lastFeaturedIndex = sorted.map((p) => p.data.featured).lastIndexOf(true);

		// All featured entries must end before non-featured ones start
		expect(lastFeaturedIndex).toBeLessThan(firstNonFeaturedIndex);
	});

	it("within featured group, items are sorted by title ascending", () => {
		const projects: ProjectEntry[] = [
			makeProject("1", "Zebra", true),
			makeProject("2", "Alpha", true),
			makeProject("3", "Mango", true),
		];
		const sorted = sortProjectsPage(projects);

		expect(sorted[0].data.title).toBe("Alpha");
		expect(sorted[1].data.title).toBe("Mango");
		expect(sorted[2].data.title).toBe("Zebra");
	});

	it("within non-featured group, items are sorted by title ascending", () => {
		const projects: ProjectEntry[] = [
			makeProject("1", "Zebra", false),
			makeProject("2", "Alpha", false),
			makeProject("3", "Mango", false),
		];
		const sorted = sortProjectsPage(projects);

		expect(sorted[0].data.title).toBe("Alpha");
		expect(sorted[1].data.title).toBe("Mango");
		expect(sorted[2].data.title).toBe("Zebra");
	});

	it("correctly interleaves featured-first, title-ascending in mixed input", () => {
		const projects: ProjectEntry[] = [
			makeProject("1", "Zebra", false),
			makeProject("2", "Alpha", true),
			makeProject("3", "Mango", false),
			makeProject("4", "Berry", true),
		];
		const sorted = sortProjectsPage(projects);

		expect(sorted[0].data.title).toBe("Alpha");
		expect(sorted[0].data.featured).toBe(true);
		expect(sorted[1].data.title).toBe("Berry");
		expect(sorted[1].data.featured).toBe(true);
		expect(sorted[2].data.title).toBe("Mango");
		expect(sorted[2].data.featured).toBe(false);
		expect(sorted[3].data.title).toBe("Zebra");
		expect(sorted[3].data.featured).toBe(false);
	});

	it("does not mutate the original array", () => {
		const projects: ProjectEntry[] = [
			makeProject("1", "Zebra", false),
			makeProject("2", "Alpha", true),
		];
		const originalFirst = projects[0].id;

		sortProjectsPage(projects);

		expect(projects[0].id).toBe(originalFirst);
	});

	it("handles an empty array", () => {
		expect(sortProjectsPage([])).toEqual([]);
	});
});

// ---------------------------------------------------------------------------
// Property-based tests
// ---------------------------------------------------------------------------

// Feature: hellowereld-personal-site, Property 5: projects page compound sort preserves featured-first then title order
// Validates: Requirements 9.2
describe("sortProjectsPage — property 5: featured-first then title ascending", () => {
	it("holds for any array of project-shaped objects", () => {
		fc.assert(
			fc.property(
				fc.array(
					fc.record({ data: fc.record({ featured: fc.boolean(), title: fc.string() }) }),
				),
				(projects) => {
					const result = sortProjectsPage(projects as any);
					// All featured:true items must come before featured:false items
					let seenFalse = false;
					for (const p of result) {
						if (!p.data.featured) seenFalse = true;
						if (seenFalse) expect(p.data.featured).toBe(false);
					}
					// Within each group, titles must be ascending
					const featuredItems = result.filter((p) => p.data.featured);
					const nonFeaturedItems = result.filter((p) => !p.data.featured);
					for (const group of [featuredItems, nonFeaturedItems]) {
						for (let i = 0; i < group.length - 1; i++) {
							expect(
								group[i].data.title.localeCompare(group[i + 1].data.title),
							).toBeLessThanOrEqual(0);
						}
					}
				},
			),
			{ numRuns: 100 },
		);
	});
});

// ---------------------------------------------------------------------------
// Property-based tests
// ---------------------------------------------------------------------------

// Feature: hellowereld-personal-site, Property 4: homepage featured project filter and sort
// Validates: Requirements 4.6
it("Property 4: getFeaturedProjects only returns featured entries, sorted by title asc, capped at 3", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.record({ data: fc.record({ featured: fc.boolean(), title: fc.string() }) }),
			),
			(projects) => {
				const result = getFeaturedProjects(projects as any, 3);
				// All results must be featured
				expect(result.every((p) => p.data.featured)).toBe(true);
				// At most 3 results
				expect(result.length).toBeLessThanOrEqual(3);
				// Sorted by title ascending
				for (let i = 0; i < result.length - 1; i++) {
					expect(
						result[i].data.title.localeCompare(result[i + 1].data.title),
					).toBeLessThanOrEqual(0);
				}
			},
		),
		{ numRuns: 100 },
	);
});

// ---------------------------------------------------------------------------
// Property-Based Tests
// ---------------------------------------------------------------------------

// Feature: hellowereld-personal-site, Property 1: date sort is always descending
// Validates: Requirements 4.1, 6.2, 10.2
// Uses fc.integer() timestamps (ms since epoch) to build valid Date objects,
// matching z.coerce.date() in the content schema which always produces valid dates.
// fc.date() with min/max bounds can still produce NaN dates during shrinking,
// so integer-based construction is used instead.
describe("sortByDateDescending — property: result is always date-descending", () => {
	it("holds for any non-empty array of entries with a date field", () => {
		// Build valid dates from integer timestamps to avoid fc.date() NaN shrinking artifacts
		const validDate = fc
			.integer({ min: 0, max: 4_102_444_800_000 }) // 1970 – 2100
			.map((ms) => new Date(ms));

		fc.assert(
			fc.property(
				fc.array(fc.record({ data: fc.record({ date: validDate }) }), {
					minLength: 1,
				}),
				(entries) => {
					const sorted = sortByDateDescending(entries);
					for (let i = 0; i < sorted.length - 1; i++) {
						expect(sorted[i].data.date.valueOf()).toBeGreaterThanOrEqual(
							sorted[i + 1].data.date.valueOf(),
						);
					}
				},
			),
			{ numRuns: 100 },
		);
	});
});

// Feature: hellowereld-personal-site, Property 3: link target resolution follows externalUrl presence
// Validates: Requirements 4.3, 4.4, 6.4, 6.5
describe("resolvePostLink — property 3: link target follows externalUrl presence", () => {
	it("holds for any Writing_Post shaped object with optional externalUrl", () => {
		fc.assert(
			fc.property(
				fc.record({
					id: fc.string({ minLength: 1 }),
					data: fc.record({
						externalUrl: fc.option(fc.webUrl(), { nil: undefined }),
					}),
				}),
				(post) => {
					const { href, isExternal } = resolvePostLink(post as any);
					if (post.data.externalUrl) {
						expect(href).toBe(post.data.externalUrl);
						expect(isExternal).toBe(true);
					} else {
						expect(href).toBe(`/writing/${post.id}`);
						expect(isExternal).toBe(false);
					}
				},
			),
			{ numRuns: 100 },
		);
	});
});
