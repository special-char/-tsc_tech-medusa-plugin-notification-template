import { Migration } from '@mikro-orm/migrations';

export class Migration20250311112229 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "notification-template" ("id" text not null, "template" text not null, "subject" text not null, "event_name" text not null, "to" text not null, "cc" text not null, "bcc" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "notification-template_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_notification-template_deleted_at" ON "notification-template" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "notification-template" cascade;`);
  }

}
