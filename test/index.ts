import { definitions } from "../interface";

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

function aa(b, c) {}
