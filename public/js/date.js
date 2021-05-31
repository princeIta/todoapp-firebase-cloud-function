const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
]

const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
]

class DateObject {
    time = new Date()
    month = months[this.time.getMonth()]
    dayOfWeek = daysOfWeek[this.time.getDay()]
    date = this.formatDateStr(this.time.getDate())
    timeString = this.formatTimeStr(this.time)

    constructor(dateTime = new Date()) {
        const time = new Date(dateTime)
        const isValidDateTime = !isNaN(time.getTime())

        if (isValidDateTime) {
            this.time = time
            this.month = months[this.time.getMonth()]
            this.dayOfWeek = daysOfWeek[this.time.getDay()]
            this.date = this.formatDateStr(this.time.getDate())
            this.timeString = this.formatTimeStr(time)
        } else {
            throw new Error(`invalid datetime ${dateTime}`)
        }
    }

    formatTimeStr() {
        const dateObj = new Date(this.time)
        const t = (dateObj.toLocaleTimeString()).split(":").slice(0, 2).join(":") + " " + amOrPm(this.time)

        return t
    }

    formatDateStr(date) {
        const dateNum = +date
        const typeOfDate = typeof dateNum
        const isValidDate = dateNum >= 1 && dateNum <= 31

        if (typeOfDate !== "number" || !isValidDate) {
            throw new Error("date arg must be numeirc within the range of 1-31")
        }

        const lastDigit = dateNum % 10
        const restDigit = parseInt(dateNum / 10)

        let endingText = ""
        switch (lastDigit) {
            case 1:
                endingText = "st"
                break;
            case 2:
                endingText = "nd"
                break;
            case 3:
                endingText = "rd"
                break;
            case 0:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                endingText = "th"
                break;
            default:
                break;
        }

        return "" + restDigit + lastDigit + endingText
    }
}

function amOrPm(time) {
    const noon = new Date(time).setHours(12, 0, 0, 0)
    const t = new Date(time).getTime()

    return t >= noon ? "PM" : "AM"
}