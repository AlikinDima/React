
class FrozenWrapper extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        searchValue: '',
        showIsStock: false,
      };
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
                       <FrozenSearchForm />
                    </div>
                </div>
            </div>
        </header>
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col">
                    <ContentTableWrapper />
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
    }

    render(){
        return (
            <form>
                <div class="row">
                    <div class="col">
                        <input
                        type="text"
                        placeholder="Search..."    
                         />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="checkbox" name="" id="showIsStock" />
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
                    
                </tbody>
            </table>
        );
    }
  }
  
  class CategoryRowWrapper extends React.Component {
    constructor(props){
        super(props);

    }
  }
  
  class ProductRowWrapper extends React.Component {
    constructor(props){
        super(props);

    }
  }

  ReactDOM.render(<FrozenWrapper />, document.getElementById('root'));