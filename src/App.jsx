import { useReducer } from "react";
import "./App.css";
const initialValues = {
  data: [],
};

function reducer(state, action) {
  if (action.type == "inData") {
    return { data: [...state.data, action.payload] };
  } else if (action.type === "delData") {
    return {
      data: state.data.filter((itemid) => itemid.id !== action.payload),
    };
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const InData = (values) => {
    dispatch({ type: "inData", payload: values });
  };

  function delData(ItemID) {
    dispatch({ type: "delData", payload: ItemID });
  }
  return (
    <>
      <div>
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                e.target.product.value !== "" &&
                e.target.price.value !== ""
              ) {
                InData({
                  product: e.target.product.value,
                  price: e.target.price.value,
                  id: Date.now(),
                });
              }
              e.target.product.value = "";
              e.target.price.value = "";
            }}
          >
            <div>
              <h2>Expenss Tracker</h2>
            </div>
            <div>
              <label>Enter Product</label>
              <input type="text" name="product" />
            </div>
            <div>
              <label>Enter Price</label>
              <input type="number" name="price" />
            </div>
            <div>
              <button type="submit">Add to List</button>
            </div>
          </form>
        </div>
        <div className="container1">
          <ul>
            {state.data.map((item) => {
              return (
                <li key={item.id}>
                  <span> {item.product}</span>
                  <span> ${item.price}</span>
                  <button onClick={() => delData(item.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
