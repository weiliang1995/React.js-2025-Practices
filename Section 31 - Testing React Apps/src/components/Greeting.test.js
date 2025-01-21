// import { render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Greeting from './Greeting';

// describe('<Greeting />', ()=> {
//   test('renders Hello World as a text', () => {
//     //Arrange
//     render(<Greeting/>);
//     //Act
//     //...nothing
  
//     //Assert
//     const helloWorldElement = screen.getByText("Hello World", {exact: false});
//     expect(helloWorldElement).toBeInTheDocument();
//   });
//   test('renders changed if button was clicked', ()=> {
//     render(<Greeting/>);
//     //Act
//     const buttonElement = screen.getByRole('button')
//     userEvent.click(buttonElement);
//     const changedElement = screen.getByText(/changed/i);
//     expect(changedElement).toBeInTheDocument();
//   });

//   test('renders good to see if button was NOT clicked', ()=> {
//     render(<Greeting/>);
//     const goodElement = screen.getByText(/good to see/i);
//     expect(goodElement).toBeInTheDocument();
//   });
//   test("don't render good to see if button was clicked", ()=> {
//     render(<Greeting/>);
//     const buttonElement = screen.getByRole('button');
//     userEvent.click(buttonElement);
//     const outputElement = screen.queryByText(/good to see/i);
//     expect(outputElement).toBeNull();
//   })
// });

