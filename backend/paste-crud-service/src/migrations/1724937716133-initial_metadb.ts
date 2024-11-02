import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMetadb1724937716133 implements MigrationInterface {
    name = 'InitialMetadb1724937716133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pastedata" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP, CONSTRAINT "PK_e9b02ee0441ee0ae3e6e4a441d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pastedata"`);
    }

}
