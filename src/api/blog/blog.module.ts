import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { DbModule } from 'src/data/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BlogModule {}
