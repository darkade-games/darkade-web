import { pgTable, serial, integer, text, pgEnum, timestamp, primaryKey, index } from 'drizzle-orm/pg-core';

export const accessibilityRating = pgEnum('accessibility_rating', [
  'fully_accessible',
  'mostly_accessible',
  'playable',
  'partially_accessible',
  'work_in_progress',
  'unknown'
])

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  accessibilityRating: accessibilityRating('accessibility_rating').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date())
});

export const platforms = pgTable('platforms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date())
});

export const gamesToPlatforms = pgTable('games_to_platforms', {
  gameId: integer('game_id').notNull().references(() => games.id, { onDelete: "cascade" }),
  platformId: integer('platform_id').notNull().references(() => platforms.id, { onDelete: "cascade" }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  primaryKey({
    columns: [table.gameId, table.platformId]
  }),
  index('games_to_platforms_game_id_idx').on(table.gameId),
  index('games_to_platforms_platform_id_idx').on(table.platformId)
])

export const modStatus = pgEnum('mod_status', [
  'required',
  'recommended'
])

export const mods = pgTable('mods', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  website: text('website').notNull(),
  gameId: integer('game_id').references(() => games.id, { onDelete: 'cascade' }).notNull(),
  status: modStatus('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date())
}, (table) => [
  index('mod_game_idx').on(table.gameId)
])
