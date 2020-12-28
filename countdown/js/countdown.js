export default class Countdown {
  constructor(nextYearDate) {
    this.nextYearDate = nextYearDate;
  }

  get _actualDate() {
    return new Date();
  }

  get _nextYearDate() {
    return new Date(this.nextYearDate);
  }

  get _timeStampDiff() {
    return this._nextYearDate.getTime() - this._actualDate.getTime();
  }

  get days() {
    return Math.floor(this._timeStampDiff / (24 * 60 * 60 * 1000));
  }

  get hours() {
    return Math.floor((this._timeStampDiff / (24 * 60 * 60)) % 24);
  }

  get minutes() {
    return Math.floor((this._timeStampDiff / (24 * 1000)) % 60);
  }

  get seconds() {
    return Math.floor(this._timeStampDiff / 1000) % 60;
  }

  get total() {
    const days = this.days;
    const hours = this.hours;
    const minutes = this.minutes;
    const seconds = this.seconds;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}
