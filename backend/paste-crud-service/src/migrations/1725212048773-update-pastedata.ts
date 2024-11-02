import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePastedata1725212048773 implements MigrationInterface {
    name = 'UpdatePastedata1725212048773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastedata" ADD "author" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastedata" DROP COLUMN "author"`);
    }

}
