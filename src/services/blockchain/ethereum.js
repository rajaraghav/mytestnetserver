import request from 'superagent'

import Web3 from 'web3'

export const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/m62CiajFe86L4iYN20tw`))

export const API_ROOT = `https://ropsten.etherscan.io/api`

export const fetchTransaction = (hash) => {
  console.log('fetching hash')
  return web3.eth.getTransaction(hash)
    .then(({ hash, value }) => ({
      hash,
      amount: web3.utils.fromWei(value),
    }))
}

export const fetchTransactionIDs = (address = '') => {
  return request(`${API_ROOT}/?module=account&action=txlist&address=${address}`)
    .then(res => res.body)
    .then(data => data.result)
    .then(txs => txs.filter(tx => tx.to === address.toLowerCase()).map(tx => tx.hash))
}

export default {
  fetchTransactionIDs,
  fetchTransaction,
  web3,
}
