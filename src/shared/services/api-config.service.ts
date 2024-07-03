import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { config } from 'dotenv';

config();
@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) { }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get postgresConfig() {
    return {
      type: 'postgres',
      host: this.configService.get('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USERNAME'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DATABASE'),
      autoLoadEntities: true,
      synchronize: false,
      maxQueryExecutionTime:
        this.configService.get<number>('DB_MAX_QUERY_TIME'),
      ssl:
        this.configService.get('DB_USE_SSL') === 'true'
          ? {
            ca: fs.readFileSync('ca-certificate.crt'),
          }
          : undefined,
    };
  }

  get authConfig() {
    return {
      accessTokenExpiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      refreshTokenExpiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
      accessTokenSecret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      refreshTokenSecret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    };
  }
}
