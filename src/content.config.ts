import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/writing",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		externalUrl: z.string().url().optional(),
		// Topic groups posts into a knowledge category (e.g. "MongoDB", "MySQL")
		topic: z.string().optional(),
		// Order controls sequence within a topic — lower = earlier
		order: z.number().default(999),
	}),
});

const projects = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/projects",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		status: z
			.enum(["active", "completed", "experiment"])
			.default("active"),
		technologies: z.array(z.string()).default([]),
		github: z.string().url().optional(),
		featured: z.boolean().default(false),
	}),
});

const talks = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/talks",
	}),
	schema: z.object({
		title: z.string(),
		event: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		videoUrl: z.string().url().optional(),
		slidesUrl: z.string().url().optional(),
		featured: z.boolean().default(false),
	}),
});

const books = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/books",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		year: z.number(),
		isbn: z.string().optional(),
		url: z.string().url().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = {
	writing,
	projects,
	talks,
	books,
};
