ALTER TABLE "expertise" ADD COLUMN "title_en" varchar(100);--> statement-breakpoint
ALTER TABLE "expertise" ADD COLUMN "text_en" text;--> statement-breakpoint
ALTER TABLE "pipeline_step" ADD COLUMN "title_en" varchar(60);--> statement-breakpoint
ALTER TABLE "pipeline_step" ADD COLUMN "text_en" varchar(255);--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "title_en" varchar(150);--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "description_en" text;--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "roles_en" json;--> statement-breakpoint
ALTER TABLE "stat" ADD COLUMN "label_en" varchar(100);--> statement-breakpoint
ALTER TABLE "timeline_entry" ADD COLUMN "period_en" varchar(60);--> statement-breakpoint
ALTER TABLE "timeline_entry" ADD COLUMN "title_en" varchar(150);--> statement-breakpoint
ALTER TABLE "timeline_entry" ADD COLUMN "text_en" text;