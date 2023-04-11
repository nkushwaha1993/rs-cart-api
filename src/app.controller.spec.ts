import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AuthService} from "./auth/index";
import {UsersService} from "./users/index";
import {JwtService} from "@nestjs/jwt";
import {JWT_MODULE_OPTIONS} from "@nestjs/jwt/dist/jwt.constants";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], providers: [
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
          }

        },
        {
          provide: UsersService,
          useValue: {
            getUserByUsernameAsync: jest.fn(),
          }
        }
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBeTruthy();
    });
  });
});