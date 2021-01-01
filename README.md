# SVG to SwiftUI Converter Core

This is the core transpiler code that you can use to convert raw SVG code into SwiftUI Shape struct that you can use directly in your SwiftUI Project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

All you need to do is to add this package to your project using following command:

`npm i svg-to-swiftui-core`

and then import into your project (ES6):

`import { convert } from 'svg-to-swiftui-core'`

## Running the tests

You can run the tests by running following command:

`npm test`

## Built With

This project relies on following npm packages:

- [svg-parser](https://github.com/Rich-Harris/svg-parser) - Parses raw SVG into a HAST (Hypertext Abstract Syntaxt Tree).
- [svg-pathdata](https://github.com/nfroidure/svg-pathdata) - Parses svg path `d` attribute into a list of easily interpretable objects.

## Contributing

Feel free to open an issue if your SVG file doesn't work or send a PR with our suggested changes!

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/quassummanus/svg-to-swiftui-core/tags).

## Authors

- **Antoni Silvestrovic** - _Initial work_ - [bring-shrubbery](https://github.com/bring-shrubbery)

See also the list of [contributors](https://github.com/quassummanus/svg-to-swiftui-core/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
