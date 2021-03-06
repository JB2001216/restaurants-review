import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { CryptoService } from 'common/crypto.service';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { IsEmailUnique } from './validator/is-email-unique.validator';

/**
 * User Module
 *
 * Responsible for access to user records.
 */
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, IsEmailUnique, CryptoService],
  imports: [
    // AuthService, needed for AuthGuard, depends on UserService,
    // which creates a circular dependency that we bypass here
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserRepository],
})
export class UserModule {}
