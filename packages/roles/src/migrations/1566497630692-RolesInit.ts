import { MigrationInterface, QueryRunner } from 'typeorm'

export class RolesInit1566497630692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
          INSERT INTO role (name, permissions, role) VALUES
          ('Own','[{"profile": "create"}, {"profile": "read"}, {"profile": "update"}, {"profile": "delete"}]','user'),
          ('Any','[{"profile": "create"}, {"profile": "read"}, {"profile": "update"}, {"profile": "delete"}]','support');
    `)

    const [{ id }] = await queryRunner.query(`SELECT * FROM role`)
    await queryRunner.query(`UPDATE "user" SET "roleId" = ${id}`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`UPDATE "user" SET "roleId" = null`)
    await queryRunner.query(`DELETE FROM role;`)
  }
}
