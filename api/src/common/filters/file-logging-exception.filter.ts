import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch()
export class FileLoggingExceptionFilter implements ExceptionFilter {
  private readonly logDir: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
    } catch (err) {
      // ignore folder creation errors
    }
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception && (exception as Error).message) || 'Unknown error';
    const stack = exception instanceof Error ? exception.stack : undefined;

    const entry = {
      timestamp,
      path: request?.url,
      method: request?.method,
      status,
      message,
      stack,
    };

    try {
      const safeTimestamp = timestamp.replace(/[:.]/g, '-');
      const unique = Date.now();
      const filename = `error-${safeTimestamp}-${unique}.json`;
      const filePath = path.join(this.logDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(entry, null, 2) + '\n', {
        encoding: 'utf8',
      });
    } catch (err) {
      // fail silently - do not let logging errors break the app
    }

    if (response) {
      if (exception instanceof HttpException) {
        response.status(status).json(exception.getResponse());
      } else {
        response
          .status(status)
          .json({ statusCode: status, message: 'Internal server error' });
      }
    }
  }
}
