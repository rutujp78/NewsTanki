import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  // articles = [
  //     {
  //         "source": {
  //             "id": "abc-news-au",
  //             "name": "ABC News (AU)"
  //         },
  //         "author": "ABC News",
  //         "title": "Cricket grandstand collapses during first Sri Lanka-Australia test in Galle",
  //         "description": "Heavy rain and wind causes the roof of a temporary grandstand to collapse before the start of play on day two of the first test in Galle.",
  //         "url": "http://www.abc.net.au/news/2022-06-30/sri-lanka-australia-first-test-cricket-grandstand-collapses/101197718",
  //         "urlToImage": "https://live-production.wcms.abc-cdn.net.au/9756a6ddf19f6cab0297a621d9fefded?impolicy=wcms_crop_resize&cropH=2268&cropW=4032&xPos=0&yPos=273&width=862&height=485",
  //         "publishedAt": "2022-06-30T05:16:44Z",
  //         "content": "The roof on a makeshift grandstand at Galle International Stadium has collapsed in heavy rain and wind before the start of play between Sri Lanka and Australia.\r\n<ul><li>Sheets of corrugated iron ble… [+1067 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "news24",
  //             "name": "News24"
  //         },
  //         "author": null,
  //         "title": "Cricket Australia expects packed stadiums for T20 World Cup",
  //         "description": "Ticket demand for the Twenty20 World Cup in Australia later this year suggests there will be packed houses for the marquee event, the country's cricket board CEO Nick Hockley said.",
  //         "url": "https://www.news24.com/sport/cricket/cricket-australia-expects-packed-stadiums-for-t20-world-cup-20220629",
  //         "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/11683/54e3014c4c4e4a4a92978c8ebe09b903.jpg",
  //         "publishedAt": "2022-06-29T19:50:33+00:00",
  //         "content": "Ticket demand for the Twenty20 World Cup in Australia later this year suggests there will be packed houses for the marquee event, the country's cricket board CEO Nick Hockley said on Wednesday.\r\nAust… [+1442 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "bbc-sport",
  //             "name": "BBC Sport"
  //         },
  //         "author": "BBC Sport",
  //         "title": "Shane Warne memorial - watch & follow updates",
  //         "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
  //         "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
  //         "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
  //         "publishedAt": "2022-03-30T08:22:26.498888Z",
  //         "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "espn-cric-info",
  //             "name": "ESPN Cric Info"
  //         },
  //         "author": null,
  //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //         "publishedAt": "2020-04-27T11:41:47Z",
  //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //     },
  //     {
  //         "source": {
  //             "id": "espn-cric-info",
  //             "name": "ESPN Cric Info"
  //         },
  //         "author": null,
  //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //         "publishedAt": "2020-03-30T15:26:05Z",
  //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //     }
  // ]

  // capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  constructor(props) {
    super(props); // compuslory
    console.log("Henlo i am a constructor from news component");
    this.state = {
      // articles: this.articles,
      articles: [],
      loading: true,
      page: 1
    }
    // document.title = "NewsTaknki - " + this.props.category;
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsTanki`;
    // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTanki`;
  }


  async updateNews() {
    this.props.setProgress(10);
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8882204d1d264a818fd33f8172b80b50&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // this.setState({loading: false});
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  //component did mount and runs after render
  async componentDidMount() {
    console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8882204d1d264a818fd33f8172b80b50&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // this.setState({loading: false});
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }

 // handelPreviousClick = async () => {
  //  console.log("Previous");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8882204d1d264a818fd33f8172b80b50&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    //this.setState({ page: this.state.page - 1 }); //imp part
    //this.updateNews(); //imp part
  //}

  // use async otherwise await will give error

  //handelNextClick = async () => {
    //console.log("Next");

    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8882204d1d264a818fd33f8172b80b50&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    //this.setState({ page: this.state.page + 1 }); // imp part
    //this.updateNews(); // imp part
  //}


  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
      //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
      // not fake in this case XD
      this.setState({page: this.state.page + 1})

      // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8882204d1d264a818fd33f8172b80b50&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false
      })

  };

  render() {
    console.log("render");
    return (
      // <div className="container my-3">
      //   {/* <h1 className="text-center">NewsTanki - Top Headlines</h1> */}
      //   <h1 className="text-center" style={{margin: "35px 0px"}}>NewsTanki - Top Recent {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
      //   {this.state.loading && <Spinner/>}
      //   <div className="row">
      //     {!this.state.loading && this.state.articles.map((element)=>{
      //         return <div className="col-md-4" key={element.url}>
      //           <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/*publishedAt={element.publishedAt}*/ source={element.source.name}/>    
      //           {/* <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage} newsUrl={element.url}/>     this is real comment part*/}
      //         </div>    
      //     })}

      //     {/* <div className="col-md-4">
      //       <NewsItem title="myTitle" description="mydesc"/>    
      //       </div>    
      //         <div className="col-md-4">
      //           <NewsItem title="myTitle" description="mydesc"/>    
      //     </div>     this is real comment part*/}
      //     </div>    
      //     <div className="container d-flex justify-content-between">
      //       <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handelPreviousClick} >&larr; Previous</button>
      //       <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-2" onClick={this.handelNextClick} >Next &rarr;</button>
      //     </div>
      // </div>

      <>
       {/* <div className="container my-3"> */}


        <h1 className="text-center" style={{ margin: "35px 0px" }}>NewsTanki - Top Recent {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={<h4>Loading...</h4>}
          loader={<Spinner/>}
        >
          <div className="container">

          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/*publishedAt={element.publishedAt}*/ source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>



      {/* </div> */}

      </>


    )
  }
}

export default News
