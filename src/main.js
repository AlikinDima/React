
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
                    <div class="col d-flex justify-content-center">
                        <h1 class='header-title'>PRODUCTS</h1>
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
                        <ContentTableWrapper
                            products = {this.products}
                            searchValue = {this.state.searchValue}
                            showIsStock = {this.state.showIsStock}
                        />
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
        this.props.handleShowIsStock(e.target.checked);
    }

    render(){
        return (
            <form class='product-form'>
                <div class="row">
                    <div class="col">
                        <input
                        type="text"
                        class='search-input'
                        placeholder="Search..."
                        value = {this.props.searchValue}
                        onChange={this.onFilterTextChange}    
                         />
                    </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-6 d-flex align-items-center">
                        <input
                        type="checkbox"
                        class='only-in-stock'
                        name="" id="showIsStock"
                        checked={this.props.showIsStock}
                        onChange={this.onShowIsStock} />
                        <label class='checkbox-lable' for="showIsStock">products in stock</label>
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
            
            let searchValue = this.props.searchValue.toLowerCase();
            let productClass = '';
            let productName = product.name.toLowerCase();
        
            if(productName.includes(searchValue)){
                if(this.props.showIsStock) {
                    if(product.stocked){
                        if(product.category != category){
                            row.push(<CategoryRow kye = {product.category} categoryName = {product.category}/>);
                            category = product.category;
                        }
                        row.push(this.createProduct(product));
                    } 
                }else {
                    if(product.category != category){
                        row.push(<CategoryRow key = {product.category} categoryName = {product.category}/>);
                        category = product.category;
                    }
                    row.push(this.createProduct(product));
                }
            }
        });
        return row;
    }

    createProduct(product){
        let productClass = '';
        if(product.stocked == false){
            productClass = 'no-stocked';
        }
        return (<ProductRow key = {product.name} product =  {[product.name, product.price, productClass]}/>);
    }

    render(){
        return (
            <table  class='product-table'>
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
                <td colspan="2" class='product-category'>{this.props.categoryName}</td>
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