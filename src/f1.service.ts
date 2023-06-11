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
      const response = await axios.get('https://www.formula1.com/results.html');
      const results = this.parseResults(response.data);
      results.forEach(async e => {
        console.log(moment(e.date, "DD MMM YYYY").toDate());

        await this.resultRepository.save({
          grandPrix: e.grandPrix,
          date: moment(e.date, "DD MMM YYYY").toDate(),
          car: e.car,
          laps: parseInt(e.laps),
          time: e.time,
          winner: e.winner
        })
      })
      return results
    } catch (error) {
      console.error('Error fetching and saving results:', error);
      throw error;
    }
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
      const winner = $(columns[3]).find('span').text().trim();
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
