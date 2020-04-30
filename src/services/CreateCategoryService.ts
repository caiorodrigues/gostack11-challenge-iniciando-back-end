import { getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  title: string;
}

class CreateCategoryService {
  public async execute({ id, title }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: {
        title,
      },
    });

    if (checkCategoryExists) {
      throw new AppError('Category is already used.');
    }

    const category = categoriesRepository.create({
      id,
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
