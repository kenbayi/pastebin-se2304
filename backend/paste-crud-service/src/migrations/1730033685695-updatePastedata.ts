import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePastedata1730033685695 implements MigrationInterface {
    name = 'UpdatePastedata1730033685695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastedata" ADD "isExpired" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pastedata" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastedata" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "pastedata" DROP COLUMN "isExpired"`);
    }

}
