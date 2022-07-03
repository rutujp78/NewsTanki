import React, { Component } from 'react'

export class NewsItem extends Component {

  // constructor() {
  //     super(); // compuslory
  //     console.log("Henlo i am a constructor");
  // }

  render() {

    let { title, description, imgUrl, newsUrl, /*publishedAT*/ author, date, source } = this.props; // destructuring

    return (
      <div className='my-3'>
        {/* <div className="card" style={{width: "18rem"}}> */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span class="badge text-bg-dark">{source}</span>
          </div>
          <img src={!imgUrl ? "NewsTaki" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            {/* <h5 className="card-title">{title}  <span class="badge text-bg-dark">{source}</span></h5> */}
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
            {/* <p className="card-text"><small className="text-muted">{publishedAT}</small></p> */}
            {/* <p className="card-text"><small className="text-muted">By {!author?"Unknown Author":author} on {new Date(date).toLocaleString()}</small></p> */}
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown Author" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
