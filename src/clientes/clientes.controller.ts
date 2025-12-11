import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const idNum = Number(id);
    if (isNaN(idNum)) {
      throw new BadRequestException('ID inválido');
    }
    return this.clientesService.findOne(idNum);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }

  // 👇 Endpoint de login con rol incluido
  @Post('login')
  async login(@Body() body: { nombre_usuario: string; contraseña: string }) {
    const cliente = await this.clientesService.findByNombreUsuario(
      body.nombre_usuario,
    );
    if (!cliente || cliente.contraseña !== body.contraseña) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    return {
      mensaje: 'Login exitoso',
      cliente: {
        id: cliente.id,
        nombre_usuario: cliente.nombre_usuario,
        email: cliente.email,
        rol: cliente.rol,
      },
    };
  }

  // 👇 Endpoint protegido solo para admin (modo test sin JWT)
  @UseGuards(AdminGuard)
  @Post('usuarios') // usamos POST para poder enviar rol en el body
  findAllUsuarios(@Body() body: any) {
    return this.clientesService.findAll();
  }
}
