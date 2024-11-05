import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateHashdb1725209386811 implements MigrationInterface {
    name = 'UpdateHashdb1725209386811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hash" ADD "pasteId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hash" ADD CONSTRAINT "UQ_60f20049e298ca67b5a0a8ccb02" UNIQUE ("pasteId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hash" DROP CONSTRAINT "UQ_60f20049e298ca67b5a0a8ccb02"`);
        await queryRunner.query(`ALTER TABLE "hash" DROP COLUMN "pasteId"`);
    }

}
