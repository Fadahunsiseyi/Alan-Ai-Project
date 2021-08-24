// // Use this sample to create your own voice commands
// intent('hello world', p => {
//     p.play('(hello|hi there)');
// });

intent('What does this app do?', 'ekiti State University', 
      reply('This is a news project developed by Oluwaseyi Samuel Fadahunsi. Dr Ajayi, Dr Mrs Oyinloye, Dr Mrs Isinkaye'));

// intent('start a command', (p) => {
//     p.play({command: 'testCommand'})
// });
const API_KEY = '4a1f7c360bf348edae0a14f4a50e3d53';
let savedArticles = [];

//News by source
intent('Give me the news from $(source* (.*))', (p) => {
    let NEWS_API_URL =` https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const {articles} = JSON.parse(body); 
        
        if(!articles) {
            p.play('Sorry, please try searching for a different category');
            return;
        }    
        
            savedArticles = articles;  
        
        p.play({command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) ${p.source.value}.`);
        
         p.play('Would you like me to read the headlines??');
        p.then(confirmation);
    });

})





//News by Term
intent('What\'s up with $(term* (.*))', (p) => {
    let NEWS_API_URL =` https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const {articles} = JSON.parse(body); 
        
        if(!articles) {
            p.play('Sorry, please try searching for something else');
            return;
        }    
        
            savedArticles = articles;  
        
        p.play({command: 'newHeadlines', articles});
        p.play(`Here are the (latest|recent) aricles on ${p.term.value}.`);
    });

})


//News by Categoty
// 5. Alan Studio Intents for search by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology','football', 'education'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL =` https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=ng`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const {articles} = JSON.parse(body); 
        
        if(!articles) {
            p.play('Sorry, please try searching for something else');
            return;
        }    
        
            savedArticles = articles;  
        
        p.play({command: 'newHeadlines', articles});
        
           if(p.C.value) {
               p.play(`Here are the (latest|recent) aricles on ${p.C.value}.`);
    } else {
        p.play(`Here are the (latest|recent) news`);
    }
        
        p.play('Would you like me to read the headlines??');
        p.then(confirmation)
    });

});

const confirmation = context(() => {
    intent('yes', async (p)=> {
        for(let i = 0; i < savedArticles.length; i++) {
            p.play({command: 'highlight', aricle: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    
      intent('no', (p)=> {
        p.play('Sure, sounds good to me.');
    })
})


intent('Open (the|) (article|) (number|) $(number* (.*))',(p) => {
    if(p.number.value) {
        p.play({command: 'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({command: 'newHeadlines', articles: {}})
})