import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Introduction to Biology",
    price: 60,
    description: "A biology textbook.",
  },
  {
    id:"p2",
    title: "Inorganic Chemistry",
    price: 50,
    description: "An inorganic chemistry textbook.",
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item)=> (
          <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
