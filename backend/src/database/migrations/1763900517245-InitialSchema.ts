import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1763900517245 implements MigrationInterface {
    name = 'InitialSchema1763900517245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "categories_unique_name" ON "categories" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "categories_unique_slug" ON "categories" ("slug") `);
        await queryRunner.query(`CREATE TABLE "rules" ("id" SERIAL NOT NULL, "category_id" integer NOT NULL, "title" character varying(500) NOT NULL, "slug" character varying(500) NOT NULL, "url" character varying(100) NOT NULL, "content" text NOT NULL, "content_preview" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f39ee23773cd7c8c88d134149bc" UNIQUE ("url"), CONSTRAINT "PK_10fef696a7d61140361b1b23608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "rules_idx_category_id" ON "rules" ("category_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "rules_unique_url" ON "rules" ("url") `);
        await queryRunner.query(`CREATE TABLE "mcp_servers" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "slug" character varying(50) NOT NULL, "classification" character varying(100), "releaseDate" character varying(100), "provider" character varying(255), "githubRepo" character varying(100), "description" character varying(255), "url" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b6df42ab21f3b4461ca66896e93" UNIQUE ("slug"), CONSTRAINT "PK_c781b3dc7cb2a5d19460b71914d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "mcp_servers_unique_slug" ON "mcp_servers" ("slug") `);
        await queryRunner.query(`ALTER TABLE "rules" ADD CONSTRAINT "FK_82d72999266cf5aed89fc4614f3" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rules" DROP CONSTRAINT "FK_82d72999266cf5aed89fc4614f3"`);
        await queryRunner.query(`DROP INDEX "public"."mcp_servers_unique_slug"`);
        await queryRunner.query(`DROP TABLE "mcp_servers"`);
        await queryRunner.query(`DROP INDEX "public"."rules_unique_url"`);
        await queryRunner.query(`DROP INDEX "public"."rules_idx_category_id"`);
        await queryRunner.query(`DROP TABLE "rules"`);
        await queryRunner.query(`DROP INDEX "public"."categories_unique_slug"`);
        await queryRunner.query(`DROP INDEX "public"."categories_unique_name"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
