import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateMobileCatalogTable1606997733834 implements MigrationInterface {
    name = 'GenerateMobileCatalogTable1606997733834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mobile_catalog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5605ce827f444c90c330e2d2afc" UNIQUE ("name"), CONSTRAINT "PK_0af9fa1b713d8fa32bb33508c50" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mobile_catalog"`);
    }

}
