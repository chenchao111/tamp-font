export default class {
  constructor(
    { upColor = '#F54949', downColor = '#00B267', flatColor = '#666' } = {
      upColor: '#F54949',
      downColor: '#00B267',
      flatColor: '#666',
    }
  ) {
    this.upColor = upColor;
    this.downColor = downColor;
    this.flatColor = flatColor;
  }
  color = val => {
    return val > 0
      ? { color: this.upColor }
      : val < 0
      ? { color: this.downColor }
      : { color: this.flatColor };
  };
  bg = val => {
    return val > 0
      ? { 'background-color': this.upColor }
      : val < 0
      ? { 'background-color': this.downColor }
      : { 'background-color': this.flatColor };
  };
}
