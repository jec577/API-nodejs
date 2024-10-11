import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1728597803716 implements MigrationInterface {
    name = 'Default1728597803716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "occupation" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
