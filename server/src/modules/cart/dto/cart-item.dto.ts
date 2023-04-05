import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CartItem {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
