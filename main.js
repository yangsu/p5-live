window.addEventListener('patch', function(event) {
  if (event.detail.filename == 'sketch.js') {
    ast = acorn.parse(event.detail.source);
    console.log(ast);
    p5Instance.remove();
    p5Instance = new p5();
  }
  console.log(event);
});
