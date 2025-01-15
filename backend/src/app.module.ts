import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'dotenv';

config()

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3000,
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'chefproject',
    autoLoadModels: true,
    synchronize: true,
    sync: { force: false },
    models: []
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
