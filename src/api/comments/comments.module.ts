import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { DbModule } from 'src/data/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CommentsController],
  providers: [CommentsService,  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class CommentsModule {}
