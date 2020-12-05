import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRelationsBetweenTables1607127326063 implements MigrationInterface {
    name = 'FixRelationsBetweenTables1607127326063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_mobile" DROP CONSTRAINT "FK_437e0a21d50db5e2d0ab1af6196"`);
        await queryRunner.query(`COMMENT ON COLUMN "order_mobile"."orderId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "order_mobile" DROP CONSTRAINT "UQ_437e0a21d50db5e2d0ab1af6196"`);
        await queryRunner.query(`ALTER TABLE "order_mobile" ADD CONSTRAINT "FK_437e0a21d50db5e2d0ab1af6196" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_mobile" DROP CONSTRAINT "FK_437e0a21d50db5e2d0ab1af6196"`);
        await queryRunner.query(`ALTER TABLE "order_mobile" ADD CONSTRAINT "UQ_437e0a21d50db5e2d0ab1af6196" UNIQUE ("orderId")`);
        await queryRunner.query(`COMMENT ON COLUMN "order_mobile"."orderId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "order_mobile" ADD CONSTRAINT "FK_437e0a21d50db5e2d0ab1af6196" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
