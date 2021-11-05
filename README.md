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

## API Documentation
## Potential 

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
