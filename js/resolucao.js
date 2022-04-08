let brokenDatabase = require('./broken-database.json');

function fixProductName(database) {

    let characterFixer = { 'æ' : 'a', '¢' : 'c', 'ø' : 'o', 'ß' : 'b' }

    database.map(product => {

        let string = product.name.replace(/[æ|¢|ø|ß]/g, charactersToReplace => (characterFixer)[charactersToReplace])
        console.log(string)
        
    })

}

function fixPriceType(database) {

    database.map(product => {

        if(typeof(product.price) === 'string') {

            product.price = parseInt(product.price)

        }

        console.log(typeof(product.price));

    })

}

// fixProductName(brokenDatabase);
fixPriceType(brokenDatabase);