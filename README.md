# Description

Horizon is a fully-featured headless e-commerce theme developed around Swell's powerful and flexible subscription features. It comes pre-configured to work with the Swell Editor out-of-the-box, so that you can customize its content and styling as you need. The codebase itself is using a standard Next.js structure making it is easy to modify for anyone with some familiarity with React.

### Deploy Horizon on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fswellstores%2Fhorizon%2F&env=NEXT_PUBLIC_SWELL_STORE_URL,NEXT_PUBLIC_SWELL_PUBLIC_KEY,SWELL_STORE_ID,NEXT_PUBLIC_SWELL_EDITOR&envDescription=These%20environment%20variables%20are%20required%20to%20connect%20Horizon%20to%20your%20Swell%20Store.&envLink=https%3A%2F%2Fdevelopers.swell.is%2Fstorefronts%2FStorefront-hosting%2Fstorefronts-on-vercel%23adjusting-the-build-settings&project-name=swell-horizon&repository-name=swell-horizon&demo-title=Swell%20-%20Horizon%20&demo-description=E-commerce%20theme%20built%20around%20Swell.js%20powerful%20subscription%20features.&demo-url=https%3A%2F%2Fstorefronts-horizon.vercel.app%2F)

The link above should automatically pre-select this repository as the source and pre-fill the names of the required environment variables. For more information on these, please see the "Setting up your environment" section below.

## Features

- Complete purchase flow
- Subscriptions
- Content personalization through customizable Quizzes
- Multi-currency
- Product sales
- Automatic discounts
- One-click add-to-cart for products
- Dynamic pages with a large and extendable collection of content blocks
- Product search
- Filter products by any attribute
- Flexible product customization through variant options
- A customer portal with orders and subscription handling

## Technology stack

- Next.js
- React
- TypeScript
- TailwindCSS
- Storybook
- Swell's GraphQL API
- State management via `Zustand`
- End-to-end type generation through `graphql-codegen`
- Radix UI and Headless UI for accessible components
- Unit tests through Jest
- Component tests through React Testing Library
- ESLint
- Prettier
- Pre-commit hooks through Husky

# Getting started

## Setting up your environment

The first step will be to set up the environment variables. Create an `.env` file at the root of the project's directory and add the following entries:

- `NEXT_PUBLIC_SWELL_STORE_URL`: This endpoint should have the following format: `https://{YOUR_STORE_URL}.swell.store`

- `NEXT_PUBLIC_SWELL_PUBLIC_KEY`: This value refers to a Store's Public Key that can be found inside the Developer > API Keys route in the Admin Dashboard.

- `SWELL_STORE_ID`: The store's ID. It can be found at the top of the Developer > API Keys route in the Admin Dashboard.

- `NEXT_PUBLIC_SWELL_EDITOR`: This should be set to `true` to allow for correct functionality when using the swell editor. In a production environment you can safely set this to false.

The next step will be setting up the development environment. We recommend installing Node.js through [nvm](https://github.com/nvm-sh/nvm). Afterwards, run the following commands to match the project's Node and NPM versions and install the project's dependencies:

```bash
nvm install
npm install -g npm@8
npm install
```

This will also automatically setup the GraphQL client with end-to-end typings and download the content and settings from your store's editor. Check out the `graphql:generate` and `theme:generate` commands on the `package.json` file for more information.

Lastly, you can start the development server with:

```bash
npm run dev
```

Horizon should now be running on [http://localhost:3000](http://localhost:3000) by default.

## Running Storybook

You can take a look at the available components and the props they accept by running the `storybook` npm script:

```bash
npm run storybook
```

Storybook should now be running on [http://localhost:6006](http://localhost:6006), unless the port is already taken.

# Directory structure

- `assets/`: Contains the project's icons and fonts. The latter are automatically pulled from the editor's selections.
- `build-utils/`: The scripts in this folder are used to inject styles and assets from the editor before the project is ran or built.
  - `generate-theme.mjs`: Entry point for the theme generation logic.
- `components/`: The UI components used throughout the project. The component library is organized using [Atomic Design principles](https://bradfrost.com/blog/post/atomic-web-design/) and each component contains the following files:
  - `ComponentName.stories.tsx` file: Used to generate a Storybook entry for the component.
  - `ComponentName.tsx`: The React component itself.
  - `ComponentName.test.tsx` (Optional): Behavior interaction tests for the component.
  - `index.ts`: Re-exports the above files using the [Barrell Exports Pattern](https://blog.logrocket.com/using-barrel-exports-organize-react-components/) to simplify imports.
    Since this folder structure is repeated every time a new component is built, we created a script to scaffold this structure. Usage: `./create_component.sh <component_type> <component_name>`
- `config/`: Contains the editor's schema. See [here](https://developers.swell.is/storefronts/origin#content) for more information on how to customize it.
- `hooks/`: Contains the React Hooks used throughout the application.
  - `useClassNames`: Simplifies toggling class names conditionally.
  - `useCurrencySubscription`: Utility for automatically refetching product prices on currency change.
  - `useDraggableScroll`: DOM manipulation hook used within the `HorizontalScroller` UI component.
  - `useLiveEditorQuizNavigation`: Used to keep the focus of Horizon and the Editor in sync while editing the Quiz.
  - `useLiveEditorQuizResultsNavigation`: Used to keep the focus of Horizon and the Editor in sync while editing the Quiz Results page.
  - `useLiveEditorQuizUpdates`: Used to keep the content of Horizon and the Editor in sync while editing the Quiz.
  - `useLiveEditorQuizResultsUpdates`: Used to keep the content of Horizon and the Editor in sync while editing the Quiz Results page.
  - `useLiveEditorUpdates`: Used to keep the content of the dynamic pages in sync between Horizon and the Editor.
  - `usePageSections`: Transforms the page sections coming from the editor into a list of components.
  - `useProductPrice`: Formats the products prices in the active locale and currency.
  - `useProductSearch`: Handles the product search logic.
  - `useProductSelection`: Handles the state for the user's product selections and returns the active variation data.
  - `useProductStock`: Returns the stock status and max quantity allowed for the active variation.
  - `useQuiz`: Handles the quiz steps selection logic.
  - `useQuizResults`: Fetches and transforms the product data to be shown based on the quiz selections.
- `lib/`: Provides quick access to commonly used resources.
  - `editor/`: Editor-specific utils.
  - `globals/`: Shared enums, constants, sizes, stylings, etc.
  - `graphql/`: Contains the GraphQL client, queries and generated sdk.
  - `rest/`: Rest API requests.
  - `shop/`: Product specific functions.
  - `utils/`: Small utility functions divided by category.
- `mock/`: Mocked data used for Storybook stories and tests.
- `page_layouts/`: Page layout templates as a stand-in for the lack of layout support in Next 12. We were able to create easily reusable layouts that fetch data server-side (for better SEO and responsiveness and to prevent layout shifts), by wrapping the pages with these templates which are used as Higher Order Components, and by wrapping the `getServerSideProps` and `getStaticSideProps` fetching functions with the decorators located within `lib/utils/fetch_decorators.ts`.
- `pages/`: The pages that constitute Horizon.
  - `account/`: The customer portal.
  - `blog/`: The blog pages.
  - `categories/`: The Category Details pages.
  - `products/`: The Product Details pages.
  - `quiz/`: The template for each dynamically generated quiz defined within the editor.
  - `[[...slug]]`: Maps to the dynamic pages defined in the "Pages" section of the editor.
- `stores/`: Zustand stores for globally accessible state.
  - `cart`: Stores the cart data.
  - `currency`: Keeps track of the active currency and its formatting.
  - `locale`: Keeps track of the stores' locales and the active one.
  - `notification`: Stores the pop-up notifications shown on specific actions or errors.
  - `quiz`: Stores the data for the quizzes and their answers.
  - `settings`: Contains the data for store settings such as colors and typography. These are mapped to environment variables and used throughout the theme.
- `styles/`: Contains the auto-generated theme and font stylings, plus some one-off style overrides or utility classes. Most stylings are defined inline through TailwindCSS utility classes.
- `types/`: TypeScript type definitions, organized by category.
- `codegen.yml`: Contains the configuration options for the `graphql-codegen` used for end-to-end type safety.
- `create_component`: Scaffolds the structure for a new component.
- `lint-staged.config.js`: Contains the configuration for `lint-staged`, which runs before every commit. See the pre-commits section below for more details.

# Customizing the theme

In the `prepare` step, the node script located inside of `builds-utils/generate-theme.mjs` will be executed. This script will attempt to fetch the theme data that has been set through the store's Editor, and that can be accessed through the endpoint `https://{{your store id}}.swell.store/api/settings`. This script can also be ran on its own by using the command `npm run theme:generate`.

Using this theme data, the script will create a `theme.css` file that exposes these settings as css variables, so that they can then be used by the Tailwind config and throughout the application.

To modify any of the theme settings, first make the change in the Editor and then re-trigger the script to pull them into the store. Alternatively, you can also modify the `theme.css` file directly to preview how the changes would look before committing to them in the Editor.

In regards to customizing the editor's schema itself, please see [here](https://developers.swell.is/storefronts/origin#content) for more information.

# Preview mode

Horizon automatically enters [Next.js' preview mode](https://nextjs.org/docs/advanced-features/preview-mode) when the `NEXT_PUBLIC_SWELL_EDITOR` environment variable is set to true. This is done through the `preview.ts` API route, which sets the cookies necessary to alert Next.js that pages should be rendered on-demand instead of statically. This is important when running alongside the editor so that the changes made within it are immediately reflected in the storefront without requiring a new build.

The calls to the `preview.ts` API route are done through a `useEffect` in `app.tsx`.

# Pre-commit hooks

Before every commit, the following checks are made:

- That there are no TypeScript errors.
- That the ESLint rules are satisfied.
- That the correct Prettier formatting is used.

This process will automatically attempt to fix the formatting and some of the eslint errors and warnings.

ESLint and TypeScript errors will prevent commits from being completed. See `lint-staged.config.js` and `eslintrc.json` for more information on the checks that are made.
