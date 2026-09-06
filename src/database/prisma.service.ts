import 'dotenv/config'
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Busca a URL de conexão no ambiente
    const connectionString = process.env.DATABASE_URL;
    
    // Cria o gerenciador de conexões nativo do PostgreSQL
    const pool = new Pool({ connectionString });
    
    // Instancia o adaptador oficial do Prisma
    const adapter = new PrismaPg(pool);
    
    // Injeta o adaptador no construtor do PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}