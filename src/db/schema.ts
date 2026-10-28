import { boolean, index, integer, json, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

// Same tables and columns as the former Symfony backend, so existing data can be imported as is.
// "*En" columns hold the English version; when empty, the French text is shown.

const id = () => integer("id").primaryKey().generatedByDefaultAsIdentity();
const position = () => integer("position").notNull().default(0);

export const siteSettings = pgTable("site_settings", {
  id: id(),
  contactEmail: varchar("contact_email", { length: 180 }).notNull(),
  roles: json("roles").$type<string[]>().notNull(),
  rolesEn: json("roles_en").$type<string[]>(),
});

export const stats = pgTable("stat", {
  id: id(),
  value: varchar("value", { length: 30 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  labelEn: varchar("label_en", { length: 100 }),
  position: position(),
});

export const technologies = pgTable("technology", {
  id: id(),
  name: varchar("name", { length: 60 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  position: position(),
});

export const expertise = pgTable("expertise", {
  id: id(),
  title: varchar("title", { length: 100 }).notNull(),
  titleEn: varchar("title_en", { length: 100 }),
  text: text("text").notNull(),
  textEn: text("text_en"),
  tags: json("tags").$type<string[]>().notNull(),
  icon: varchar("icon", { length: 10 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  position: position(),
});

export const projects = pgTable("project", {
  id: id(),
  title: varchar("title", { length: 150 }).notNull(),
  titleEn: varchar("title_en", { length: 150 }),
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  category: varchar("category", { length: 20 }).notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  glow: varchar("glow", { length: 20 }).notNull(),
  demoUrl: varchar("demo_url", { length: 255 }).notNull().default("#"),
  sourceUrl: varchar("source_url", { length: 255 }).notNull().default("#"),
  visible: boolean("visible").notNull().default(true),
  position: position(),
});

export const pipelineSteps = pgTable("pipeline_step", {
  id: id(),
  number: varchar("number", { length: 5 }).notNull(),
  title: varchar("title", { length: 60 }).notNull(),
  titleEn: varchar("title_en", { length: 60 }),
  text: varchar("text", { length: 255 }).notNull(),
  textEn: varchar("text_en", { length: 255 }),
  color: varchar("color", { length: 7 }).notNull(),
  position: position(),
});

export const timelineEntries = pgTable("timeline_entry", {
  id: id(),
  period: varchar("period", { length: 60 }).notNull(),
  periodEn: varchar("period_en", { length: 60 }),
  title: varchar("title", { length: 150 }).notNull(),
  titleEn: varchar("title_en", { length: 150 }),
  text: text("text").notNull(),
  textEn: text("text_en"),
  position: position(),
});

export const socialLinks = pgTable("social_link", {
  id: id(),
  label: varchar("label", { length: 50 }).notNull(),
  href: varchar("href", { length: 255 }).notNull(),
  position: position(),
});

export const contactMessages = pgTable(
  "contact_message",
  {
    id: id(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 180 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { precision: 0 }).notNull().defaultNow(),
    isRead: boolean("is_read").notNull().default(false),
    // SHA-256 of the sender IP, only used to limit the number of messages per hour
    ipHash: varchar("ip_hash", { length: 64 }),
  },
  (t) => [index("contact_message_ip_hash_created_at_idx").on(t.ipHash, t.createdAt)],
);

export const users = pgTable(
  "user",
  {
    id: id(),
    email: varchar("email", { length: 180 }).notNull(),
    roles: json("roles").$type<string[]>().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
  },
  (t) => [uniqueIndex("UNIQ_8D93D649E7927C74").on(t.email)],
);
