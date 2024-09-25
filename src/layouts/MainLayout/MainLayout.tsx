import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";
import TopHeader from "@components/common/TopHeader/TopHeader";

// UI => https://www.figma.com/design/3clnuclOxoxLlNSrcrFYVv/Full-E-Commerce-Website-UI-UX-Design-(Community)?node-id=34-213&node-type=frame&t=yJJYVu6MjPAr7MaU-0

// test
// const array1 = [
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 2, name: "salah", Address: "maddi" },
//   { id: 3, name: "ahmed", Address: "elmarg" },
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 1, name: "ali", Address: "Helwan" },
//   { id: 1, name: "ali", Address: "Helwan" },
// ];
// const myMap = new Map();

// array1.forEach((item) => myMap.set(item.id, item));
// console.log(myMap);

// const playerOne = {
//   name: "Player 1",
//   score: 0,
//   health: 77,
//   fullHealth(newValue) {
//     console.log(this);

//     return (this.health = newValue);
//   },
// };
// const playerTwo = {
//   name: "Player 2",
//   score: 0,
//   health: 44,
// };
// call , apply , bind
// playerOne.fullHealth.call(playerTwo, 99);
// console.log(playerTwo.health);
// playerOne.fullHealth.apply(playerTwo, [99]);
// console.log(playerTwo.health);

// const useAnotherTime = playerOne.fullHealth.bind(playerTwo, [99]);
// useAnotherTime();
// console.log(playerTwo.health);

// test

const MainLayout = () => {
  const { container } = styles;
  return (
    <>
      <TopHeader />
      <Container className={container}>
        <Header />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;
