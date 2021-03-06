import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

/**
 * Review Author Model
 *
 * Describes publicly visible details about the comment author.
 */
export class ReviewAuthor {
  /**
   * User ID
   *
   * Excluded from the serialized object.
   */
  @Exclude()
  public id: string;

  /**
   * Author name
   */
  @ApiModelProperty({
    description: 'Author name',
  })
  public name: string;

  /**
   * Constructor
   */
  constructor({ id, name }: Partial<ReviewAuthor>) {
    Object.assign(this, { id, name });
  }
}
