import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalHashdb1725200003903 implements MigrationInterface {
    name="InitalHashdb1725200003903";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hash" ("id" SERIAL NOT NULL,"hash" TEXT NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_52e086647be843feb88911976c8" PRIMARY KEY ("id"),CONSTRAINT "UQ_c0ac93094e68bc48a4f8e9d847b" UNIQUE ("hash"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hash"`);
    }

}
