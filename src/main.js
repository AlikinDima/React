
class FrozenWrapper extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        searchValue: '',
        showIsStock: false,
      };

      this.products = props.info.sort(this.sortProduct);

      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleShowIsStock = this.handleShowIsStock.bind(this);
    }

    handleFilterTextChange(value){
        this.setState({searchValue: value});
    }

    handleShowIsStock(value){
        this.setState({showIsStock : value});
    }
    
    sortProduct(a,  b){
        if(a.category > b.category){
            return 1;
        }

        if(a.category < b.category){
            return -1;
        }

        return 0;
    }

    render(){
      return (
      <div class='frozen-wrapper'>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1>Frozen App</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                       <FrozenSearchForm 
                            handleFilterTextChange={this.handleFilterTextChange}
                            searchValue = {this.state.searchValue}
                            showIsStock = {this.state.showIsStock}
                            handleShowIsStock = {this.handleShowIsStock}/>
                    </div>
                </div>
            </div>
        </header>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col">
                    <ContentTableWrapper products = {this.products} searchValue = {this.state.searchValue}/>
                    </div>
                </div>
            </div>
        </div>
      </div>
      );
    }


    
  }
  
  class FrozenSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.onFilterTextChange = this.onFilterTextChange.bind(this);
        this.onShowIsStock = this.onShowIsStock.bind(this);
    }

    onFilterTextChange(e){
        this.props.handleFilterTextChange(e.target.value);
    }
    onShowIsStock(e)  {
        console.log(e.target.value);
        this.props.handleShowIsStock(e.target.value);
    }

    render(){
        return (
            <form>
                <div class="row">
                    <div class="col">
                        <input
                        type="text"
                        placeholder="Search..."
                        value = {this.props.searchValue}
                        onChange={this.onFilterTextChange}    
                         />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="" id="showIsStock"  value = {this.props.showIsStock} onChange={this.handleInStockChange} />
                        <label for="showIsStock">Only show products in stock</label>
                    </div>
                </div>
            </form>
        );
    }

  }

  class ContentTableWrapper extends React.Component {
    constructor(props){
        super(props);
        this.products = props.products;
    }


    createRows(){
        let row = [];
        let category = null;

        this.products.forEach(product => {
            let productClass = '';
            let searchValue = this.searchValue;

            if(product.name.toLowerCase().includes(this.props.searchValue.toLowerCase())){
                if(product.category != category){
                    row.push(<CategoryRow kye = {product.category} categoryName = {product.category}/>);
                    category = product.category;
                }

                if(product.stocked == false){
                    productClass = 'no-stocked';
                }

                row.push(<ProductRow key = {product.name} product =  {[product.name, product.price, productClass]}/>);
            }
        });
        return row;
    }

    render(){
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Prise</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createRows()}
                </tbody>
            </table>
        );
    }


  }
  
  class CategoryRow extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <th colspan="2">{this.props.categoryName}</th>
            </tr>
        );
    }
  }
  
  class ProductRow extends React.Component {
    constructor(props){
        super(props);
        this.product = props.product;
    }

    render(){
        return(
            <tr class = {this.product[2]}>
                <td>{this.product[0]}</td>
                <td>{this.product[1]}</td>
            </tr>
        );
    }
  }


  let info =   [
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

  ReactDOM.render(<FrozenWrapper info={info} />, document.getElementById('root'));