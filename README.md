# brand

[![Code Climate GPA](https://codeclimate.com/repos/579a5a423f9350008b002155/badges/a804d2cb9113872571ed/gpa.svg)](https://codeclimate.com/repos/579a5a423f9350008b002155/feed)
[![Code Climate Issue Count](https://codeclimate.com/repos/579a5a423f9350008b002155/badges/a804d2cb9113872571ed/issue_count.svg)](https://codeclimate.com/repos/579a5a423f9350008b002155/feed)
[![Test Coverage](https://codeclimate.com/repos/579a5a423f9350008b002155/badges/a804d2cb9113872571ed/coverage.svg)](https://codeclimate.com/repos/579a5a423f9350008b002155/coverage)

Brand service for [Learners Guild][learnersguild].

One of the more annoying things about developing a web app is keeping up with the ever-changing specs from various platform providers around favicons. There's [cheat sheets][favicon-cheat-sheet] and such, but it's still on you to make it all work.

This service provides a simple API that can be used by any web application that shares a given brand.

Special thanks to the folks who built the [favicons generator for Node][node-favicons-generator].


## Getting Started

Be sure you've read the [instructions for contributing](./CONTRIBUTING.md).


1. **Globally** install [nvm][nvm], [avn][avn], and [avn-nvm][avn-nvm].

    ```bash
    curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    npm install -g avn avn-nvm
    avn setup
    ```

2. Clone the repository.

3. Setup and run [mehserve][mehserve]. Then figure out which port you intend to use and create the pow config file:

        $ echo 9003 > ~/.mehserve/brand.learnersguild

4. Set your `NODE_ENV` environment variable:

        $ export NODE_ENV=development

5. Create your `.env` file for your environment. Example:

        PORT=9003
        APP_BASEURL=http://brand.learnersguild.dev

6. Run the setup tasks:

        $ npm install

7. Run the server:

        $ npm start

8. Visit the server in your browser:

        $ open http://brand.learnersguild.dev



## License

See the [LICENSE](./LICENSE) file.


<!-- references -->
[learnersguild]: https://www.learnersguild.org
[favicon-cheat-sheet]: https://github.com/audreyr/favicon-cheat-sheet
[node-favicons-generator]: https://github.com/haydenbleasel/favicons
[mehserve]: https://github.com/timecounts/mehserve
[nvm]: https://github.com/creationix/nvm
[avn]: https://github.com/wbyoung/avn
[avn-nvm]: https://github.com/wbyoung/avn-nvm
