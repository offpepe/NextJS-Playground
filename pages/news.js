import { useState } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import styles from '../styles/Home.module.css';


function News ({ newsList }) {
    const [news, setNews] = useState(newsList.hits);
    const [loading, setLoading] = useState(false);
    
    const getNews = async (term) => {
      setLoading(true);
      const fetchedNews = await (await fetch(`https://hn.algolia.com/api/v1/search?query=${term}`)).json();
      setNews(fetchedNews.hits);
      setLoading(false);
  }

    const newCard = (data) => {
        return (
            <div className={ styles.card } >
            <p style={ {
                fontSize: "10px",
            } }>{ ` relevancy: ${data.relevancy_score ? data.relevancy_score : 0}` }</p> 
            <h2>
                <a href={ data.url } target="_blank" rel="noreferrer">
                    { data.title }
                </a>
                </h2>
            <p style={ {
                fontSize: "10px",
            } }>{ ` by: ${data.author} | created at: ${data.created_at} ` }</p>
        </div>
        )
    }

    return (
        <>
          <Head>
              <title>
                  Tech News
              </title>
          </Head>
          <main 
            className={ styles.conteiner }
            style={ {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px 0'
            } }
          >
            <form onSubmit={ async (ev) => {
                ev.preventDefault();
                const { query } = ev.target;
                Router.push(`/news/?searchTerm=${query.value}`);
                await getNews(query.value);
            } }>
                <input
                  type="text"
                  name="query"
                  max="20"
                  placeholder="press enter to search"
                  style={ { 
                    borderRadius: '10rem',
                    width: '400px',
                    height: '40px',
                   } }
                  />
            </form>
            <div className={ styles.grid }>
            { !loading && news ? news.map((data) => newCard(data)) : 'Please wait' }  
            </div>
          </main>
        </>
    )
}


News.getInitialProps = async ({ query }) => {
    let newsList = [];
    try {
        const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${query.searchTerm}`);
        newsList = await res.json();
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        newsList = [];
    }
    return {
        newsList,
    }
  }
  
export default News;