CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
INSERT INTO "users" ("username", "name")
SELECT 'course-user', 'Course User'
WHERE NOT EXISTS (
  SELECT 1 FROM "users" WHERE "username" = 'course-user'
);--> statement-breakpoint
UPDATE "blogs"
SET "user_id" = (
  SELECT "id" FROM "users" WHERE "username" = 'course-user' LIMIT 1
)
WHERE "user_id" IS NULL;
