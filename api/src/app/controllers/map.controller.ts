import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('map')
export class MapController {
@Get()
  getPoints(): any {

    const points = [
      [-73.935242, 40.73061], // New York City
      [-73.756232, 42.65258], // Albany
      [-76.147424, 43.04812], // Syracuse
      [-78.878392, 42.886448], // Buffalo
      [-75.4999, 43.000351], // Utica
      [-76.180484, 43.16103], // Oswego
      [-77.610116, 43.156578], // Rochester
      [-73.794852, 42.728412], // Troy
      [-73.756232, 42.746632], // Schenectady
      [-73.480406, 42.814243], // Saratoga Springs
      [-73.4529, 44.6995],
      [-75.9108, 43.9748]
    ];

    const pointsObject = points.reduce((obj, point, index) => {
      obj[`point${index + 1}`] = point;
      return obj;
    }, {});

    return pointsObject;
  }

  @Post()
  async uploadCSVData(@Body() data: { Longitude: number; Latitude: number }[]) {

    const transformedData = data.map(item => [item.Longitude, item.Latitude]);

    const pointsObject = transformedData.reduce((obj, point, index) => {
      obj[`point${index + 1}`] = point;
      return obj;
    }, {});

    return pointsObject;
  }
}


