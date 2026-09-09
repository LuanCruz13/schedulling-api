import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, OrganizationsModule],
})
export class AppModule {}
