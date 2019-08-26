const SHA256LIB = require('crypto-js/sha256');

class TransactionMonit {
    constructor(index, timestamp, data, previoushash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateMyHashCode();
    }

    calculateMyHashCode() {
        return SHA256LIB(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class BlockChainProcess {

    constructor() {
        this.chain = [this.myGenesisBlock()];
    }

    myGenesisBlock() {
        return new TransactionMonit(0, "26/08/2017", "My Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(myNewBlock){
        myNewBlock.previoushash=this.getLatestBlock().hash;
        myNewBlock.hash=myNewBlock.calculateMyHashCode();
        this.chain.push(myNewBlock);
    }
}

let createBlock=new BlockChainProcess();
createBlock.addBlock(new TransactionMonit(1,"26/08/2017",{amount:845.00,lastpaymentamount:782.00}));
createBlock.addBlock(new TransactionMonit(2,"27/08/2017",{amount:700.00,lastpaymentamount:400.00}));

console.log(JSON.stringify(createBlock,null,4));