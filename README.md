# ACME Color Tokens Web App

This project is based on the Specify Hiring Tests. It's a simple web app that allows users to store, access, and export color tokens for their design system.

## Used Technologies

- Frontend: React + NextJS
   - Chakra UI for pre-styled components
   - Hosted on Vercel for production
- Backend: Prisma + NextJS
   - Hosted as Cloud Functions on Vercel
- Database: PostgreSQL
   - Hosted locally for dev
   - Hosted on Planetscale for prod
- Other noteworthy dependencies
   - `yup` for schema validation
   - `color` for parsing all kinds of color strings into an rgba object
   - `react-swr` for efficient data fetching and optimistic mutations
   - `framer-motion` for sleek animations
   - `react-colorful` for an accessible color picker
   - `react-highlight`, based on `highlight.js` for highlighting the syntax of code previews

## Setup

To setup your local dev environment, make sure that you have Node, Yarn, and Docker installed. First, install the app's dependencies:

```sh
yarn
```

To start the local database, run:

```sh
docker-compose up
```

You can then fill the database with test data from the seeds.json file:

```sh
yarn insert-demo-data
```

To start the project, run:

```sh
yarn dev
```

The project is now up and running on `localhost:3000`.

## Testing

The project uses Jest for unit tests. To run the tests, simply run:

```sh
yarn test
```

You can also run Jest in watch mode to automatically run tests as you make changes to the files:

```sh
yarn test --watch
```

## Project Structure

The project shares code and types between the frontend and the backend. As modern web platforms offer atomic deploys, the frontend can be sure that it has the same types as the backend at all times.

The API lives under `pages/api`. This path is specified by Next and all paths below it are mapped to their respective URLs. So, e.g. the file `pages/api/export/formats` is published under `/api/export/formats`. For more information, check out the [Next API docs](https://nextjs.org/docs/api-routes/introduction).

The database schema is defined at `prisma/schema.prisma`. This is where we can add new models in the future, if we want to extend the app's functionality.

The `util` folder contains utility functions that are shared between the frontend and the backend. These include the parsers, schema validation, and string transform tools, and more.

The app's homepage lives under `pages/index.tsx`. For now, all it does is show the header, a few buttons, and the `ColorTokenList` component. As with the `pages/api` folder, Next maps the folder structure to a URL structure which makes it easy add new pages.

The components are located in the `components` folder, grouped by area. So, for example, all components that have to do with the export dialog are located in the `export-modal` folder.

The `hooks` folder contains custom React hooks. For now, these are just SWR hooks which handle the data fetching.

The `styles` folder contains global styles. Most styles should be grouped with their components using `styled-jsx`, Next's own styling solution for React. The only stylesheet that I had to load globally is the theme for `react-highlight`.

The `types` folder contains TS type definitions. For now, I just stored a convenience type for our API responses in there, but as the project grows, this is the place to put our own type definitions for untyped dependencies, type extensions, utility types, etc.

And last, the `scripts` folder contains scripts that can be run in the local development environment. For now, it just contains the `insert-demo-data` script that you likely ran when you set up the environment on your own machine.

## API Documentation

The API documentation is available in the [API.md](API.md) file.

## Potential Future Improvements

If I had more time to work on the project, I would add the following improvements:

- Ability to edit existing color tokens
   - Currently, it is only possible to create and delete them
- Authentication
   - Currently, the web app and API can be used by everyone
   - It might be beneficial to introduce a concept of users and API tokens
- E2E UI tests using Cypress
   - I have already added unit and integration tests using Jest, but they don't test the actual UX

----

These are the original requirements:

# Specify Hiring Tests

## About Specify
At Specify, we help organizations distribute their brand identity across their products and channels. Our mission is to become the backbone of design & code decisions within an organization. We strongly believe companies should be focused on what matters, solving problems rather than chasing UI and tech debt.

We've created the first Design Data Platform on the market that collects, stores, enriches and distributes design tokens across design system tools — automatically. Specify helps organizations managing their branding at scale by giving developers and designers the tools they need to better collaborate.

## Requirements
As Specify is a Design Data Platform, you will have to work on an **UI** and an **API** related to design tokens.

The main goal of this test is for us to discuss and understand the mindset you had when developing.

ℹ️ Finishing the test is not a requirement.

For this test you will create:

1. An API that allows to:
   1. Read design tokens
   2. Create design tokens
2. An UI that allows to:
   1. See all the design tokens with a their preview and their values.
   2. Download those tokens in different formats.

## Use case
The ACME organization is developing its design system. The team federating their design system wants to:
- See all the colors used in their design system
- Export colors design tokens in several formats used by teams consuming the design system.

## API Part
Using any language and any framework, you will create an API that allows to:

1. List all design tokens
2. Create a new design token

ℹ️ The only type of token you will have to manage is **colors**.

A design token must have the following properties:
- A **name**
- A **value** (that is the color) in the format of an object with 4 keys : r, g, b and a `{ r: number, g: number, b: number, a: number}` with r, g and b between 0 - 255 and a between 0 - 1
- A **meta** object where we can store any other information to give more context

You have been provided a `seeds.json` file. It contains color design tokens and has a strict data format.

You can create a REST API or a GraphQL API.

## UI Part
Using any language and any framework, you will create an UI the ACME organization will use.

Your solution should allow to:

- See all the tokens (**name** + **value**) coming from the API you have to create.
- Create a token and then see it in the listing
- Visualize the code the developer will export. The generated code should include all the tokens, not just one.

The code will be displayable and downloadable in three formats:

- [CSS Custom properties](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties) within the `:root` selector
- [SCSS Map](https://sass-lang.com/documentation/values/maps#look-up-a-value)
- JS as a simple exported object that can be used in [JSS](https://cssinjs.org/jss-syntax/?v=v10.4.0#basic-syntax)

**⚠** We also want to test some of your algorithmic skills. **For the data transformation, you are not allowed to use a library** but you can use some on the other parts of the UI.

## Evaluation criterias
You will be evaluated based on:
- The clarity and readability of your code
- The quality of the user and developer experience
- The scalability potential of your code
- The stability potential of your code
- The application architecture
- The transformation logic used on the front

**⚠** Keep in mind that you should be working as if we are your coworker.

In that regard:
- Consider this test as a proper product, not a POC or a prototype. It should be stable and easily scaled.
- The UI and API should be created in an environment that is both easy to launch and easy to work on.
- You can add any feature you deem important
- You can add any tests you want.

## Sending it back
To send the test back, you can:
- Send us a git repo link
- Send us a zip archive

Do not forget to add a `README.md` so that we can make the app work on our own environment.

You can contact us at anytime if you have an issue or a question at [dev@specifyapp.com](dev@specifyapp.com).
