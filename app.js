var Header = React.createClass({
  render: function(){
    return(
    <header>
       <a href='http://www.freecodecamp.com'>
        <img className='logo' src='https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg'/>
       </a>
    </header>
    );
  }
});
var BodyTable = React.createClass({
  render: function(){
    console.log(this.props.tableList);
    return(
    <div className='row'>
        <div className='leaderboard'>Leaderboard
        </div>
        <div className='tab'>

        <table className='table table-striped'>
          <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th id='lastThirty' onClick={this.props.pastMonth} className='sort sorted'>Post in last 30 days</th>
            <th id='allT' onClick={this.props.allTime} className='sort'>All time posts</th>
          </tr>
          </thead>
          <tbody>
            {this.props.tableList.map(function(data,index){
              console.log(data);
              return(
              <tr>
                  <td id='index'>{index+1}</td>
                  <td className='usr'><a href={"www.freecodecamp.com/"+data.username}>
                    <img className='thumbnail' src={data.img}/>
                    <span>{data.username}</span></a></td>
                  <td>{data.recent}</td>
                  <td>{data.alltime}</td>
              </tr>
              );

            })}
          </tbody>
        </table>
        </div>
     </div>
    );
  }
});
var LeaderBoard = React.createClass({

  getInitialState: function(){
    return({
      list: [],
      url:''
    });
  },
  componentDidMount: function(){
    this.serverRequest = $.get('http://fcctop100.herokuapp.com/api/fccusers/top/recent',function(res){
      var list = res;
      //console.log(list);
      this.setState({
        list: list
      });
    }.bind(this));
  },
  componentWillUnmount: function(){
    this.serverRequest.abort();
  },
  allTime: function(){
    $('#allT').addClass('sorted');
    $('#lastThirty').removeClass('sorted');
    $.get('http://fcctop100.herokuapp.com/api/fccusers/top/alltime',function(res){
      var list = res;
      this.setState({
        list: list
      });
    }.bind(this));
  },
  pastMonth: function(){
    $('#lastThirty').addClass('sorted');
    $('#allT').removeClass('sorted');
    $.get('http://fcctop100.herokuapp.com/api/fccusers/top/recent',function(res){
      var list = res;
      this.setState({
        list: list
      });
    }.bind(this));
  },
  render: function(){
    return(
      <div>
        <Header />
        <BodyTable tableList={this.state.list} allTime={this.allTime} pastMonth={this.pastMonth}/>

      </div>
    );

  }
});
React.render(<LeaderBoard />, document.getElementById('container'));
