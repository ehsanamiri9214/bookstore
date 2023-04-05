import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KavenegarApi } from 'kavenegar';
import { IAuthConfig } from 'src/interfaces';

@Injectable()
export class SmsService {
  constructor(private readonly configService: ConfigService) {}

  send(
    phone: string,
    message: string,
  ): Promise<{ response: object; status: object }> {
    const authConfig = this.configService.get<IAuthConfig>('AUTH');
    const api = KavenegarApi({ apikey: authConfig.KAVENEGAR_API_KEY });

    return new Promise((resolve, reject) => {
      try {
        api.Send(
          {
            sender: '2000500666',
            receptor: phone,
            message,
          },
          function (response, status) {
            resolve({ response, status });
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
