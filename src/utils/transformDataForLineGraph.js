import moment from 'moment';

export default function transformDataForLineGraph(data) {
    const result = { id: 'some id' };

    const transformedData = data.map(({ date, count }) => {
        const formattedDate = moment(date).format('MM/DD/YY');
        return { x: formattedDate, y: count };
    });

    return { ...result, data: transformedData };
}
