# brand

Brand service for [Learners Guild][learnersguild].

One of the more annoying things about developing a web app is keeping up with the ever-changing specs from various platform providers around favicons. There's [cheat sheets][favicon-cheat-sheet] and such, but it's still on you to make it all work.

This service provides a simple API that can be used by any web application that shares a given brand.

Special thanks to the folks who built the [favicons generator for Node][node-favicons-generator].


## Getting Started

Be sure you've read the [instructions for contributing](./CONTRIBUTING.md).


1. Clone the repository.

2. Setup [pow][pow]. Then figure out which port you intend to use and create the pow config file:

        $ echo 9003 > ~/.pow/brand.learnersguild

3. Set your `NODE_ENV` environment variable:

        $ export NODE_ENV=development

4. Create your `.env` file for your environment. Example:

        PORT=9003
        APP_BASEURL=http://brand.learnersguild.dev

5. Run the setup tasks:

        $ npm install

6. Run the server:

        $ npm start

7. Visit the server in your browser:

        $ open http://brand.learnersguild.dev



## License

See the [LICENSE](./LICENSE) file.


<!-- references -->
[learnersguild]: https://www.learnersguild.org
[favicon-cheat-sheet]: https://github.com/audreyr/favicon-cheat-sheet
[node-favicons-generator]: https://github.com/haydenbleasel/favicons
[pow]: http://pow.cx
