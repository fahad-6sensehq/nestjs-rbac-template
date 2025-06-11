import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from 'app.config';
import { AppModule } from './app.module';

async function bootstrap() {
    try {
        const loggerMap: Record<string, LogLevel[]> = {
            beta: ['log', 'error', 'warn', 'debug', 'verbose'],
            prod: ['log', 'error', 'warn'],
        };

        const logger = loggerMap[appConfig.serverType];

        const app = await NestFactory.create(AppModule, { cors: true, logger });

        const cookieParser = require('cookie-parser').default || require('cookie-parser');
        const compression = require('compression').default || require('compression');

        app.useGlobalPipes(new ValidationPipe());
        app.use(cookieParser());
        app.use(compression());
        app.enableCors();

        const config = new DocumentBuilder().setTitle('RBAC').setVersion('1.0').build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('xyz', app, document);

        const port = appConfig.port;
        await app.listen(port);

        console.log(`
    ================================
    🚀 Application Configuration 🚀
    ================================
          PORT         : ${port}
          Server Type  : ${appConfig.serverType}
    ================================
    `);
    } catch (error) {
        console.error(`❌ Application startup aborted due to ${error?.message}`);
        process.exit(1);
    }
}

bootstrap();
