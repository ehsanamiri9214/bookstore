import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { execSync } from 'child_process';

@Injectable()
export class DbService {
  constructor(private readonly configService: ConfigService) {}

  @Cron('0 0 0 * * *')
  async backup() {
    const dbName = this.configService.get('DATABASE_NAME');
    const dbUsername = this.configService.get('DATABASE_USERNAME');
    const dbPassword = this.configService.get('DATABASE_PASSWORD');
    const command = `docker exec db /usr/bin/mysqldump -u ${dbUsername} --password=${dbPassword} ${dbName} > ../backup/${dbName}_db_backup_${Date.now()}.sql`;
    execSync(command);
  }
}
