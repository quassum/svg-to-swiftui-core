export const generateSwiftUIShape = (name: string, body: string) =>
  [
    `struct ${name}: Shape {`,
    'func path(in rect: CGRect) -> Path {',
    'var path = Path()',
    'let width = rect.size.width',
    'let height = rect.size.height',
    body,
    'return path',
    '}',
    '}',
  ].join('\n');
