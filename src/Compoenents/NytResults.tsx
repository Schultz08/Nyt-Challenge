import React from 'react';

const NytResults = (props: any) => {
  return (
    <div>
      <div>
        { props.results.map((result: any) => {
          return (
            <div key={result._id}>
            <h2><a href={result.web_url}>{result.headline.main}</a></h2>
            {result.multimedia.length > 1 ? <img alt="article" src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : 'No image'}
            <p>
              {result.snippet}
              <br />
              {result.keywords.length > 0 ? ' Keywords: ' : ''}
            </p>
            <ul>
              {result.keywords.map((keyword: any) => <li key={keyword.value}>{keyword.value}</li>)}
            </ul>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default NytResults;