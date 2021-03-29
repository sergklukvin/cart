import React, { Component } from 'react';
import EnhancedTable from './components/TableComponent/Table';
import Form from './components/FormComponent/Form';

const initialRows = [
  { id: 1, product: 'Donut', price: 45.2, quantity: 2, subtotal: 90.4 },
  { id: 2, product: 'Cupcake', price: 23.3, quantity: 5, subtotal: 116.5 },
  { id: 3, product: 'Eclair', price: 24, quantity: 1, subtotal: 24 },
  { id: 4, product: 'Gingerbread', price: 1.11, quantity: 2, subtotal: 2.22 },
  { id: 5, product: 'Ice cream sandwich', price: 23, quantity: 25, subtotal: 575 },
  { id: 6, product: 'Lollipop', price: 2, quantity: 9, subtotal: 18 },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: initialRows,
      lastId: 6,
    };
  }

  clickDecrease = (id) => {
    const temp = [...this.state.rows];

    temp.forEach((el) => {
      if (el.id === id && el.quantity > 0) {
        el.quantity--;
        el.subtotal = el.price*el.quantity
      }
    });

    this.setState({
      rows: [...temp],
    });
  };

  clickIncrease = (id) => {
    const temp = [...this.state.rows];

    temp.forEach((el) => {
      if (el.id === id) {
        el.quantity++;
        el.subtotal = el.price*el.quantity
      }
    });

    this.setState({
      rows: [...temp],
    });
  };

  deleteProduct = (selectedArr) => {
    let temp = [...this.state.rows];

    for (let i of selectedArr) {
      temp = temp.filter((el) => el.id !== i);
    }

    this.setState({
      rows: [...temp],
    });
  };

  addProduct = (data) => {
    this.setState((state) => ({
      lastId: this.state.lastId + 1,
    }));

    data.id = this.state.lastId;
    data.subtotal = data.price * data.quantity;

    this.setState((state) => ({
      rows: [data, ...state.rows],
    }));
  };

  render() {
    return (
      <div className='App'>
        <Form addProduct={this.addProduct} />
        <EnhancedTable
          rows={this.state.rows}
          clickDecrease={this.clickDecrease}
          clickIncrease={this.clickIncrease}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}

export default App;
