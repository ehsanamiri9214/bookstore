import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { join } from 'path';
import { RoleEnum } from 'src/enums';
import { RoleService } from 'src/modules/auth/services/role/role.service';
import { BookService } from 'src/modules/book/book.service';
import { Book } from 'src/modules/book/entities/book.entity';
import { CategoryService } from 'src/modules/category/category.service';
import { Category } from 'src/modules/category/entities/category.entity';
import { CityService } from 'src/modules/city/city.service';
import { City } from 'src/modules/city/entities/city.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Publisher } from 'src/modules/publisher/entities/publisher.entity';
import { PublisherService } from 'src/modules/publisher/publisher.service';
import { State } from 'src/modules/state/entities/state.entity';
import { StateService } from 'src/modules/state/state.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { ExcelCategory, ExcelPublisher, ExcelSheet } from 'src/types';
import { copy, readCSV, readExcel } from 'src/utils';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly stateService: StateService,
    private readonly cityService: CityService,
    private readonly roleService: RoleService,
    private readonly publisherService: PublisherService,
    private readonly categoryService: CategoryService,
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAll(): Promise<void> {
    await this.seedStates();
    await this.seedCities();
    await this.seedPublishers();
    await this.seedCategories();
    await this.seedBooks();
    await this.seedRoles();
  }

  async seedStates(): Promise<void> {
    // await this.stateService.clear();
    const states = await this.stateService.count();

    if (!states) {
      try {
        const filePath = join(process.cwd(), 'files/Iran States & Cities.csv');

        const results: { State: string; City: string }[] = await readCSV(
          filePath,
        );

        const sortedResults: { stateName: string; cities: string[] }[] = [];
        results.forEach(({ State, City }) => {
          const alreadyAdded = sortedResults.find(
            (item) => item.stateName === State,
          );
          if (!alreadyAdded)
            sortedResults.push({ stateName: State, cities: [] });
          sortedResults.forEach((item) => {
            if (item.stateName === State) {
              item.cities.push(City);
            }
          });
        });

        const states = sortedResults.map((item) =>
          plainToInstance(State, { name: item.stateName }),
        );
        await this.stateService.bulkInsert(states);

        console.log('Seeding states: done.');
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async seedCities(): Promise<void> {
    // await this.cityService.clear();
    const cities = await this.cityService.count();

    if (!cities) {
      try {
        const filePath = join(process.cwd(), 'files/Iran States & Cities.csv');

        const results: { State: string; City: string }[] = await readCSV(
          filePath,
        );

        const sortedResults: { stateName: string; cities: string[] }[] = [];
        results.forEach(({ State, City }) => {
          const alreadyAdded = sortedResults.find(
            (item) => item.stateName === State,
          );
          if (!alreadyAdded)
            sortedResults.push({ stateName: State, cities: [] });
          sortedResults.forEach((item) => {
            if (item.stateName === State) {
              item.cities.push(City);
            }
          });
        });

        const stateEntities = await this.stateService.findMany(
          null,
          null,
          1000,
        );
        const cities = [];
        sortedResults.forEach((item) => {
          item.cities.forEach(async (city) => {
            cities.push(
              plainToInstance(City, {
                name: city,
                state: stateEntities.find((e) => e.name === item.stateName),
              }),
            );
          });
        });
        await this.cityService.bulkInsert(cities);

        console.log('Seeding cities: done.');
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async seedPublishers(): Promise<void> {
    // await this.publisherService.clear();
    const publishers = await this.publisherService.count();

    if (!publishers) {
      try {
        const filePath = join(process.cwd(), 'files/publishers.xlsx');

        const results: {
          sheet: string;
          items: ExcelPublisher[];
        }[] = (await readExcel(filePath)) as {
          sheet: string;
          items: ExcelPublisher[];
        }[];

        for (const publisher of results[0].items) {
          await this.publisherService.create(
            plainToInstance(Publisher, {
              faName: publisher.fa_name,
              enName: publisher.en_name,
            }),
          );
        }
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async seedCategories(): Promise<void> {
    // await this.categoryService.clear();
    const categories = await this.categoryService.count();

    if (!categories) {
      await this.categoryService.create(
        plainToInstance(Category, {
          name: 'root',
        }),
      );

      try {
        const filePath = join(process.cwd(), 'files/categories.xlsx');
        const results: {
          sheet: string;
          items: ExcelCategory[];
        }[] = (await readExcel(filePath)) as {
          sheet: string;
          items: ExcelCategory[];
        }[];

        for (const category of results[0].items) {
          const parent = await this.categoryService.find({
            name: category.parent,
          });
          await this.categoryService.create(
            plainToInstance(Category, {
              name: category.name,
              parentId: parent.id,
              active: category.active.toLowerCase() === 'yes' ? true : false,
            }),
          );
        }
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async seedBooks(): Promise<void> {
    // await this.bookService.clear();
    const books = await this.bookService.count();

    if (!books) {
      try {
        const filePath = join(process.cwd(), 'files/books.xlsx');

        const sheets: ExcelSheet[] = (await readExcel(
          filePath,
        )) as ExcelSheet[];

        for (const sheet of sheets) {
          const publisher = await this.publisherService.find({
            enName: sheet.sheet.toLowerCase(),
          });

          for (const book of sheet.items) {
            const category = await this.categoryService.find({
              name: book.category,
            });

            const imageName = `${book.name}-${Math.floor(
              Math.random() * 100001 + 99999,
            )}.jpg`;

            await this.bookService.create(
              plainToInstance(Book, {
                name: book.name,
                writers: book.writers,
                authors: book.authors,
                translators: book.translators,
                year: book.year,
                round: book.round,
                pages: book.pages,
                weight: book.weight,
                price: !isNaN(book.price) ? book.price * 1000 : 0,
                image: imageName,
                category,
                publisher,
              }),
            );

            const originFilePath = join(
              process.cwd(),
              `files/images/${book.image}.jpg`,
            );
            const destinationFilePath = join(
              process.cwd(),
              `public/img/books/${imageName}`,
            );
            await copy(originFilePath, destinationFilePath);
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async seedRoles(): Promise<void> {
    // await this.roleService.clear();
    const roles = await this.roleService.count();

    if (!roles) {
      const roleItems = Object.keys(RoleEnum).map((key) =>
        plainToInstance(Order, {
          name: RoleEnum[key],
        }),
      );

      await this.roleService.create(roleItems);
    }
  }

  async seedAdmin(): Promise<void> {
    await this.seedRoles();
    const adminRole = await this.roleService.find({ name: RoleEnum.ADMIN });
    const admins = await this.userService.count({ roleId: adminRole.id });

    if (!admins) {
      const adminPhone = this.configService.get('ADMIN_PHONE');
      const admin = plainToInstance(User, {
        phone: adminPhone,
        roleId: adminRole.id,
      });

      await this.userService.create(admin);
    }
  }
}
