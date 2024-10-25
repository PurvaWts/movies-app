import { Global, Module, InternalServerErrorException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        try {
          return {
            uri: configService.get<string>('DBURI'),
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
          };
        } catch (error) {
          console.log('-----------------', error);
          throw new InternalServerErrorException(error);
        }
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
