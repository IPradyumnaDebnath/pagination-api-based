import React from 'react';
import './index.css';
class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      curPage: 1,
      maxReached: 1
    };

    this.loadMore = this.loadMore.bind(this);
    this.updateNewPage = this.updateNewPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    

  }


  updateNewPage() {
    if (this.state.curPage <= this.state.maxReached) {
      var url = "https://reqres.in/api/users?page=" + this.state.curPage;

      
      fetch(url).then(
        res => res.json()
      ).then(res => {
        this.setState({

          items: res.data



        });
        console.log(res)
      }).catch(error => {
        console.error(error);
        this.setState({
          error: true
        });
      });
    }

  }
  loadMore() {
    this.setState({

      curPage: this.state.curPage + 1

    }, this.updateNewPage());
  };

  prevPage(){
    this.setState({


      curPage: this.state.curPage - 1

    }, this.updateNewPage());
  }

  
  componentDidMount() {
    var url = "https://reqres.in/api/users?page=0"
    fetch(url).then(
      res => res.json()
    ).then(res => {

      this.setState({
        items: res.data,
        maxReached: res.total_pages,
        curPage: this.state.curPage + 1
      });
      console.log(res)
      
    }).catch(error => {
      console.error(error);
      this.setState({
        error: true
      });
    });
  }

  render() {

    return (
      <div>
         <ul >
          {this.state.items.map(x => <li key={x.id} ><img src={x.avatar} alt="!"/> <div><div >Name: {x.first_name}</div><div>Last Name:  {x.last_name}</div> <div>Email:  {x.email}</div>  </div> </li>)}
        </ul>
        
        <button onClick={this.prevPage} disabled={this.state.curPage===1}>
           Prev
          </button>
          <button >{this.state.curPage}</button>
        <button onClick={this.loadMore} disabled={this.state.curPage>=this.state.maxReached}>
          Next
          </button>
         
       
      </div>
    );
  }
}
export default Feed