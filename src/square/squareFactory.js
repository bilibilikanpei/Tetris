import Suqare from './index';
export default function SquareFactory() {
    this.SquareList = [];
}
SquareFactory.prototype.getSquare = function () {
    this.squareList.push(new Square());
    return this.square;
}
SquareFactory.prototype.get = function () {

}