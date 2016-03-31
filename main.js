var program;
var oldProgram;
function parseChanged(event) {
  oldProgram = program;
  program = acorn.parse(event.detail.source);
  if (!oldProgram) {
    return [];
  }
  var changed = [];
  var end = Math.min(program.body.length, oldProgram.body.length);
  for (var i = 0; i < end; i++) {
    var old = escodegen.generate(oldProgram.body[i]);
    var current = escodegen.generate(program.body[i]);
    if (old !== current) {
      changed.push(program.body[i]);
    }
  }
  return changed;
}

function updateSketch() {
  window.p5Instance.remove();
  window.p5Instance = new p5();
}

function hasName(astNode, name) {
  var id = astNode.id;
  return id.type === 'Identifier' && id.name === name;
}

function isSetupFunction(node) {
  return (node.type === 'FunctionDeclaration' ||
    node.type === 'VariableDeclarator') && hasName(node, 'setup');
}

function isGlobalConstant(node) {
  var hasDeclarations = node.type === 'VariableDeclaration' &&
    node.declarations.length;
  return hasDeclarations && node.declarations.some(function(declaration) {
    return !!declaration.init;
  });
}

function updateGlobalConstant(node) {
  node.declarations
    .filter(function(declaration) {
      return !!declaration.init;
    })
    .map(escodegen.generate.bind(escodegen))
    .forEach(function(line) {
      try {
        console.log('Updating global constant: ' + line);
        eval(line);
      } catch (e) {
        console.error('Error executing global constant: ' + line, e);
      }
    });
}

window.addEventListener('patch', function(event) {
  if (event.detail.filename === 'sketch.js') {
    var changed = parseChanged(event);
    for (var i = 0; i < changed.length; i++) {
      var node = changed[i];
      if (isSetupFunction(node)) {
        updateSketch();
      } else if (isGlobalConstant(node)) {
        updateGlobalConstant(node);
      }
    }
  }
});
