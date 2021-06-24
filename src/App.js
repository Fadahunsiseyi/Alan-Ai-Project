import React, {useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
 const alanKey = 'ad72a35783cb428b1433d50f0826dea12e956eca572e1d8b807a3e2338fdd0dc/stage';
 

const App = () => {
   

    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles()
    useEffect(() =>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles}) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles)
                }
            }
        })
    }, [])
    return (  
        <div>
           <div className={classes.logoContainer}>
               <img src='https://www.google.com/search?q=logo&sxsrf=ALeKk00St2uOvbPOkwxTIVUCGJ-JT2jVtA:1624537695971&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiSj6vCorDxAhUShVwKHYL1BJUQ_AUoAXoECAEQAw&biw=1302&bih=628' className={classes.alanLogo} alt="alan logo"/>
           </div>
            <NewsCards articles={newsArticles}/>
        </div>
    )
}
export default App;