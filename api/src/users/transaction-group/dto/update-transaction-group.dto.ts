import { PartialType } from '@nestjs/swagger';
import { CreateTransactionGroupDto } from './create-transaction-group.dto';

export class UpdateTransactionGroupDto extends PartialType(CreateTransactionGroupDto) {}
