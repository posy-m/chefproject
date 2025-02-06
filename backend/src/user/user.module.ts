import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from 'src/models/resume.entity';
import { SavedAnnouncement } from 'src/models/savedAnnouncement.entity';
import { SupportDetails } from 'src/models/supportDetails.entity';
import { Users } from 'src/models/userDB.entity';

@Module({
  imports: [SequelizeModule.forFeature([Resume, SupportDetails, SavedAnnouncement, Users])],
  providers: [Resume, SupportDetails, SavedAnnouncement],
})
export class UserModule { }
