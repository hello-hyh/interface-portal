// import { definitions } from "../interface";
// const a: definitions["CategoryModel"] = {
//   id: 4,
// };
interface Point {
  _type: "point";
  x: number;
  y: number;
}
interface RadiusPoint {
  _type: "radius";
  x: number; // radius
  y: number; // theta
}
function PointDistance(p: Point) {
  return Math.sqrt(p.x ** 2 + p.y ** 2);
}
let p1: Point;
let p2: RadiusPoint;
function b() {}
function aa(b, c) {}

