![Project Cover](public/img/project-cover.png)

# Mission 2120

Mission 2120 is a project built as part of the hiring process at [Billi](https://www.billie.io). The project brief required that I developed a simple web app using [React.js](https://reactjs.org) where the user could see a list of the consumers and edit their available budget.

My proposal involves creating a [CRM](https://en.wikipedia.org/wiki/Customer_relationship_management) platform to aggregate and manipulate the service<>consumer relationship.

To achieve this result, I started with the User Experience aspects of the interface, then moved into the User Interface details and lastly into Frontend Development. To gain time, I have made use of [Create React App](https://github.com/facebook/create-react-app) to quickly scaffold the project and [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap) to not have to create all the Vanilla Javascript needed for the [Modal](https://react-bootstrap.github.io/components/modal) where the consumer budget shows up.

It was my intention to not use [Redux](https://github.com/reduxjs/redux) or [React Router](https://github.com/ReactTraining/react-router) given the fact that the project brief only requires one page and the state does not need to be persisted across multiple routes.

- See the [Live Demo](https://iorrah.github.io/mission-2120/)
- See the proposal on [Behance](https://www.behance.net/gallery/91316835/Billie-Code-Assessment)

## The Challenge

Humans finally met extraterrestrial civilizations. Spaceships are now able to travel to galaxies far away. Isaac Asimov can finally be proud of us.

It turned out that the Martian B2B market looks pretty attractive. Martian entrepreneurs are hard workers. SMEs on Mars produce goods and provide services. But… they need liquidity, insurance, and collections. Same problems as on Earth.

## Research

Think about problems our Martian business may face in 2120: Oxygen supply, Marketing,
Vegetables for the Team, Accounting...whatever.
Take your time. Use Google. Do a research about the topic. Write down all the problems you
came up with, and potential solutions to each of them.

## Problem solving task

Create a simple (React) SPA that displays a list of Martian consumers of our service.

The list should display the following:

- Company Name
- Date of a first purchase
- Total budget
- Budget spent
- Budget left

The budgets must be displayed in the german format, with 2 decimals.

The companies should be fetched from an endpoint, that will provide the data in this format (add as many items as needed):

```
[{
 id: 1,
 name: “Martian Firma”,
 budget: 10000.0000,
 budget_spent: 4500.0000,
 date_of_first_purchase: “2119-07-07”
}, {
 id: 2,
 name: “Solar Firma”,
 budget: 1123.2200,
 budget_spent: 451.3754,
 date_of_first_purchase: “2120-01-14”
}]
```

The endpoint itself can be mocked.

Clicking on the company row should open a modal with the company’s name and one input field:

- The field is pre-filled with the total budget for the that company
- The user should be able to edit the value and submit
- If the value is not valid, no submission should be possible
- If the value is valid, a confirmation should be displayed before the user can go back to the list of companies
- The new value should appear in the list as soon as it is updated

_Bonus_: The value must not be less than the budget spent.

Cover the modal component with unit-tests.

Notes:

- On the frontend side, all the numeric values must have two decimals, and be displayed in the german locale
- It is up to you to use create-react-app;
- It is possible to use redux
- It is up to you to use any CSS framework, or no framework at all

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
