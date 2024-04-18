export class DateUtils {
    static shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    static toYYYYDDMM(d) {
        const yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // Months start at 0!
        let dd = d.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return yyyy + '-' + mm + '-' + dd;
    }

    static toMMDDYYYY(d) {
        const yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // Months start at 0!
        let dd = d.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '-' + mm + '-' + yyyy;
    }

    static findYearMonth(d) {
        const yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // Months start at 0!
        let dd = d.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return {
            month: mm,
            year: yyyy,
        };
    }

    static millisecondsToYYYYDDMM(ms) {
        let d = new Date(ms);
        const yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // Months start at 0!
        let dd = d.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return yyyy + '-' + mm + '-' + dd;
    }
    static millisecondsToDDMMYYYY(ms) {
        let d = new Date(ms);
        const yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // Months start at 0!
        let dd = d.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '-' + mm + '-' + yyyy;
    }

    static millisecondsToReadable(ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = DateUtils.shortMonths[date.getMonth()];
        var day = date.getDate();
        if (day < 10) day = '0' + day;
        return day + ' ' + month + ', ' + year;
    }

    static millisecondsToReadableWeekDay(ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = DateUtils.shortMonths[date.getMonth()];
        var day = date.toLocaleString('en-us', {weekday: 'long'});
        return day + ' ' + month + ', ' + year;
    }

    static millisecondsToHHMM(ms) {
        var date = new Date(ms);
        return date.getHours() + ':' + date.getMinutes();
    }

    static tConvert(time) {
        // to convert 12 hour time AM/PM
        // Check correct time format and split into components
        var date = new Date(time);
        let newTime = date.getHours() + ':' + date.getMinutes();
        newTime = newTime
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [newTime];

        if (newTime.length > 1) {
            // If newTime format correct
            newTime = newTime.slice(1); // Remove full string match value
            newTime[5] = +newTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            newTime[0] = +newTime[0] % 12 || 12; // Adjust hours
        }
        return newTime.join(''); // return adjusted time or original string
    }

    static millisecondsToShortDateTime(ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = DateUtils.shortMonths[date.getMonth()];
        var day = date.getDate();
        if (day < 10) day = '0' + day;

        return day + ' ' + month + ', ' + year;
    }

    static formatYearMonthDateAndTime = (givenDate) => {
        let date = new Date(givenDate);

        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: '2-digit' });
        const year = date.toLocaleString('default', { year: 'numeric' });
    
        //for 24 hours format
        let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        
        const newTime = `${hours}:${minutes}`

        return `${year}-${month}-${day} ${newTime}` ;
    };

    static formatDateMonthYearAndTime = (givenDate) => {
        let date = new Date(givenDate);

        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: '2-digit' });
        const year = date.toLocaleString('default', { year: 'numeric' });
    
        //for 24 hours format
        let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        
        // const newTime = `${hours}:${minutes}`
        const newTime = this.tConvert(givenDate);

        return `${day}-${month}-${year} ${newTime}` ;
    };
}
