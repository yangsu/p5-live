class FlowField {
  constructor(rows, columns, initializer) {
    this.rows = rows;
    this.columns = columns;
    this.rowSize = width / rows;
    this.colSize = height / columns;
    this.arrowSize = min(this.rowSize, this.colSize);
    this.field = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(initializer(i, j));
      }
      this.field.push(row);
    }
  }

  update(iterator) {
    this.field.forEach((row, i) => {
      row.forEach((direction, j) => {
        const startX = (i + 0.5) * this.rowSize;
        const startY = (j + 0.5) * this.colSize;
        const position = new p5.Vector(startX, startY);
        iterator(direction, position, i, j);
      });
    });
  }

  draw() {
    stroke(155);
    this.update((direction, position, i, j) => {
      const diff = direction.copy().setMag(this.arrowSize).div(2);
      const start = p5.Vector.sub(position, diff);
      // const start = position;
      const end = p5.Vector.add(position, diff);
      // strokeWeight(1);
      // console.log(diff.mag());
      // const gray = map(diff.magSq(), 0, maxArrowSize / 2, 50, 255);
      const gray = map(p5.Vector.angleBetween(direction, new p5.Vector(1, 0)), 0, PI, 0, 255);
      stroke(gray);
      line(start.x, start.y, end.x, end.y);
      // fill(gray);
      // const startX = i * this.rowSize;
      // const startY = j * this.colSize;
      // rect(startX, startY, startX + this.rowSize, startY + this.colSize);
      // strokeWeight(3);
      // stroke(0, 0, 255);
      // point(start.x, start.y);
      // stroke(0, 255, 0, gray);
      // point(end.x, end.y);
    });
  }
}
