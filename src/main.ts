import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from 'app.config';
import { AppModule } from './app.module';

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule, {
            logger: ['log', 'error', 'warn'],
        });

        const cookieParser = require('cookie-parser').default || require('cookie-parser');
        const compression = require('compression').default || require('compression');

        app.useGlobalPipes(new ValidationPipe());
        app.use(cookieParser());
        app.use(compression());
        app.enableCors();

        const config = new DocumentBuilder().setTitle('RBAC').setVersion('1.0').build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('xyz', app, document);

        const port = 9000;
        await app.listen(port);

        // await checkServiceConnection(AppConfig.redisHost, AppConfig.redisPort, 'Redis');

        console.log(`
    ================================
    🚀 Application Configuration 🚀
    ================================
          PORT         : ${port}
          ENVIRONMENT  : ${AppConfig.environment}
    ================================
    `);
    } catch (error) {
        console.error(`❌ Application startup aborted due to ${error?.message}`);
        process.exit(1);
    }
}

bootstrap();
