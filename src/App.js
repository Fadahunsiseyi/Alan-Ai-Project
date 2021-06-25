import React, {useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
import wordsToNumbers from 'words-to-numbers';
 const alanKey = 'ad72a35783cb428b1433d50f0826dea12e956eca572e1d8b807a3e2338fdd0dc/stage';
 

const App = () => {
   

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);                
    const classes = useStyles()
    useEffect(() =>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1)
                } else if(command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command=== 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again')
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                }
            }
        })
    }, [])
    return (  
        <div>
           <div className={classes.logoContainer}>
               <img src='https://www.google.com/search?q=logo&sxsrf=ALeKk00St2uOvbPOkwxTIVUCGJ-JT2jVtA:1624537695971&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiSj6vCorDxAhUShVwKHYL1BJUQ_AUoAXoECAEQAw&biw=1302&bih=628' className={classes.alanLogo} alt="alan logo"/>
           </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}
export default App;