import { Env } from '@applifting-io/nestjs-decorated-config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private readonly configService: ConfigService) {}

  @Env('DB_HOST', { expose: true })
  readonly dbHost!: string;

  @Env('DB_PORT', { expose: true, defaultValue: 5432 })
  readonly dbPort!: number;

  @Env('DB_USERNAME', { expose: true })
  readonly dbUsername!: string;

  @Env('DB_PASSWORD')
  readonly dbPassword!: string;

  @Env('DB_DATABASE', { expose: true })
  readonly dbDatabase!: string;

  @Env('DB_SYNCHRONIZE', { expose: true })
  readonly dbSynchronize!: boolean;

  @Env('DB_LOGGING', { expose: true })
  readonly dbLogging!: boolean;

  @Env('GRAPHQL_PLAYGROUND', { expose: true })
  readonly graphqlPlayground!: boolean;

  @Env('JWT_SECRET')
  readonly jwtSecret!: string;

  @Env('AWS_REGION', { expose: true })
  readonly awsRegion!: string;

  @Env('AWS_S3_BUCKET', { expose: true })
  readonly awsS3Bucket!: string;

  @Env('COGNITO_USERPOOL_ID', { expose: true })
  readonly cognitoUserpoolId!: string;

  @Env('COGNITO_CLIENT_ID', { expose: true })
  readonly cognitoClientId!: string;
}
