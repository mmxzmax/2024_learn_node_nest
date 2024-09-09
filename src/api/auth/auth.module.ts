import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from 'src/data/db/db.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, DbModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
