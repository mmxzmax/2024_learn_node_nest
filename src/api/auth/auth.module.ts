import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { DbModule } from 'src/data/db/db.module';

@Module({
  imports: [UserModule, DbModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
