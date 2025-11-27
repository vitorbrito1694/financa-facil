import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionGroup } from './transaction-group.entity';
import { CreateTransactionGroupDto } from './dto/create-transaction-group.dto';
import { UpdateTransactionGroupDto } from './dto/update-transaction-group.dto';

@Injectable()
export class TransactionGroupService {
  constructor(
    @InjectRepository(TransactionGroup)
    private readonly transactionGroupRepository: Repository<TransactionGroup>,
  ) {}

  async create(
    userId: string,
    createTransactionGroupDto: CreateTransactionGroupDto,
  ): Promise<TransactionGroup> {
    const transactionGroup = this.transactionGroupRepository.create({
      ...createTransactionGroupDto,
      userId,
    });
    return this.transactionGroupRepository.save(transactionGroup);
  }

  async findAll(userId: string): Promise<TransactionGroup[]> {
    return this.transactionGroupRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<TransactionGroup> {
    const transactionGroup = await this.transactionGroupRepository.findOne({
      where: { id, userId },
    });

    if (!transactionGroup) {
      throw new NotFoundException(`Transaction Group with ID ${id} not found`);
    }

    return transactionGroup;
  }

  async update(
    id: string,
    userId: string,
    updateTransactionGroupDto: UpdateTransactionGroupDto,
  ): Promise<TransactionGroup> {
    const transactionGroup = await this.findOne(id, userId);

    Object.assign(transactionGroup, updateTransactionGroupDto);

    return this.transactionGroupRepository.save(transactionGroup);
  }

  async remove(id: string, userId: string): Promise<void> {
    const transactionGroup = await this.findOne(id, userId);
    await this.transactionGroupRepository.remove(transactionGroup);
  }
}
