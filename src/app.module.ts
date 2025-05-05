import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { MatchesController } from './modules/matches/matches.controller';
import { MatchesService } from './modules/matches/matches.service';
import { MatchesModule } from './modules/matches/matches.module';
import { PredictionsController } from './modules/predictions/predictions.controller';
import { PredictionsService } from './modules/predictions/predictions.service';
import { PredictionsModule } from './modules/predictions/predictions.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [AuthModule, UserModule, MatchesModule, PredictionsModule, WebsocketModule],
  controllers: [AppController, AuthController, UserController, MatchesController, PredictionsController],
  providers: [AppService, AuthService, UserService, MatchesService, PredictionsService],
})
export class AppModule {}
