
const fs = require('fs');
const brokenDatabasePath = './broken-database.json';
const outputFilePath = './saida.json';
const characterFixer = { 'æ': 'a', '¢': 'c', 'ø': 'o', 'ß': 'b' };

const brokenDatabase = readDatabaseFile(brokenDatabasePath);

let fixedDatabase = brokenDatabase.map(product => {

    fixProductName(product);
    fixPriceType(product);
    fixProductQuantity(product);

    return product;

})

writeFixedDatabaseFile(fixedDatabase);
printProductsInOrder(fixedDatabase);
totalStockValue(fixedDatabase);

function readDatabaseFile(database) {

    try {

        return JSON.parse(fs.readFileSync(database));

    } catch(err) {

        console.log("Ocorreu um erro na leitura do arquivo!" + err);

    }

}


// função para realizar a correção dos nomes dos produtos
function fixProductName(product) {

    //trecho adptado de https://thispointer.com/javascript-replace-multiple-characters-in-string/
    product.name = product.name.replace(/[æ|¢|ø|ß]/g, charactersToReplace => (characterFixer)[charactersToReplace]);

}

//função que transforma os tipos dos preços dos produtos que estão como "string" em "number"
function fixPriceType(product) {

    if(typeof(product.price) === 'string') {

        product.price = parseFloat(product.price);

    }

}

//função que adiciona o atributo "quantity" aos produtos que não possuem 
function fixProductQuantity(product) {

    if(!product.quantity) {

        product.quantity = 0;

    }

}

//função para escrita do arquivo de saida
function writeFixedDatabaseFile(database) {

        fs.writeFile(outputFilePath, JSON.stringify(database, null, 4), (err) => {

        if(err) {

            console.log("Ocorreu um erro na escrita do arquivo!" + err);

        }

    })

}

//função para a ordenação dos produtos por categoria e id em ordem crescente
function printProductsInOrder(database) {

    database.sort((a, b) => {

        return ((a.category > b.category) ? 1 : (a.category < b.category) ? -1 : 0)

    }).sort((a, b) => {

        if(a.category === b.category) {

            return ((a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)

        }

    })

    console.log(database)

}

//função para calcular o estoque total dos produtos de uma mesma categoria
function totalStockValue(database) {

    let totalCategory = {}

    database.map(product => {

        let category = product.category

        if(!totalCategory[category]) {

            totalCategory[product.category] = product.quantity

        } else {

            let total = totalCategory[product.category]
            totalCategory[product.category] = total + product.quantity

        }

    })

    console.log(totalCategory)

}


