
const fs = require('fs');
let brokenDatabase = require('./broken-database.json');
const characterFixer = { 'æ' : 'a', '¢' : 'c', 'ø' : 'o', 'ß' : 'b' };

let fixedDatabase = brokenDatabase.map((product) => {
    
    fixProductName(product);
    fixPriceType(product);
    fixProductQuantity(product);

    return product;

})

writeFixedDatabaseFile(fixedDatabase);

function fixProductName(product) {

    product.name = product.name.replace(/[æ|¢|ø|ß]/g, charactersToReplace => (characterFixer)[charactersToReplace]);
    
}

function fixPriceType(product) {

    if(typeof(product.price) === 'string') {

        product.price = parseInt(product.price);

    }

}

function fixProductQuantity(product) {

    if(!product.quantity) {

        product.quantity = 0;

    }

}

function writeFixedDatabaseFile(database) {

    fs.writeFile("./saida.json", JSON.stringify(database, null, 4), (err) => {

        if(err) {

            console.log("Ocorreu um erro na escrita do arquivo!");

        }

    })

}

function printProductsInOrder(database) {

    database.sort((a, b) => {
        
        return((a.category > b.category) ? 1 : (a.category < b.category) ? -1 : 0)

    }).sort((a, b) => {

        if(a.category === b.category) {

            return((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)
            
        }

    })

    console.log(database)

}

function totalStockValueByCategory(database) {


}

printProductsInOrder(fixedDatabase)
totalStockValueByCategory(fixedDatabase)
