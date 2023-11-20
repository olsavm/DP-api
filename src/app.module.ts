import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://michalolsav:fontanaprezuzanu@skialpp.zwllorf.mongodb.net/main?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    RecordModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
