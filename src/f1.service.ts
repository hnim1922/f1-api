import { Injectable } from '@nestjs/common';
import { ResultDTO } from './dto/result.dto';
import { ResultEntity } from './result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { load } from 'cheerio';
import * as moment from 'moment';
@Injectable()
export class F1Service {
  constructor(
    @InjectRepository(ResultEntity)
    private resultRepository: Repository<ResultEntity>,
  ) { }


  async fetchAndSaveResults(): Promise<any> {
    try {
      const startYear = 1950;
      const currentYear = new Date().getFullYear();
      const promises = [];

      for (let year = startYear; year <= currentYear; year++) {
        const response = axios.get(`https://www.formula1.com/en/results.html/${year}/races.html`);
        promises.push(response);
      }

      const responses = await Promise.all(promises);
      const results = [];

      for (const response of responses) {
        const parsedResults = this.parseResults(response.data);
        const savePromises = [];

        for (const e of parsedResults) {
          const laps = Number.isNaN(parseInt(e.laps)) ? 0 : parseInt(e.laps);

          const savePromise = this.resultRepository.save({
            grandPrix: e.grandPrix,
            date: moment(e.date, "DD MMM YYYY").toDate(),
            car: e.car,
            laps: laps,
            time: e.time,
            winner: e.winner
          });

          savePromises.push(savePromise);
        }

        await Promise.all(savePromises);
        results.push(...parsedResults);
      }

      return results;
    } catch (error) {
      console.error('Error fetching and saving results:', error);
      throw error;
    }
  }



  async getResultList(dto: ResultDTO): Promise<ResultEntity[]> {
    const queryBuilder = this.resultRepository
      .createQueryBuilder('result')
    if (dto.grandPrix) queryBuilder.where('LOWER(result.grand_prix) like :grandPrix', { grandPrix: `%${dto.grandPrix}%` })

    if (dto.winner) queryBuilder.andWhere('LOWER(result.winner) like :winner', { winner: `%${dto.grandPrix}%` })

    if (dto.year) queryBuilder.andWhere('YEAR(result.date) = :year', { year: dto.year, })

    return queryBuilder.getMany();
  }
  private parseResults(html: string): any[] {
    const results: any[] = [];

    // Load the HTML content using Cheerio
    const $ = load(html);

    // Use CSS selectors to target the table rows containing the results data
    const resultRows = $('.resultsarchive-table tbody tr');

    // Iterate over the result rows and extract the desired data
    resultRows.each((index, rowElement) => {
      const columns = $(rowElement).find('td');

      const grandPrix = $(columns[1]).find('a').text().trim();
      const date = $(columns[2]).text().trim();
      const winner = $(columns[3]).find('span.hide-for-tablet, span.hide-for-mobile').map((index, element) => $(element).text().trim()).get().join(' ');
      const car = $(columns[4]).text().trim();
      const laps = $(columns[5]).text().trim();
      const time = $(columns[6]).text().trim();

      // Create a result object and push it to the results array
      const result = {
        grandPrix,
        date,
        winner,
        car,
        laps,
        time,
      };

      results.push(result);
    });

    return results;
  }
}
